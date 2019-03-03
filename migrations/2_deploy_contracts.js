var Doctor = artifacts.require("./Doctor.sol");

module.exports = function(deployer) {
  deployer.deploy(Doctor).then(function(instance){
    
    instance.addDoctor("0xf218CBf68AF7F06AC4D824Dc6bea78cf6A0DB0bE", "Dr. Eric Genden", "Cardiology");
    instance.addDoctor("0x67f382aA41862811F99664319837E4057c79D888", "Dr. Denton Cooley", "Dermatology");
    instance.addDoctor("0xf218CBf68AF7F06AC4D824Dc6bea78cf6A0DB0bE", "Dr. Ben Carson", "Cardiology");
  });
};
