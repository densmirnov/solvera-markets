// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/IntentMarketplace.sol";

contract DeployIntentMarketplace is Script {
    function run() external returns (IntentMarketplace market) {
        string memory keyStr = vm.envString("BASE_DEPLOYER_PRIVATE_KEY");
        if (bytes(keyStr).length == 64) {
            keyStr = string(abi.encodePacked("0x", keyStr));
        }
        uint256 deployerKey = vm.parseUint(keyStr);
        address deployer = vm.addr(deployerKey);

        address feeRecipient = vm.envOr("FEE_RECIPIENT", deployer);
        uint16 feeBpsOnAccept = uint16(vm.envOr("FEE_BPS_ON_ACCEPT", uint256(50)));
        uint256 fixedFeeOnExpire = vm.envOr("FIXED_FEE_ON_EXPIRE", uint256(1e6));
        uint16 bondBpsOfReward = uint16(vm.envOr("BOND_BPS_OF_REWARD", uint256(200)));
        uint256 bondMin = vm.envOr("BOND_MIN", uint256(1e6));

        vm.startBroadcast(deployerKey);
        market = new IntentMarketplace(feeRecipient, feeBpsOnAccept, fixedFeeOnExpire, bondBpsOfReward, bondMin);
        vm.stopBroadcast();
    }
}
