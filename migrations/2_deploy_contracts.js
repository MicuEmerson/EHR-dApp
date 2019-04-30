var Doctor = artifacts.require("./Doctor.sol");

module.exports = function(deployer) {
  deployer.deploy(Doctor).then(function(instance){
    
    instance.addDoctor("0x5F740C9Ab9C1A248d8a0268d811399743fB969E1", "Dr. Eric Genden", "Cardiology");
    instance.addDoctor("0xA90dB22889E86218d670421e28e422758B8E3e0a", "Dr. Denton Cooley", "Dermatology");
    instance.addDoctor("0xB9a66a0622DCB565A91F5ff76c1DA952caee7AD2", "Dr. Ben Carson", "Cardiology");
  });
};
