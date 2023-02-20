require("@nomicfoundation/hardhat-toolbox");
require("solidity-docgen");
require("hardhat-gas-reporter");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.17",
    settings: { optimizer: { enabled: true, runs: 200 } },
  },
  gasReporter: {
    enabled: true,
    showTimeSpent: true,
    showMethodSig: true,
  },
};
