//@ts-nocheck
import { ethers } from 'ethers';

async function hasAccounts() {
	const eth = window.ethereum;
	const accounts = await eth.request({ method: 'eth_accounts' });
	return accounts && accounts.length;
}

async function requestAccounts() {
	const eth = window.ethereum;
	console.log({ eth });
	const accounts = await eth.request({ method: 'eth_requestAccounts' });
	console.log({ accounts });
	return accounts && accounts.length;
}

async function run() {
	if (!(await hasAccounts()) && !(await requestAccounts())) {
		throw new Error('Please let me take your money');
	}
	const contract = new ethers.Contract(
		'0x5fbdb2315678afecb367f032d93f642f64180aa3',
		['function hello() public pure returns (string memory)'],
		new ethers.providers.Web3Provider(window.ethereum)
	);

	document.body.innerHTML = await contract.hello();
}

run();
