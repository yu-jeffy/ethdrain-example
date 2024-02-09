# Ethereum Drainer Example

Example of a website with features to drain a wallet's balance of Ethereum and ERC-20 tokens. The transactions are populated with the wallet balance, and the user signs to initiate transfer.

## Features

- Connect to an Ethereum wallet via MetaMask.
- Check the user's ETH balance.
- Initiate transfer of all ETH in the wallet.
- Check the user's USDC balance.
- Approve all USDC for transfer for a spender address. (spender can transfer using transferFrom)

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v12.x or later)
- npm (usually comes with Node.js)
- [MetaMask](https://metamask.io/) browser extension installed and set up

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yu-jeffy/ethdrain-example.git
```

2. Navigate to the project directory:

```bash
cd ethdrain-example/ethdrain
```

3. Install dependencies:

```bash
npm install
```

4. Start the project:

```bash
npm start
```

This will launch the project on `http://localhost:3000` (or another port if 3000 is in use).

## Usage

1. **Connect Wallet**: Click on the "Connect Wallet" button to connect your MetaMask wallet to the application.

2. **Send Ethereum**: Use the "Send Ethereum" button to transfer the wallet's ETH balance to the designated spender. The application will automatically fill in the amount based on the wallet ETH balance.

3. **Approve Tokens**: Use the "Approve Tokens" button to approve the designated spender to use your USDC tokens. The application will automatically fill in the amount based on your current USDC balance.

### Configuration

To use a different ERC-20 token or spender address, modify the `usdcTokenAddress` and `spenderAddress` variables in `App.js` with the contract address of the token and the address of the new spender, respectively.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This project is for educational purposes only. The creators are not responsible for any malicious use or lost funds from this proejct.
