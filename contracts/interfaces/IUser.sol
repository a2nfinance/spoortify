// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IUser {
    event Deposit(address indexed _sender, uint256 _amount);
    event Withdraw(address indexed _sender, uint256 _amount);
    event Buy(address indexed _sender, address indexed _owner, uint256 _amount);
    function deposit() external payable;
    function getBalance() external view returns(uint256);
    function withdraw(uint256 _amount) external;
    function buy(address _artist, string memory _playlistId, uint256 _amount) external;
}