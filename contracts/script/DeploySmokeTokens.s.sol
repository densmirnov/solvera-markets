// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/MockERC20.sol";

contract DeploySmokeTokens is Script {
    function run() external returns (MockERC20 rewardToken, MockERC20 tokenOut) {
        string memory keyStr = vm.envOr("DEPLOYER_PRIVATE_KEY", string(""));
        if (bytes(keyStr).length == 0) {
            keyStr = vm.envOr("STATUS_DEPLOYER_PRIVATE_KEY", string(""));
        }
        if (bytes(keyStr).length == 0) {
            keyStr = vm.envString("BASE_DEPLOYER_PRIVATE_KEY");
        }
        if (bytes(keyStr).length == 64) {
            keyStr = string(abi.encodePacked("0x", keyStr));
        }

        uint256 deployerKey = vm.parseUint(keyStr);
        address owner = vm.addr(deployerKey);
        uint256 mintAmount = vm.envOr("SMOKE_TOKEN_MINT", uint256(1_000_000e18));

        vm.startBroadcast(deployerKey);
        rewardToken = new MockERC20("Solvera Reward Smoke", "SRWD");
        tokenOut = new MockERC20("Solvera Output Smoke", "SOUT");
        rewardToken.mint(owner, mintAmount);
        tokenOut.mint(owner, mintAmount);
        vm.stopBroadcast();
    }
}
