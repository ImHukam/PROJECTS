const Migrations = artifacts.require("Funder");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
