// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
  function transfer(address to, uint256 amount) external returns (bool);
  function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

contract IntentMarketplace {
  enum State {
    OPEN,
    SELECTED,
    FULFILLED,
    ACCEPTED,
    EXPIRED
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
    uint256 amountOut
  );

  event Fulfilled(
    bytes32 indexed id,
    address indexed solver,
    uint256 amountOut
  );

  event Accepted(
    bytes32 indexed id,
    address indexed solver,
    uint256 rewardAmount
  );

  event Expired(
    bytes32 indexed id,
    State indexed fromState,
    uint256 refundAmount
  );

  uint256 private _nonce;
  mapping(bytes32 => Intent) private _intents;

  error InvalidTime();
  error InvalidAddress();
  error InvalidAmount();
  error InvalidState();
  error Unauthorized();
  error TransferFailed();

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
    if (block.timestamp >= ttlSubmit || ttlSubmit >= ttlAccept) revert InvalidTime();
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
    id = keccak256(abi.encode(payer, initiator, _nonce, block.chainid, address(this)));

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

  function selectWinner(bytes32 id, address solver, uint256 amountOut) external {
    Intent storage intent = _intents[id];
    if (intent.verifier != msg.sender) revert Unauthorized();
    if (intent.state != State.OPEN) revert InvalidState();
    if (block.timestamp > intent.ttlSubmit) revert InvalidTime();
    if (solver == address(0) || amountOut == 0) revert InvalidAmount();

    intent.winner = solver;
    intent.winnerAmountOut = amountOut;
    intent.state = State.SELECTED;

    emit WinnerSelected(id, solver, amountOut);
  }

  function fulfill(bytes32 id) external {
    Intent storage intent = _intents[id];
    if (intent.state != State.SELECTED) revert InvalidState();
    if (intent.winner != msg.sender) revert Unauthorized();
    if (block.timestamp > intent.ttlAccept) revert InvalidTime();
    if (intent.winnerAmountOut < intent.minAmountOut) revert InvalidAmount();

    _safeTransferFrom(IERC20(intent.tokenOut), msg.sender, address(this), intent.winnerAmountOut);
    _safeTransfer(IERC20(intent.tokenOut), intent.initiator, intent.winnerAmountOut);

    intent.state = State.FULFILLED;
    emit Fulfilled(id, msg.sender, intent.winnerAmountOut);

    _accept(id);
  }

  function expire(bytes32 id) external {
    Intent storage intent = _intents[id];
    if (intent.state != State.OPEN && intent.state != State.SELECTED) revert InvalidState();

    if (intent.state == State.OPEN) {
      if (block.timestamp <= intent.ttlSubmit) revert InvalidTime();
      if (intent.winner != address(0)) revert InvalidState();

      if (intent.rewardAmount > 0) {
        _safeTransfer(IERC20(intent.rewardToken), intent.payer, intent.rewardAmount);
      }

      intent.state = State.EXPIRED;
      emit Expired(id, State.OPEN, intent.rewardAmount);
      return;
    }

    if (block.timestamp <= intent.ttlAccept) revert InvalidTime();
    if (intent.state == State.FULFILLED) revert InvalidState();

    if (intent.rewardAmount > 0) {
      _safeTransfer(IERC20(intent.rewardToken), intent.payer, intent.rewardAmount);
    }

    intent.state = State.EXPIRED;
    emit Expired(id, State.SELECTED, intent.rewardAmount);
  }

  function getIntent(bytes32 id) external view returns (Intent memory) {
    return _intents[id];
  }

  function _accept(bytes32 id) internal {
    Intent storage intent = _intents[id];
    if (intent.state != State.FULFILLED) revert InvalidState();

    if (intent.rewardAmount > 0) {
      _safeTransfer(IERC20(intent.rewardToken), intent.winner, intent.rewardAmount);
    }

    intent.state = State.ACCEPTED;
    emit Accepted(id, intent.winner, intent.rewardAmount);
  }

  function _safeTransfer(IERC20 token, address to, uint256 amount) private {
    (bool success, bytes memory data) = address(token).call(
      abi.encodeWithSelector(IERC20.transfer.selector, to, amount)
    );
    if (!success || (data.length != 0 && !abi.decode(data, (bool)))) revert TransferFailed();
  }

  function _safeTransferFrom(IERC20 token, address from, address to, uint256 amount) private {
    (bool success, bytes memory data) = address(token).call(
      abi.encodeWithSelector(IERC20.transferFrom.selector, from, to, amount)
    );
    if (!success || (data.length != 0 && !abi.decode(data, (bool)))) revert TransferFailed();
  }
}
