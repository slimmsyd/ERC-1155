

require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("dotenv").config()
require("hardhat-contract-sizer")

const ALCHEMY_KEY_MATIC = process.env.ALCHEMY_KEY_MATIC;
const MATIC_KEY = process.env.MATIC_KEY;
const ETHER_SCAN_API = process.env.ETHER_SCAN_API;

module.exports = {
  solidity:  {
    compilers: [{version: "0.8.8"}, {version: "0.6.6"}, {version: "0.8.0"}],
  },

  defaultNetwork: "hardhat",
  networks: { 
    hardhat: { 
      chainId: 31337,
      blockConfirmations: 1,
    },
    // rinkeby: { 
    //   chainId: 4,
    //   blockConfirmations: 6,
      
    //   saveDeployments: true,
    // },
    mumbai: { 
      chainId:80001,
      blockConfirmations: 6,
      url: ALCHEMY_KEY_MATIC,
      accounts: [MATIC_KEY],
      saveDeployments: true
    }
  
  }, 
  etherscan: { 
    apiKey: { 
      polygonMumbai: ETHER_SCAN_API
    }
  },gasReporter: {
    enabled: false,
    outputFile: "gas-report.txt",
    noColors: true,
    currencey: "USD",
  },
  namedAccounts: { 
    deployer: { 
      default: 0,
    }
  }
}
