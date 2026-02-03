// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
  function transfer(address to, uint256 amount) external returns (bool);

  function transferFrom(
    address from,
    address to,
    uint256 amount
  ) external returns (bool);
}

contract IntentMarketplace {
  enum State {
    OPEN,
    SELECTED,
    FULFILLED,
    ACCEPTED,
    EXPIRED
  }

  enum ReputationReason {
    ACCEPTED,
    WINNER_TIMEOUT
  }

  struct Intent {
    address tokenOut;
    uint256 minAmountOut;
    address rewardToken;
    uint256 rewardAmount;
    address payer;
    address initiator;
    address verifier;
    uint64 ttlSubmit;
    uint64 ttlAccept;
    State state;
    address winner;
    uint256 winnerAmountOut;
    uint256 bondAmount;
  }

  event IntentCreated(
    bytes32 indexed id,
    address indexed payer,
    address indexed initiator,
    address verifier,
    address tokenOut,
    uint256 minAmountOut,
    address rewardToken,
    uint256 rewardAmount,
    uint64 ttlSubmit,
    uint64 ttlAccept
  );

  event OfferSubmitted(
    bytes32 indexed id,
    address indexed solver,
    uint256 amountOut,
    uint256 timestamp
  );

  event WinnerSelected(
    bytes32 indexed id,
    address indexed solver,
    uint256 amountOut,
    uint256 bondAmount
  );

  event Fulfilled(
    bytes32 indexed id,
    address indexed solver,
    uint256 amountOut
  );

  event Accepted(
    bytes32 indexed id,
    address indexed solver,
    uint256 rewardAmount,
    uint256 feeAmount,
    uint256 bondAmount
  );

  event Expired(
    bytes32 indexed id,
    State indexed fromState,
    uint256 feeAmount,
    uint256 refundAmount
  );

  event ReputationUpdated(
    address indexed solver,
    int256 newValue,
    ReputationReason reason
  );

  address public immutable feeRecipient;
  uint16 public immutable feeBpsOnAccept;
  uint256 public immutable fixedFeeOnExpire;
  uint16 public immutable bondBpsOfReward;
  uint256 public immutable bondMin;

  uint256 private _nonce;
  mapping(bytes32 => Intent) private _intents;
  mapping(address => int256) public reputation;

  error InvalidTime();
  error InvalidAddress();
  error InvalidAmount();
  error InvalidState();
  error Unauthorized();
  error TransferFailed();

  constructor(
    address feeRecipient_,
    uint16 feeBpsOnAccept_,
    uint256 fixedFeeOnExpire_,
    uint16 bondBpsOfReward_,
    uint256 bondMin_
  ) {
    if (feeRecipient_ == address(0)) revert InvalidAddress();
    feeRecipient = feeRecipient_;
    feeBpsOnAccept = feeBpsOnAccept_;
    fixedFeeOnExpire = fixedFeeOnExpire_;
    bondBpsOfReward = bondBpsOfReward_;
    bondMin = bondMin_;
  }

  function createIntent(
    address tokenOut,
    uint256 minAmountOut,
    address rewardToken,
    uint256 rewardAmount,
    address payer,
    address initiator,
    address verifier,
    uint64 ttlSubmit,
    uint64 ttlAccept
  ) external returns (bytes32 id) {
    if (block.timestamp >= ttlSubmit || ttlSubmit >= ttlAccept)
      revert InvalidTime();
    if (
      payer == address(0) ||
      initiator == address(0) ||
      verifier == address(0) ||
      tokenOut == address(0) ||
      rewardToken == address(0)
    ) revert InvalidAddress();
    if (rewardAmount == 0 || minAmountOut == 0) revert InvalidAmount();

    _safeTransferFrom(IERC20(rewardToken), payer, address(this), rewardAmount);

    _nonce += 1;
    id = keccak256(
      abi.encode(payer, initiator, _nonce, block.chainid, address(this))
    );

    Intent storage intent = _intents[id];
    intent.tokenOut = tokenOut;
    intent.minAmountOut = minAmountOut;
    intent.rewardToken = rewardToken;
    intent.rewardAmount = rewardAmount;
    intent.payer = payer;
    intent.initiator = initiator;
    intent.verifier = verifier;
    intent.ttlSubmit = ttlSubmit;
    intent.ttlAccept = ttlAccept;
    intent.state = State.OPEN;

    emit IntentCreated(
      id,
      payer,
      initiator,
      verifier,
      tokenOut,
      minAmountOut,
      rewardToken,
      rewardAmount,
      ttlSubmit,
      ttlAccept
    );
  }

  function submitOffer(bytes32 id, uint256 amountOut) external {
    Intent storage intent = _intents[id];
    if (intent.state != State.OPEN) revert InvalidState();
    if (block.timestamp > intent.ttlSubmit) revert InvalidTime();
    if (amountOut == 0) revert InvalidAmount();

    emit OfferSubmitted(id, msg.sender, amountOut, block.timestamp);
  }

  function selectWinner(
    bytes32 id,
    address solver,
    uint256 amountOut
  ) external {
    Intent storage intent = _intents[id];
    if (intent.verifier != msg.sender) revert Unauthorized();
    if (intent.state != State.OPEN) revert InvalidState();
    if (block.timestamp > intent.ttlSubmit) revert InvalidTime();
    if (solver == address(0) || amountOut == 0) revert InvalidAmount();

    uint256 bondAmount = _calcBondAmount(intent.rewardAmount);
    if (bondAmount > 0) {
      _safeTransferFrom(
        IERC20(intent.rewardToken),
        solver,
        address(this),
        bondAmount
      );
    }

    intent.winner = solver;
    intent.winnerAmountOut = amountOut;
    intent.bondAmount = bondAmount;
    intent.state = State.SELECTED;

    emit WinnerSelected(id, solver, amountOut, bondAmount);
  }

  function fulfill(bytes32 id) external {
    Intent storage intent = _intents[id];
    if (intent.state != State.SELECTED) revert InvalidState();
    if (intent.winner != msg.sender) revert Unauthorized();
    if (block.timestamp > intent.ttlAccept) revert InvalidTime();
    if (intent.winnerAmountOut < intent.minAmountOut) revert InvalidAmount();

    _safeTransferFrom(
      IERC20(intent.tokenOut),
      msg.sender,
      address(this),
      intent.winnerAmountOut
    );
    _safeTransfer(
      IERC20(intent.tokenOut),
      intent.initiator,
      intent.winnerAmountOut
    );

    intent.state = State.FULFILLED;
    emit Fulfilled(id, msg.sender, intent.winnerAmountOut);

    _accept(id);
  }

  function expire(bytes32 id) external {
    Intent storage intent = _intents[id];
    if (intent.state != State.OPEN && intent.state != State.SELECTED)
      revert InvalidState();

    if (intent.state == State.OPEN) {
      if (block.timestamp <= intent.ttlSubmit) revert InvalidTime();
      if (intent.winner != address(0)) revert InvalidState();

      uint256 feeAmountOpen = _min(intent.rewardAmount, fixedFeeOnExpire);
      uint256 refundAmountOpen = intent.rewardAmount - feeAmountOpen;

      if (feeAmountOpen > 0) {
        _safeTransfer(IERC20(intent.rewardToken), feeRecipient, feeAmountOpen);
      }
      if (refundAmountOpen > 0) {
        _safeTransfer(
          IERC20(intent.rewardToken),
          intent.payer,
          refundAmountOpen
        );
      }

      intent.state = State.EXPIRED;
      emit Expired(id, State.OPEN, feeAmountOpen, refundAmountOpen);
      return;
    }

    if (block.timestamp <= intent.ttlAccept) revert InvalidTime();
    if (intent.state == State.FULFILLED) revert InvalidState();

    uint256 feeAmountSelected = _min(intent.rewardAmount, fixedFeeOnExpire);
    uint256 refundAmountSelected = intent.rewardAmount - feeAmountSelected;

    if (feeAmountSelected > 0) {
      _safeTransfer(
        IERC20(intent.rewardToken),
        feeRecipient,
        feeAmountSelected
      );
    }
    if (refundAmountSelected > 0) {
      _safeTransfer(
        IERC20(intent.rewardToken),
        intent.payer,
        refundAmountSelected
      );
    }

    if (intent.bondAmount > 0) {
      _safeTransfer(
        IERC20(intent.rewardToken),
        feeRecipient,
        intent.bondAmount
      );
    }

    reputation[intent.winner] -= 1;
    emit ReputationUpdated(
      intent.winner,
      reputation[intent.winner],
      ReputationReason.WINNER_TIMEOUT
    );

    intent.state = State.EXPIRED;
    emit Expired(id, State.SELECTED, feeAmountSelected, refundAmountSelected);
  }

  function getIntent(bytes32 id) external view returns (Intent memory) {
    return _intents[id];
  }

  function _accept(bytes32 id) internal {
    Intent storage intent = _intents[id];
    if (intent.state != State.FULFILLED) revert InvalidState();

    uint256 feeAmount = (intent.rewardAmount * feeBpsOnAccept) / 10_000;
    uint256 payAmount = intent.rewardAmount - feeAmount;

    if (payAmount > 0) {
      _safeTransfer(IERC20(intent.rewardToken), intent.winner, payAmount);
    }
    if (feeAmount > 0) {
      _safeTransfer(IERC20(intent.rewardToken), feeRecipient, feeAmount);
    }
    if (intent.bondAmount > 0) {
      _safeTransfer(
        IERC20(intent.rewardToken),
        intent.winner,
        intent.bondAmount
      );
    }

    reputation[intent.winner] += 1;
    emit ReputationUpdated(
      intent.winner,
      reputation[intent.winner],
      ReputationReason.ACCEPTED
    );

    intent.state = State.ACCEPTED;
    emit Accepted(
      id,
      intent.winner,
      intent.rewardAmount,
      feeAmount,
      intent.bondAmount
    );
  }

  function _calcBondAmount(
    uint256 rewardAmount
  ) internal view returns (uint256) {
    uint256 byBps = (rewardAmount * bondBpsOfReward) / 10_000;
    if (bondMin > byBps) return bondMin;
    return byBps;
  }

  function _min(uint256 a, uint256 b) private pure returns (uint256) {
    return a < b ? a : b;
  }

  function _safeTransfer(IERC20 token, address to, uint256 amount) private {
    (bool success, bytes memory data) = address(token).call(
      abi.encodeWithSelector(IERC20.transfer.selector, to, amount)
    );
    if (!success || (data.length != 0 && !abi.decode(data, (bool))))
      revert TransferFailed();
  }

  function _safeTransferFrom(
    IERC20 token,
    address from,
    address to,
    uint256 amount
  ) private {
    (bool success, bytes memory data) = address(token).call(
      abi.encodeWithSelector(IERC20.transferFrom.selector, from, to, amount)
    );
    if (!success || (data.length != 0 && !abi.decode(data, (bool))))
      revert TransferFailed();
  }
}
