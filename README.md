# Set Data Structure Project

In this project, the map structure in a smart contract developed with solidity is examined.<br><br>We have an array of wallet addresses and map each address to a balance.<br>After, we develop the following functions with this map:

- Add wallet
- Remove wallet
- Fetch item existence, count, order, and balance of wallet

> The deploy script and tests of the contract were developed using the Hardhat tool.<br>Gas reporter is included in the test result.<br>Documentation of the contract was created with the solidity-docgen module.

### Try running some of the following tasks:

`npx hardhat compile` _Compile smart contract_<br>`npx hardhat node` _Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/_<br>`npx hardhat test` _Run all test files_<br>`npx hardhat run scripts/deploy.js` _Deploy smart contract_
