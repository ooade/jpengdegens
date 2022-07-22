import '@nomiclabs/hardhat-ethers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('hello word', function () {
	it('should say hi', async function () {
		const HelloWorld = await ethers.getContractFactory('HelloWorld');
		const hello = await HelloWorld.deploy();
		await hello.deployed();
		expect(await hello.hello()).to.equal('Hello, World');
	});
});
