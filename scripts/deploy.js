const hre = require("hardhat");

async function main() {
  const SetDataStructure = await hre.ethers.getContractFactory(
    "SetDataStructure"
  );
  const setDataStructure = await SetDataStructure.deploy();
  await setDataStructure.deployed();

  console.log(`Contract deployed: ${setDataStructure.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
