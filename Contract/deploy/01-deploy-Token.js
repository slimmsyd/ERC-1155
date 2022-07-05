const {network, ethers} = require("hardhat"); 
const {verify} = require("../utilis/verify")

module.exports = async({getNamedAccounts, deployments}) => { 
    const {deploy, log} = deployments; 
    const {deployer} = await getNamedAccounts(); 
    console.log(deployer)
    //deploy lottery 
    const contract = await deploy("meta", { 
        from: deployer, 
        log: true,
        args: [],
        waitConfirmations: network.config.blockConfirmations || 1
    })

    log("Verifying on tesnet....")
    await verify(contract.address, [])
    

    log("===================")
}


module.exports.tags  = ["all", "meta"]