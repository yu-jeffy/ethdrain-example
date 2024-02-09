const { ethers } = require('ethers');

// User's wallet private key (use environment variables for production)
const userWalletPrivateKey = 'YOUR-WALLET-PRIVATE-KEY';
// Ethereum network provider URL (e.g., Infura, Alchemy)
const providerURL = 'YOUR-PROVIDER-URL';
// USDC token contract address
const usdcTokenAddress = 'USDC-TOKEN-CONTRACT-ADDRESS'; //mainnet 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
// Address of the contract or wallet to approve for transferring USDC on your behalf
const spenderAddress = 'SPENDER-ADDRESS';

// ERC-20 Token ABI
const erc20Abi = [
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function balanceOf(address account) external view returns (uint256)',
];

async function approveTokenTransfer() {
  let provider;
  
  try {
    provider = new ethers.providers.JsonRpcProvider(providerURL);
    // Attempt to get the current network to check the connection
    await provider.getNetwork();
  } catch (error) {
    console.error(`Failed to connect to the Ethereum network: ${error.message}`);
    return; // Exit if no connection could be established
  }
  
  // Connect to the USDC token contract
  const tokenContract = new ethers.Contract(usdcTokenAddress, erc20Abi, wallet);

  try {
    // Get the user's USDC balance
    const balance = await tokenContract.balanceOf(wallet.address);
    console.log(`Current USDC balance is: ${ethers.utils.formatUnits(balance, 6)} USDC`);

    // Approve the spender contract to transfer all of the user's USDC
    const approveTx = await tokenContract.approve(spenderAddress, balance);
    const receipt = await approveTx.wait();
    
    console.log(`Transaction successful with hash: ${receipt.transactionHash}`);
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
}

approveTokenTransfer();
