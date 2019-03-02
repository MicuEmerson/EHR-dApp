pragma solidity >=0.4.22 <0.6.0;
contract Doctor {
    //adress & name
    mapping(address => string) public doctors;
    
    function addDoctor(address _doctorsAddress, string memory _name) public{
        doctors[_doctorsAddress] = _name;
    }
}