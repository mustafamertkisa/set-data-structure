# Solidity API

## SetDataStructure

### wallets

```solidity
address[] wallets
```

### balance

```solidity
mapping(address => uint256) balance
```

Map balances to wallets

### constructor

```solidity
constructor() public
```

Sets the default admin role to msg.sender

### WalletAdded

```solidity
event WalletAdded(address wallet, uint256 balance)
```

### WalletRemoved

```solidity
event WalletRemoved(address wallet)
```

### InvalidAddress

```solidity
error InvalidAddress(address wallet)
```

### WalletAlreadyExist

```solidity
error WalletAlreadyExist(address wallet)
```

### WalletLengthIsNotEnough

```solidity
error WalletLengthIsNotEnough(uint256 walletLength)
```

### InvalidBalance

```solidity
error InvalidBalance(address wallet, uint256 balance)
```

### AddressNotFound

```solidity
error AddressNotFound(address wallet)
```

### WalletAddressDoesNotExist

```solidity
error WalletAddressDoesNotExist(address wallet)
```

### add

```solidity
function add(address _wallet, uint256 _balance) external
```

Only admin can adds wallet and balance

_Works when contract status is not pause and includes reentrancy guard_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _wallet | address | Requested wallet address |
| _balance | uint256 | Requested balance |

### remove

```solidity
function remove(address _wallet) external
```

Only admin can remove wallet

_Works when contract status is not pause and includes reentrancy guard_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _wallet | address | Requested wallet address |

### existence

```solidity
function existence(address _wallet) public view returns (bool)
```

Presence of the address in the array

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _wallet | address | Requested wallet address |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | balance Balance of the requested wallet address |

### count

```solidity
function count() public view returns (uint256)
```

Count of elements of the wallets array

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | length Length of the wallets array |

### order

```solidity
function order(address _wallet) public view returns (uint256)
```

Index of the given address in the array

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _wallet | address | Requested wallet address |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | index Index in the wallets array |

### valueOfKey

```solidity
function valueOfKey(address _wallet) public view returns (uint256)
```

The mapped value of the given address

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _wallet | address | Requested wallet address |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | value For this map this value is the balance |

### pause

```solidity
function pause(bool val) public
```

Only admin can change the pause state of the contract

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| val | bool | true if pause, false if unpause |

