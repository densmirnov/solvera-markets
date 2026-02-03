// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Deprecated placeholder from forge init. Not used by the project.
contract Counter {
  uint256 public number;

  function setNumber(uint256 newNumber) public {
    number = newNumber;
  }

  function increment() public {
    number++;
  }
}
