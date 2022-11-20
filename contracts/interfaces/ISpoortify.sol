// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ISpoortify {
    function isPaid(string memory _playlistId) external view returns (bool);
}