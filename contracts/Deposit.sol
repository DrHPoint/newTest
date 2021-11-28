//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.1;

contract Deposit{
    address private owner;
    address[] private depositors;
    mapping (address => uint) private deposited;

    constructor() {
        owner = msg.sender;
    }
    
    function deposit() payable external {
        require(msg.value != 0, "Value is 0");
        if(deposited[msg.sender] == 0){
            depositors.push(msg.sender);
        }
        deposited[msg.sender] += msg.value;
    }

    function withdraw(address payable _someAddress, uint _amount) public payable {
        require(msg.sender == owner, "Not owner");
        require(_amount <= address(this).balance, "Amount more than balance");
        _someAddress.transfer(_amount);
    }

    function getDepositSum() external view returns (uint){
        return deposited[msg.sender];
    }

    function getBalance() external view returns (uint) {
        require(msg.sender == owner, "Not owner");
        return address(this).balance;
    }
    
    function getAllDepositor() external view returns (address[] memory) {
        return depositors;
    }
}
