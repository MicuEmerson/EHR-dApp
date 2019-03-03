pragma solidity >=0.4.22 <0.6.0;
contract Doctor {
    
    struct doctorData{
        string name;
        string specialty;
    }
    //adress & name
    mapping(address => doctorData) public doctors;
    
    function addDoctor(address _doctorsAddress, string memory _name, string memory _specialty) public{
        doctors[_doctorsAddress] = doctorData(_name, _specialty);
    }
}