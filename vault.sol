//SPDX-License-Identifier MIT
pragma solidity ^0.8.0;

contract Vault {
    address public owner;
    uint256 public balance;
    uint256 public gasFee = 100 gwei;


    constructor() {
        owner = msg.sender;
    }

    // Function to return the balance of a given address
    function getBalance(address _addr) public view returns (uint) {
        // Return the balance of the address
        return _addr.balance;
    }

    // Deposit into the contract
    function deposit() public payable {
        balance += msg.value;
    }

    // Withdraw from the contract
    function withdraw(uint256 _amount) public {
        require(msg.sender == owner, "only owner can withdraw");
        require(_amount <= balance, "insufficient balance");
        payable(owner).transfer(_amount);
        balance -= _amount;
    }
}