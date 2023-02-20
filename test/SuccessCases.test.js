const { expect } = require("chai");
const { ethers } = require("hardhat");
const Web3 = require("web3");

let contractInstance, web3, owner, alice, bob, cedric;
describe("SetDataStructure Contract", function () {
  before(async function () {
    web3 = new Web3();
    [owner, alice, bob, cedric] = await ethers.getSigners();
    const ContractInstance = await ethers.getContractFactory(
      "SetDataStructure"
    );
    contractInstance = await ContractInstance.connect(owner).deploy();
  });

  it("Deployed set data structure contract ", async function () {
    expect(contractInstance.address).to.not.be.undefined;
  });

  describe("Success Cases", () => {
    let walletCounter = 0;
    it("Add wallet for alice", async function () {
      const wallet = alice.address;
      const balance = web3.utils.toWei("3");

      await expect(contractInstance.connect(owner).add(wallet, balance))
        .to.emit(contractInstance, "WalletAdded")
        .withArgs(wallet, balance);

      walletCounter++;
    });

    it("Add wallet for bob", async function () {
      const wallet = bob.address;
      const balance = web3.utils.toWei("1");

      await expect(contractInstance.connect(owner).add(wallet, balance))
        .to.emit(contractInstance, "WalletAdded")
        .withArgs(wallet, balance);

      walletCounter++;
    });

    it("Does it include alice in the array", async function () {
      const wallet = alice.address;
      const included = await contractInstance.connect(owner).existence(wallet);
      expect(included).to.equal(true);
    });

    it("Length of the wallets array", async function () {
      const length = Number(await contractInstance.connect(owner).count());
      expect(length).to.equal(walletCounter);
    });

    it("Index of the bob in the wallets array", async function () {
      const wallet = bob.address;
      const index = Number(await contractInstance.connect(owner).order(wallet));
      expect(1).to.equal(index);
    });

    it("Value of alice and bob in the balance map", async function () {
      const balanceDefinedToAlice = web3.utils.toWei("3");
      const balanceDefinedToBob = web3.utils.toWei("1");

      const aliceBalance = await contractInstance
        .connect(owner)
        .valueOfKey(alice.address);
      const bobBalance = await contractInstance
        .connect(owner)
        .valueOfKey(bob.address);

      expect(balanceDefinedToAlice).to.equal(aliceBalance);
      expect(balanceDefinedToBob).to.equal(bobBalance);
    });

    it("Remove bob wallet", async function () {
      const wallet = bob.address;

      await expect(contractInstance.connect(owner).remove(wallet))
        .to.emit(contractInstance, "WalletRemoved")
        .withArgs(wallet);

      walletCounter--;

      const length = Number(await contractInstance.connect(owner).count());
      expect(length).to.equal(walletCounter);

      const included = await contractInstance.connect(owner).existence(wallet);
      expect(included).to.equal(false);
    });
  });
});
