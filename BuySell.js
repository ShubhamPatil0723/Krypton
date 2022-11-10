import { ethers } from "ethers";

const BuySellContractAddress = "0xf477e1EAc1b336F403624534b8055102e512B95b";

const BuySellContractABI = [
	{
		"inputs": [],
		"name": "buyTokens",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "tokenAmount",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountOfETH",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountOfTokens",
				"type": "uint256"
			}
		],
		"name": "BuyTokens",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenAmountToSell",
				"type": "uint256"
			}
		],
		"name": "sellTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountOfTokens",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountOfETH",
				"type": "uint256"
			}
		],
		"name": "SellTokens",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokensPerEth",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let BuySellContract;
let signer;

const provider = new ethers.providers.Web3Provider(window.ethereum, "ropsten");

provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
        signer = provider.getSigner(accounts[0]);
        BuySellContract = new ethers.Contract(
            BuySellContractAddress,
            BuySellContractABI,
            signer
        );
    });
});

document.getElementById("buyTokens").addEventListener("click", async () => {
    let amount = document.getElementById("value").value;
    let eth = parseInt(amount) * 0.01;
    let buyTokensPromise = BuySellContract.buyTokens({value: ethers.utils.parseEther(eth.toString())});
    let status = await buyTokensPromise;
    console.log(status);
});

document.getElementById("value").addEventListener("keypress", () => {
	let tokenAmount = document.getElementById("value").value;
	// console.log(tokenAmount);
	let etherAmount = parseInt(tokenAmount) * 0.1;
	document.getElementById("ethAmount").value = etherAmount.toString();  
});

// document.getElementById("sellTokens").addEventListener("click", async () => {
//     let amount = document.getElementById("value").value;
//     let sellTokensPromise = BuySellContract.sellTokens(amount);
//     let status = await sellTokensPromise;
//     console.log(status);
// });



