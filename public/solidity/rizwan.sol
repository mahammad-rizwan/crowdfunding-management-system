// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CryptoDonation {
    address public owner;
    uint256 public totalDonations;

    event DonationReceived(address indexed donor, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    // Function to donate Ether to the contract
    function donate() public payable {
        require(msg.value > 0, "Donation must be greater than 0");
        totalDonations += msg.value;
        emit DonationReceived(msg.sender, msg.value);
    }

    // Function for the owner to withdraw Ether from the contract
    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }

    // Function to check the balance of the contract
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
