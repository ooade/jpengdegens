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
	console.log(process.env.CONTRACT_ADDRESS);
	const counter = new ethers.Contract(
		process.env.CONTRACT_ADDRESS,
		[
			'function count() public',
			'function getCounter() public view returns (uint32)',
		],
		new ethers.providers.Web3Provider(window.ethereum).getSigner()
	);

	const result = document.createElement('div');
	async function setResult(count) {
		result.innerText = count || (await counter.getCounter());
	}
	setResult();
	// console.log(counter.filters.CounterInc);
	counter.on({ topics: [ethers.utils.id('CounterInc()')] }, function (count) {
		setResult(count);
	});

	const button = document.createElement('button');
	button.innerText = 'Increment';
	button.addEventListener('click', async () => {
		await counter.count();
	});

	document.body.appendChild(result);
	document.body.appendChild(button);
}

run();
