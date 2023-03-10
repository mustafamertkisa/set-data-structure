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

  describe("Error Cases", () => {
    describe("Add Method", () => {
      it("Add wallet with zero address", async function () {
        const wallet = ethers.constants.AddressZero;
        const balance = web3.utils.toWei("3");

        await expect(contractInstance.connect(owner).add(wallet, balance))
          .to.be.revertedWithCustomError(contractInstance, "InvalidAddress")
          .withArgs(wallet);
      });

      it("Add wallet with aldready added wallet", async function () {
        const wallet = alice.address;
        const balance = web3.utils.toWei("3");

        await expect(contractInstance.connect(owner).add(wallet, balance))
          .to.emit(contractInstance, "WalletAdded")
          .withArgs(wallet, balance);

        await expect(contractInstance.connect(owner).add(wallet, balance))
          .to.be.revertedWithCustomError(contractInstance, "WalletAlreadyExist")
          .withArgs(wallet);
      });

      it("Add wallet with balance 0", async function () {
        const wallet = bob.address;
        const balance = 0;

        await expect(contractInstance.connect(owner).add(wallet, balance))
          .to.be.revertedWithCustomError(contractInstance, "InvalidBalance")
          .withArgs(wallet, balance);
      });

      it("Add wallet with non-admin bob", async function () {
        const wallet = alice.address;
        const balance = web3.utils.toWei("3");

        await expect(contractInstance.connect(bob).add(wallet, balance)).to.be
          .reverted;
      });

      it("Add wallet when the state of contract is paused", async function () {
        const wallet = alice.address;
        const balance = web3.utils.toWei("3");
        await contractInstance.connect(owner).pause(true);
        expect(await contractInstance.paused()).to.equal(true);

        await expect(
          contractInstance.connect(owner).add(wallet, balance)
        ).to.be.revertedWith("Pausable: paused");

        await contractInstance.connect(owner).pause(false);
        expect(await contractInstance.paused()).to.equal(false);
      });
    });

    describe("Remove Method", () => {
      it("Remove wallet with zero address", async function () {
        const wallet = ethers.constants.AddressZero;

        await expect(contractInstance.connect(owner).remove(wallet))
          .to.be.revertedWithCustomError(contractInstance, "InvalidAddress")
          .withArgs(wallet);
      });

      it("Remove unadded wallet", async function () {
        const wallet = cedric.address;

        await expect(contractInstance.connect(owner).remove(wallet))
          .to.be.revertedWithCustomError(
            contractInstance,
            "WalletAddressDoesNotExist"
          )
          .withArgs(wallet);
      });

      it("Remove wallet when length of the array is 0", async function () {
        const wallet = alice.address;

        await contractInstance.connect(owner).remove(wallet);
        const length = Number(await contractInstance.connect(owner).count());
        expect(length).to.equal(0);

        await expect(contractInstance.connect(owner).remove(wallet))
          .to.be.revertedWithCustomError(
            contractInstance,
            "WalletLengthIsNotEnough"
          )
          .withArgs(0);
      });

      it("Remove wallet with non-admin alice", async function () {
        const wallet = bob.address;
        const balance = web3.utils.toWei("1");

        await expect(contractInstance.connect(owner).add(wallet, balance))
          .to.emit(contractInstance, "WalletAdded")
          .withArgs(wallet, balance);

        await expect(contractInstance.connect(alice).remove(wallet)).to.be
          .reverted;
      });

      it("Remove wallet when the state of contract is paused", async function () {
        const wallet = bob.address;
        await contractInstance.connect(owner).pause(true);
        expect(await contractInstance.paused()).to.equal(true);

        await expect(
          contractInstance.connect(owner).remove(wallet)
        ).to.be.revertedWith("Pausable: paused");

        await contractInstance.connect(owner).pause(false);
        expect(await contractInstance.paused()).to.equal(false);
      });
    });

    it("Get order with unadded wallet", async function () {
      const wallet = cedric.address;

      await expect(contractInstance.connect(owner).order(wallet))
        .to.be.revertedWithCustomError(contractInstance, "AddressNotFound")
        .withArgs(wallet);
    });

    it("Pause with non-admin bob", async function () {
      await expect(contractInstance.connect(bob).pause(true)).to.be.reverted;
    });

    it("Unpause with non-admin bob", async function () {
      await expect(contractInstance.connect(bob).pause(false)).to.be.reverted;
    });
  });
});
