var Doctor = artifacts.require("./Doctor.sol");

module.exports = function(deployer) {
  deployer.deploy(Doctor).then(function(instance){
    
    instance.addDoctor("0xee644108afE8a335f29A1B49E1E7E676B9c7756B", "Dr. Eric Genden", "Cardiology");
    instance.addDoctor("0x5687aCE0220Da7c5d6cb2f82E151DD84763De42c", "Dr. Denton Cooley", "Dermatology");
    instance.addDoctor("0xC2F7F928D374f586cdB384C191Dc9d6e63ef8857", "Dr. Ben Carson", "Cardiology");
  });
};
