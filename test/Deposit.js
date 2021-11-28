const { expect } = require("chai");
const { utils } = require("ethers");
const { ethers } = require("hardhat");

describe("Deposit", function () {
    it("getBalance() should return an equal ammount", async function () {
        const Deposit = await ethers.getContractFactory("Deposit");
        const deposit = await Deposit.deploy();
        await deposit.deployed();
        const sendDeposit = await deposit.deposit({value: 100});
        await sendDeposit.wait();
        expect(await deposit.getBalance()).to.equal(100);
    });
    it("getDepositor() should return an equal ammount", async function () {
        const Deposit = await ethers.getContractFactory("Deposit");
        const deposit = await Deposit.deploy();
        await deposit.deployed();
        const sendDeposit = await deposit.deposit({value: 100});
        await sendDeposit.wait();
        expect(await deposit.getDepositSum()).to.equal(100);
    });
    it("getAllDepositor() should return depositor's address", async function () {
        const [owner, addr1, ...addrs] = await ethers.getSigners();
        const Deposit = await ethers.getContractFactory("Deposit");
        const deposit = await Deposit.deploy();
        await deposit.deployed();
        const sendDeposit = await deposit.deposit({from: owner.address, value: 100});
        await sendDeposit.wait();
        expect(await deposit.getAllDepositor()).to.eql([owner.address]);
    });
    it("withdraw() should withdraw some contract's balance", async function () {
        const [owner, addr1, ...addrs] = await ethers.getSigners();
        const Deposit = await ethers.getContractFactory("Deposit");
        const deposit = await Deposit.deploy();
        await deposit.deployed();
        const sendDeposit = await deposit.deposit({value: 100});
        await sendDeposit.wait();
        const makeWithdraw = await deposit.withdraw(owner.address, 100);
        await makeWithdraw.wait();
        expect(await deposit.getBalance()).to.equal(0);
    });
    it("Withdraw shouldn't withdraw with not owner command", async function () {
        const [owner, addr1, ...addrs] = await ethers.getSigners();
        const Deposit = await ethers.getContractFactory("Deposit");
        const deposit = await Deposit.deploy();
        await deposit.deployed();
        const sendDeposit = await deposit.deposit({value: 100});
        await sendDeposit.wait();
        await expect(deposit.connect(addr1).withdraw(addr1.address, 100)).to.be.revertedWith("Not owner");
    });
    it("If deposit 0", async function () {
        const Deposit = await ethers.getContractFactory("Deposit");
        const deposit = await Deposit.deploy();
        await deposit.deployed();
        await expect(deposit.deposit({value: 0})).to.be.revertedWith("Value is 0");
    });
    it("if amount is more than balance", async function () {
        const [owner, addr1, ...addrs] = await ethers.getSigners();
        const Deposit = await ethers.getContractFactory("Deposit");
        const deposit = await Deposit.deploy();
        await deposit.deployed();
        const sendDeposit = await deposit.deposit({value: 100});
        await sendDeposit.wait();
        await expect(deposit.withdraw(addr1.address, 200)).to.be.revertedWith("Amount more than balance");
    });
});