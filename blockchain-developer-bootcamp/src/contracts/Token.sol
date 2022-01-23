// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0;

import 'openzeppelin-solidity/contracts/math/SafeMath.sol';


contract Token {
    using SafeMath for uint;

    //variables
    string public name = "Confluence Coin";
    string public symbol = "FLOW";
    uint256 public decimals = 18;
    uint256 public totalSupply;

    //Events
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Transfer(address indexed from, address to, uint256 value);
   

    //track balance
    mapping(address => uint256) public balanceOf;
    //track amount of coins the exchange is allowed to spend
    mapping(address => mapping(address => uint256)) public allowance;


/*
send tokens,
set 10 million supply on smart contract creation
*/

constructor() public {
    totalSupply = 1000000 * (10 ** decimals);
    balanceOf[msg.sender] = totalSupply;
}




//user related transfers
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        _transfer(msg.sender, _to, _value);
        return true;
    }

//set internal fnction with _transfer
    function _transfer(address _from, address _to, uint256 _value) internal {
//check valid address and sufficient balance before transfer
    require(_to != address(0));
    balanceOf[_from] =  balanceOf[_from].sub(_value);
    balanceOf[_to] = balanceOf[_to].add(_value);

//check transfer
    emit Transfer(_from, _to, _value);        
    }

// Approve tokens
    function approve(address _spender, uint256 _value) public returns (bool success) {
        require(_spender != address(0));
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

// Transfer from

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        allowance[_from][msg.sender] = allowance[_from][msg.sender].sub(_value);
        _transfer(_from, _to, _value);
        return true;
    }

}