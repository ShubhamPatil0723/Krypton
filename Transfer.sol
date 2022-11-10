// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Transfer{
    address payable receiver;

    receive() external payable{}
    event transact(address receiver, address sender, uint amount, bool result);

    function getBalance() private view returns(uint){
        return address(receiver).balance;
    }

    function sendEth(uint _amount, address _receiver) payable external{
        uint amount = _amount;
        receiver = payable(_receiver);
        require(amount <= getBalance(), "Not enough funds");
        (bool success,) = receiver.call{value: amount}("");
        emit transact(receiver, msg.sender, amount, success);
    }
}