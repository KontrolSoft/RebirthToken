const RebirthToken = artifacts.require("RebirthToken");

module.exports = function(deployer) {
  deployer.deploy(RebirthToken);
};
