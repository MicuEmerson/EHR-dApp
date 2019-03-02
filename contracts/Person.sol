pragma solidity >=0.4.22 <0.6.0;
contract Person {
    
    //owner address
    address private owner;
    
    //doctors list who can access my data
    address[] public doctorsAccess;

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
    
    constructor(string memory _firstName, string memory _lastName, string memory _SID,
                string memory _year, string memory _month, string memory _day, string memory _email,
                string memory _telephone, string memory _personAddress, string memory _zip, string memory _city)
    public {
        owner = msg.sender;
        firstName = _firstName;
        lastName = _lastName;
        SID = _SID;
        year = _year;
        month = _month;
        day = _day;
        email = _email;
        telephone = _telephone;
        personAddress = _personAddress;
        zip = _zip;
        city = _city;
    }

    modifier checkAccess(){
        require(getAccess() == true, "You don't have access to this field");
        _;
    }

    function getAccess() public view returns(bool access){
        //here will be more validation, but for now I just added this one
        for(uint i = 0; i < doctorsAccess.length; i++){
            if(doctorsAccess[i] == msg.sender){
                return(true);
            }
        }
        return (msg.sender == owner);
    }
    
    function addDoctor(address _doctorsAddress) public{
        require(msg.sender == owner, "Only owner can change this field");
        doctorsAccess.push(_doctorsAddress);
    }
    
    function removeDoctor(address _doctorsAddress) public returns(bool succesful){
        require(msg.sender == owner, "Only owner can change this field");
        //find position
        uint pos = 0;
        for(uint i = 0; i < doctorsAccess.length; i++){
            if(_doctorsAddress == doctorsAccess[i]){
                pos = i;
            }
        }
        
        if(pos == 0 && doctorsAccess[0] != _doctorsAddress){
            return false;
        }
        
        doctorsAccess[pos] = doctorsAccess[doctorsAccess.length - 1];
        delete doctorsAccess[doctorsAccess.length - 1];
        
        return true;
    }
    
    //getters part
    function getFirstName() public view checkAccess returns (string memory _firstName){
        return(firstName);
    }
    function getLastName() public view checkAccess returns (string memory _lastName){
        return(lastName);
    }
    function getSID() public view checkAccess returns (string memory _SID){
        return(SID);
    }
    function getYear() public view checkAccess returns (string memory _year){
        return(year);
    }
    function getMonth() public view checkAccess returns (string memory _month){
        return(month);
    }
    function getDay() public view checkAccess returns (string memory _day){
        return(day);
    }
    function getEmail() public view checkAccess returns (string memory _email){
        return(email);
    }
    function getTelephone() public view checkAccess returns (string memory _telephone){
        return(telephone);
    }
    function getPersonAddress() public checkAccess view returns (string memory _personAddress){
        return(personAddress);
    }
    function getZip() public view checkAccess returns (string memory _zip){
        return(zip);
    }
    function getCity() public view checkAccess returns (string memory _city){
        return(city);
    }
    
    //setters part
    function setEmail(string memory _email) public{
        require(msg.sender == owner, "Only owner can change this field");
        email = _email;
    }
    function setTelephone(string memory _telephone) public{
        require(msg.sender == owner, "Only owner can change this field");
        telephone = _telephone;
    }
    function setAddress(string memory _personAddress) public{
        require(msg.sender == owner, "Only owner can change this field");
        personAddress = _personAddress;
    }
    function setCity(string memory _city) public{
        require(msg.sender == owner, "Only owner can change this field");
        city = _city;
    }
    function setZip(string memory _zip) public{
        require(msg.sender == owner, "Only owner can change this field");
        zip = _zip;
    }
    
    
}