pragma solidity >=0.4.22 <0.6.0;
contract Person {
    
    //owner address
    address private owner;

    //identity
    string private firstName;
    string private lastName;
    string private SID; 
    
    //birthday
    string private year;
    string private month;
    string private day;
    
    //contract
    string private email;
    string private telephone;
    string private personAddress;
    string private zip;
    string private city;
    
    //HL7 v2 format data
    string[] private medicalData;
    
    constructor(string memory _firstName, string memory _lastName, string memory _SID) public {
        owner = msg.sender;
        firstName = _firstName;
        lastName = _lastName;
        SID = _SID;
    }
    
    function getFirstName() public view returns (string memory _firstName){
        require(
            msg.sender == owner,
            "You are not allow to access this contract"
        );
        _firstName = firstName;
    }
    function getLastName() public view returns (string memory _lastName){
        _lastName = lastName;
    }
    function getSID() public view returns (string memory _SID){
        _SID = SID;
    }
}