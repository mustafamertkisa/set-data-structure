// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/// @title Set Data Structure
/// @author Mustafa Mert Kisa

contract SetDataStructure is AccessControl, ReentrancyGuard, Pausable {
    address[] public wallets;
    /// @notice Map balances to wallets
    mapping(address => uint256) public balance;

    /// @notice Sets the default admin role to msg.sender
    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    /*//////////////////////////////////////////////////////////////
                                EVENTS
    //////////////////////////////////////////////////////////////*/

    event WalletAdded(address wallet, uint256 balance);
    event WalletRemoved(address wallet);

    /*//////////////////////////////////////////////////////////////
                                ERRORS
    //////////////////////////////////////////////////////////////*/

    error InvalidAddress(address wallet);
    error WalletAlreadyExist(address wallet);
    error WalletLengthIsNotEnough(uint256 walletLength);
    error InvalidBalance(address wallet, uint256 balance);
    error AddressNotFound(address wallet);
    error WalletAddressDoesNotExist(address wallet);

    /*//////////////////////////////////////////////////////////////
                            EXTERNAL FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /// @notice Only admin can adds wallet and balance
    /// @dev Works when contract status is not pause and includes reentrancy guard
    /// @param _wallet Requested wallet address
    /// @param _balance Requested balance
    function add(
        address _wallet,
        uint256 _balance
    ) external onlyRole(DEFAULT_ADMIN_ROLE) whenNotPaused nonReentrant {
        // Can not add 0x address
        if (_wallet == address(0x0)) revert InvalidAddress(_wallet);
        // Can not existing wallet
        if (balance[_wallet] != 0) revert WalletAlreadyExist(_wallet);
        // Can not add balance less than 1
        if (_balance < 1) revert InvalidBalance(_wallet, _balance);
        wallets.push(_wallet);
        balance[_wallet] = _balance;
        emit WalletAdded(_wallet, _balance);
    }

    /// @notice Only admin can remove wallet
    /// @dev Works when contract status is not pause and includes reentrancy guard
    /// @param _wallet Requested wallet address
    function remove(
        address _wallet
    ) external onlyRole(DEFAULT_ADMIN_ROLE) whenNotPaused nonReentrant {
        // Can not add 0x address
        if (_wallet == address(0x0)) revert InvalidAddress(_wallet);
        // Can not remove all wallets
        if (wallets.length < 1) revert WalletLengthIsNotEnough(wallets.length);
        uint256 i = 0;
        while (wallets[i] != _wallet) {
            if (i == (wallets.length - 1)) {
                revert WalletAddressDoesNotExist(_wallet);
            }
            i++;
        }
        // Our desired value is now shifted as the last element of the array.
        wallets[i] = wallets[wallets.length - 1];
        // We override the address in the balance map
        balance[_wallet] = 0;
        // Remove the last wallet, since it's double present
        wallets.pop();
        emit WalletRemoved(_wallet);
    }

    /*//////////////////////////////////////////////////////////////
                            PUBLIC FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /// @notice Presence of the address in the array
    /// @param _wallet Requested wallet address
    /// @return balance Balance of the requested wallet address
    function existence(address _wallet) public view returns (bool) {
        return (balance[_wallet] != 0);
    }

    /// @notice Count of elements of the wallets array
    /// @return length Length of the wallets array
    function count() public view returns (uint256) {
        return wallets.length;
    }

    /// @notice Index of the given address in the array
    /// @param _wallet Requested wallet address
    /// @return index Index in the wallets array
    function order(address _wallet) public view returns (uint256) {
        for (uint256 i = 0; i < wallets.length; i++) {
            if (wallets[i] == _wallet) {
                return i;
            }
        }
        revert AddressNotFound(_wallet);
    }

    /// @notice The mapped value of the given address
    /// @param _wallet Requested wallet address
    /// @return value For this map this value is the balance
    function valueOfKey(address _wallet) public view returns (uint256) {
        return balance[_wallet];
    }

    /// @notice Only admin can change the pause state of the contract
    /// @param val true if pause, false if unpause
    function pause(bool val) public onlyRole(DEFAULT_ADMIN_ROLE) {
        if (val == true) {
            _pause();
            return;
        }
        _unpause();
    }
}
