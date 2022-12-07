// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

contract Pay {
    event Send(address receiver, uint amount, string message);
    function sendeth (address payable receiver, uint amount, string memory message) public payable {
        amount = msg.value;
        receiver.transfer(amount);
        emit Send(receiver, amount, message);
    } 
}