import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, {useRef, useState, useEffect} from 'react';

import Nav from './components/Navbar'
import Header from './components/Header'

//web3 imports 
import {providers, Contract, utils} from 'ethers';
import Web3modal from 'web3modal';
import {CONTRACT_ADDRESS, CONTRACT_ABI} from '../constants/index.js'

export default function Home() {
  const web3modalref = useRef(); 
  const [isConnected, setConnected] = useState(false); 
  const [loading, setLoading] = useState(false); 
  const [accountAddress, setAccountAddress] = useState(""); 

  const [userTokenId, setUserTokenId] = useState(0); //may use number(covert from string to number)
  const [maxTokenIds, setMaxTokenIds] = useState("")
  const [tokenIds, setTokenIds] = useState("")
  console.log(tokenIds, maxTokenIds)

  useEffect(() => { 
    web3modalref.current = new Web3modal({ 
      network: "mumbai", 
      providerOptions: {},
      disableInjectedProvider: false
    })
   
    connect();
    returnMaxTokens();
    returnTokensMinted();

    
  });

function splitString(string) { 
  let result1 = string.substring(0,4)
  let result2 = string.substring(38, string.length)
  let finalResult = result1 + "..." + result2
  return finalResult;
}

  const getProviderOrSigner = async(needSigner = false) => { 
    const provider = await web3modalref.current.connect(); 
    const web3provider = new providers.Web3Provider(provider);
    
    const signer = web3provider.getSigner();
    const address = await signer.getAddress(); 
    const substirngAddress = splitString(address)
    setAccountAddress(substirngAddress);
    console.log(accountAddress)

    
    const {chainID} = await web3provider.getNetwork();
    

    // if(chainID === 4) { 
    //   return
    // }else { 
    //   // window.alert("Wrong Network")
    // }

    if(needSigner) { 
      const signer = web3provider.getSigner();
      return signer
    }

    return web3provider;

  }

  const connect = async() => {
    try {
      await getProviderOrSigner();
      setConnected(true);
    }catch(e) { 
      console.error(e);
    }
  }; 


  const mint = async() => { 
    try { 
        const signer = await getProviderOrSigner(true); 
        const contract = new Contract(
            CONTRACT_ADDRESS,
           CONTRACT_ABI,
            signer
        )
        const tx = await contract.mint({value: utils.parseEther("0.02")})
        setLoading(true)
        await tx.wait();
        setLoading(false); 


    }catch(e) { 
      window.alert("Must not have enough money");
        console.error(e)
    }
}

const returnTokensMinted = async() => { 
  try { 
    // get the provider or signer 
    const provider = await getProviderOrSigner();
    //intitialize the contract 
    const contract = new Contract(
      //CONTRAC ADDRESS
      CONTRACT_ADDRESS,
      //CONTRACT ABI 
     CONTRACT_ABI,
      provider
    );
    const tx = await contract.getTokenIDS()
    setTokenIds(tx.toString())

  }catch(e)  { 
    console.error(e)
  }
}
const returnMaxTokens = async() => { 
  try { 
    // get the provider or signer 
    const provider = await getProviderOrSigner();
    //intitialize the contract 
    const contract = new Contract(
      //CONTRAC ADDRESS
      CONTRACT_ADDRESS,
      //CONTRACT ABI 
      CONTRACT_ABI,
      provider
    );
    const tx = await contract.getaMxTokenIDS()
    setMaxTokenIds(tx.toString())

  }catch(e)  { 
    console.error(e)
  }
}





  return (

    <div className={styles.container}>
      <Nav
      isConnected = {isConnected}
        connect = {connect}
        accountAddress = {accountAddress}
      />
      <Header
        getProviderOrSigner = {getProviderOrSigner}
        mint = {mint}
        maxTokenIds = {maxTokenIds}
        tokenIds = {tokenIds}
        loading = {loading}
        userTokenId = {userTokenId}
      />


    </div>
  )
}
