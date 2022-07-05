// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0; 

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";


error maxMintIds();
error noMoreTokenIds(); 
error insufficientFunds();
error contract_Owner();

contract meta is ERC1155 { 
    //1 assigned ID for this contract
    uint256 public constant metaOrcs = 0;
    uint256 private immutable maxTokenIds = 10000;
    uint private immutable i_price = 0.01 ether;
    address private immutable i_owner;
    //keep track of tokenIds using a counter 
    uint256 public tokenIds = 0;
    
    string private constant baseURI = "ipfs://QmYGB11R42eg49Mgts9THPmYqu4qCSarhZKjDirAnYnMS8/metadata.json";



     modifier  onlyOwner { 
         //For only ownes of contract can withdraw funds
        if(msg.sender != msg.sender) { 
            revert contract_Owner();
        }
        _;
    }
    

    constructor() ERC1155(baseURI) {
       i_owner = msg.sender;
    }

    function mint() payable public {
        if(balanceOf(msg.sender,0) >= 1) { 
            revert noMoreTokenIds();
        }

        if(tokenIds >= maxTokenIds) { 
            revert noMoreTokenIds();
        }

        if(msg.value <= i_price) { 
            revert insufficientFunds();
        }

        _mint(msg.sender, 0, 1, ""); 
        tokenIds ++;

    }
    //withdraw funds 
    function withdraw() onlyOwner public { 
        address owner = i_owner; 
        uint256 amount = address(this).balance; 
        (bool sent,) = owner.call{value: amount}("");
        require(sent, "Failed to send ether");
    }

    function getBalanceOfSender() public view returns(uint256) { 
        return msg.sender.balance;
    }

    //get balance of TOKEN
    function getBalanceOfTokens() public view returns(uint256) { 

        return balanceOf(msg.sender, 0);
    }
    //get balance of contract 
    function getBalance() public view returns (uint256) { 
        return address(this).balance;
    }

    function getTokenID() public view returns (uint256) { 
        return tokenIds;
    }

    function _baseURI() public pure  returns (string memory) { 
        return baseURI;
    }

    function maxTokenIDS() public pure returns(uint256) { 
        return maxTokenIds;
    }



    


    



    receive() external payable{}
    fallback() external payable{}
}


