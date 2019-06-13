var Doctor = artifacts.require("./Doctor.sol");

module.exports = function(deployer) {
  deployer.deploy(Doctor).then(function(instance){
    
    instance.addDoctor("0xBb90b684f59dd782F642F4a3758a748dd3c528B0", "Dr. Eric Genden", "Cardiology");
    instance.addDoctor("0x9091DA4F332BE099237a30bd30b3CAf130bcd7D2", "Dr. Denton Cooley", "Dermatology");
    instance.addDoctor("0xe19390eE2399664448002378D49629D6E09eE2f8", "Dr. Ben Carson", "Cardiology");
  });
};
