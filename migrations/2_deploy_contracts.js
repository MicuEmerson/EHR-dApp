var Doctor = artifacts.require("./Doctor.sol");

module.exports = function(deployer) {
  deployer.deploy(Doctor).then(function(instance){
    
    instance.addDoctor("0x2e75e13307A932DbfB9B6Ca2031a08dB0875e097", "Dr. Eric Genden", "Cardiology");
    instance.addDoctor("0x2483E2c5850149dD9Ad55Fe302bB718bB91B91aC", "Dr. Denton Cooley", "Dermatology");
    instance.addDoctor("0xE2Ec7C3117229B67937D9Dc605141de5296e8878", "Dr. Ben Carson", "Cardiology");
  });
};
