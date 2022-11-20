// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./interfaces/IUser.sol";
import "./interfaces/ISpoortify.sol";

contract Spoortify is IUser, ISpoortify, Pausable, ReentrancyGuard {

    mapping (address => uint256) private _userBalances;
    mapping (address => mapping(string => bool)) private _userPaidPlaylists;
    address private _owner;

    constructor() Pausable() ReentrancyGuard() {
        _owner = msg.sender;
    }
    modifier onlyOwner() {
        require(msg.sender == _owner, "!owner");
        _;
    }
    function isPaid(string memory _playlistId) external view returns (bool) {
        return  _userPaidPlaylists[msg.sender][_playlistId];
    }

    function deposit() external payable whenNotPaused{
        _userBalances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function getBalance() external view returns(uint256) {
        return _userBalances[msg.sender];
    }

    function withdraw(uint256 _amount) external nonReentrant whenNotPaused {
        require(_userBalances[msg.sender] >= _amount, "Balance < _amount");
        _userBalances[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
        emit Withdraw(msg.sender, _amount);
    }

    function buy(address _artist, string memory _playlistId, uint256 _amount) external whenNotPaused {
        require(_userBalances[msg.sender] >= _amount, "Balance < _amount");
        _userBalances[msg.sender] -= _amount;
        _userBalances[_artist] += _amount;
        _userPaidPlaylists[msg.sender][_playlistId] = true;
        emit Buy(msg.sender, _owner, _amount);
    }

    function pause() external onlyOwner {
        _pause();
    }
    function unpause() external onlyOwner {
        _unpause();
    }
}