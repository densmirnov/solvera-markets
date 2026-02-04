// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/IntentMarketplace.sol";

contract MockERC20 {
    string public name;
    string public symbol;
    uint8 public decimals = 18;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor(string memory name_, string memory symbol_) {
        name = name_;
        symbol = symbol_;
    }

    function mint(address to, uint256 amount) external {
        balanceOf[to] += amount;
        totalSupply += amount;
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        return true;
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        require(balanceOf[msg.sender] >= amount, "BAL");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        require(balanceOf[from] >= amount, "BAL");
        uint256 allowed = allowance[from][msg.sender];
        require(allowed >= amount, "ALLOW");
        allowance[from][msg.sender] = allowed - amount;
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        return true;
    }
}

contract IntentMarketplaceTest is Test {
    IntentMarketplace private market;
    MockERC20 private reward;
    MockERC20 private tokenOut;

    address private feeRecipient = address(0xFEE1);
    address private payer = address(0x1001);
    address private initiator = address(0x1002);
    address private verifier = address(0x1003);
    address private solver = address(0x1004);

    uint16 private feeBps = 50; // 0.5%
    uint256 private fixedFee = 1e6;
    uint16 private bondBps = 200; // 2%
    uint256 private bondMin = 1e6;

    function setUp() public {
        reward = new MockERC20("Reward", "RWD");
        tokenOut = new MockERC20("TokenOut", "OUT");
        market = new IntentMarketplace(feeRecipient, feeBps, fixedFee, bondBps, bondMin);

        reward.mint(payer, 1_000_000e18);
        reward.mint(solver, 1_000_000e18);
        tokenOut.mint(solver, 1_000_000e18);

        vm.prank(payer);
        reward.approve(address(market), type(uint256).max);

        vm.prank(solver);
        reward.approve(address(market), type(uint256).max);

        vm.prank(solver);
        tokenOut.approve(address(market), type(uint256).max);
    }

    function _createIntent(uint64 ttlSubmit, uint64 ttlAccept) internal returns (bytes32) {
        vm.prank(payer);
        return market.createIntent(
            address(tokenOut), 100e18, address(reward), 10e18, payer, initiator, verifier, ttlSubmit, ttlAccept
        );
    }

    function test_happyPath() public {
        uint64 ttlSubmit = uint64(block.timestamp + 100);
        uint64 ttlAccept = uint64(block.timestamp + 200);
        bytes32 id = _createIntent(ttlSubmit, ttlAccept);

        vm.prank(solver);
        market.submitOffer(id, 150e18);

        vm.prank(verifier);
        market.selectWinner(id, solver, 150e18);

        vm.prank(solver);
        market.fulfill(id);

        IntentMarketplace.Intent memory intent = market.getIntent(id);
        assertEq(uint8(intent.state), uint8(IntentMarketplace.State.ACCEPTED));
        assertEq(tokenOut.balanceOf(initiator), 150e18);
    }

    function test_expireFromOpen_refundMinusFee() public {
        uint64 ttlSubmit = uint64(block.timestamp + 10);
        uint64 ttlAccept = uint64(block.timestamp + 20);
        bytes32 id = _createIntent(ttlSubmit, ttlAccept);

        vm.warp(ttlSubmit + 1);
        market.expire(id);

        IntentMarketplace.Intent memory intent = market.getIntent(id);
        assertEq(uint8(intent.state), uint8(IntentMarketplace.State.EXPIRED));
    }

    function test_expireFromSelected_slashBondAndReputation() public {
        uint64 ttlSubmit = uint64(block.timestamp + 10);
        uint64 ttlAccept = uint64(block.timestamp + 20);
        bytes32 id = _createIntent(ttlSubmit, ttlAccept);

        vm.prank(verifier);
        market.selectWinner(id, solver, 150e18);

        vm.warp(ttlAccept + 1);
        market.expire(id);

        IntentMarketplace.Intent memory intent = market.getIntent(id);
        assertEq(uint8(intent.state), uint8(IntentMarketplace.State.EXPIRED));
        assertEq(market.reputation(solver), -1);
    }

    function test_selectWinner_wrongCallerReverts() public {
        uint64 ttlSubmit = uint64(block.timestamp + 10);
        uint64 ttlAccept = uint64(block.timestamp + 20);
        bytes32 id = _createIntent(ttlSubmit, ttlAccept);

        vm.expectRevert(IntentMarketplace.Unauthorized.selector);
        market.selectWinner(id, solver, 150e18);
    }

    function test_fulfill_wrongCallerReverts() public {
        uint64 ttlSubmit = uint64(block.timestamp + 10);
        uint64 ttlAccept = uint64(block.timestamp + 20);
        bytes32 id = _createIntent(ttlSubmit, ttlAccept);

        vm.prank(verifier);
        market.selectWinner(id, solver, 150e18);

        vm.expectRevert(IntentMarketplace.Unauthorized.selector);
        market.fulfill(id);
    }

    function test_submitOffer_afterTtlSubmitReverts() public {
        uint64 ttlSubmit = uint64(block.timestamp + 5);
        uint64 ttlAccept = uint64(block.timestamp + 10);
        bytes32 id = _createIntent(ttlSubmit, ttlAccept);

        vm.warp(ttlSubmit + 1);
        vm.prank(solver);
        vm.expectRevert(IntentMarketplace.InvalidTime.selector);
        market.submitOffer(id, 120e18);
    }

    function test_submitOffer_zeroAmountReverts() public {
        uint64 ttlSubmit = uint64(block.timestamp + 5);
        uint64 ttlAccept = uint64(block.timestamp + 10);
        bytes32 id = _createIntent(ttlSubmit, ttlAccept);

        vm.prank(solver);
        vm.expectRevert(IntentMarketplace.InvalidAmount.selector);
        market.submitOffer(id, 0);
    }

    function test_selectWinner_zeroSolverReverts() public {
        uint64 ttlSubmit = uint64(block.timestamp + 5);
        uint64 ttlAccept = uint64(block.timestamp + 10);
        bytes32 id = _createIntent(ttlSubmit, ttlAccept);

        vm.prank(verifier);
        vm.expectRevert(IntentMarketplace.InvalidAmount.selector);
        market.selectWinner(id, address(0), 120e18);
    }

    function test_selectWinner_afterTtlSubmitReverts() public {
        uint64 ttlSubmit = uint64(block.timestamp + 10);
        uint64 ttlAccept = uint64(block.timestamp + 20);
        bytes32 id = _createIntent(ttlSubmit, ttlAccept);

        vm.warp(ttlSubmit + 1);
        vm.prank(verifier);
        vm.expectRevert(IntentMarketplace.InvalidTime.selector);
        market.selectWinner(id, solver, 150e18);
    }

    function test_fulfill_afterTtlAcceptReverts() public {
        uint64 ttlSubmit = uint64(block.timestamp + 10);
        uint64 ttlAccept = uint64(block.timestamp + 20);
        bytes32 id = _createIntent(ttlSubmit, ttlAccept);

        vm.prank(verifier);
        market.selectWinner(id, solver, 150e18);

        vm.warp(ttlAccept + 1);
        vm.prank(solver);
        vm.expectRevert(IntentMarketplace.InvalidTime.selector);
        market.fulfill(id);
    }

    function test_fulfill_minAmountOutReverts() public {
        uint64 ttlSubmit = uint64(block.timestamp + 10);
        uint64 ttlAccept = uint64(block.timestamp + 20);
        bytes32 id = _createIntent(ttlSubmit, ttlAccept);

        vm.prank(verifier);
        market.selectWinner(id, solver, 50e18);

        vm.prank(solver);
        vm.expectRevert(IntentMarketplace.InvalidAmount.selector);
        market.fulfill(id);
    }

    function test_accept_updates_balances() public {
        uint64 ttlSubmit = uint64(block.timestamp + 10);
        uint64 ttlAccept = uint64(block.timestamp + 20);
        bytes32 id = _createIntent(ttlSubmit, ttlAccept);

        uint256 feeBefore = reward.balanceOf(feeRecipient);

        vm.prank(verifier);
        market.selectWinner(id, solver, 150e18);

        uint256 afterSelect = reward.balanceOf(solver);

        vm.prank(solver);
        market.fulfill(id);

        uint256 rewardAfter = reward.balanceOf(solver);
        assertTrue(rewardAfter > afterSelect);
        assertTrue(reward.balanceOf(feeRecipient) > feeBefore);
    }

    function test_expireSelected_refundsAndSlashesBond() public {
        uint64 ttlSubmit = uint64(block.timestamp + 10);
        uint64 ttlAccept = uint64(block.timestamp + 20);
        bytes32 id = _createIntent(ttlSubmit, ttlAccept);

        uint256 payerBefore = reward.balanceOf(payer);
        uint256 feeBefore = reward.balanceOf(feeRecipient);

        vm.prank(verifier);
        market.selectWinner(id, solver, 150e18);

        vm.warp(ttlAccept + 1);
        market.expire(id);

        uint256 feeAmount = fixedFee;
        assertEq(reward.balanceOf(feeRecipient), feeBefore + feeAmount + market.getIntent(id).bondAmount);
        assertEq(reward.balanceOf(payer), payerBefore + (10e18 - feeAmount));
    }

    function test_createIntent_invalidTimeReverts() public {
        uint64 ttlSubmit = uint64(block.timestamp);
        uint64 ttlAccept = uint64(block.timestamp + 10);
        vm.prank(payer);
        vm.expectRevert(IntentMarketplace.InvalidTime.selector);
        market.createIntent(
            address(tokenOut), 1e18, address(reward), 10e18, payer, initiator, verifier, ttlSubmit, ttlAccept
        );
    }

    function test_createIntent_invalidAddressReverts() public {
        uint64 ttlSubmit = uint64(block.timestamp + 10);
        uint64 ttlAccept = uint64(block.timestamp + 20);
        vm.prank(payer);
        vm.expectRevert(IntentMarketplace.InvalidAddress.selector);
        market.createIntent(address(0), 1e18, address(reward), 10e18, payer, initiator, verifier, ttlSubmit, ttlAccept);
    }

    function test_createIntent_invalidAmountReverts() public {
        uint64 ttlSubmit = uint64(block.timestamp + 10);
        uint64 ttlAccept = uint64(block.timestamp + 20);
        vm.prank(payer);
        vm.expectRevert(IntentMarketplace.InvalidAmount.selector);
        market.createIntent(
            address(tokenOut), 0, address(reward), 10e18, payer, initiator, verifier, ttlSubmit, ttlAccept
        );
    }

    function test_feeEdge_rewardLessThanFixedFee() public {
        uint64 ttlSubmit = uint64(block.timestamp + 10);
        uint64 ttlAccept = uint64(block.timestamp + 20);

        vm.prank(payer);
        bytes32 id = market.createIntent(
            address(tokenOut), 100e18, address(reward), fixedFee - 1, payer, initiator, verifier, ttlSubmit, ttlAccept
        );

        vm.warp(ttlSubmit + 1);
        market.expire(id);

        IntentMarketplace.Intent memory intent = market.getIntent(id);
        assertEq(uint8(intent.state), uint8(IntentMarketplace.State.EXPIRED));
    }
}
