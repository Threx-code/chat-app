import { ethers, BrowserProvider, JsonRpcProvider } from 'ethers';

import {ChatAppAddress, ChatAppABI} from '../Context/constants';

export const checkIfWalletConnected = async() => {
    
    console.log("Checking if wallet is connected");
    try {
        if(!window.ethereum) return console.log("Install Metamask");

        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });

        const firstAccount = accounts[0];

        return firstAccount;

    }catch(error){
        console.log(error);
    }

}


export const connectWallet = async() => {
    try{
        if(!window.ethereum) return console.log("Install Metamask");

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        const firstAccount = accounts[0];
    
        return firstAccount;

    }catch(error){
        console.log(error);
    }

}


const fetchContract = (signerOrProvider) => new ethers.Contract(ChatAppAddress, ChatAppABI, signerOrProvider);

export const connectingWithContract = async () => {
    try {
    const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = fetchContract(signer);
      return contract;
    } catch (error) {
      console.error('Error connecting with contract:', error);
    }
  };



export const convertTime = (time) => {
    const newTime = new Date(time.toNumber());
    const realTime = 
    newTime.getHours() + "/" + 
    newTime.getMinutes() + "/" + 
    newTime.getSeconds() + " Date:" + 
    newTime.getDate() + "/" + 
    (newTime.getMonth() + 1) + "/" + 
    newTime.getFullYear();

    return realTime;
}




