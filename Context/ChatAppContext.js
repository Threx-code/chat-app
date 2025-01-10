import React, {useState, useEffect} from "react";
import { useRouter } from "next/router";


import {
    checkIfWalletConnected, 
    connectWallet, 
    connectingWithContract, 
    convertTime
} from '../Utils/apiFeature';


export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({children}) => {
    const [account, setAccount] = useState("");
    const [userName, setUserName] = useState("");
    const [friendLits, setFriendLists] = useState([]);
    const [friendMessages, setFriendMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userLists, setUserLists] = useState([]);
    const [error, setError] = useState("");


    // Chat User data
    const [currentUserName, setCurrentUserName] = useState("");
    const [currentUserAddress, setCurrentUserAddress] = useState("");


    const router = useRouter();


    // fetch data time of page LOAD

    const fetchdata = async() => {
        try{
            //GET Contract
            const contract = await connectingWithContract();

            // GET ACCOUNT
            const connectedAccount = await connectWallet();
            setAccount(connectedAccount);

            //GET USERNAME
            const username = await contract.getUsername(connectedAccount);
            setUserName(username);

            //GET FRIENDLIST
            const friendList = await contract.getFriendList();
            setFriendLists(friendList);

            // GET ALL APP USER
            const allUsers = await contract.getAllUsersList();
            setUserLists(allUsers);

        }catch(error){
            setError("Please Install and Connect Your Wallet");
        }
    };

    useEffect(() => {
        fetchdata();
    }, []);


    //Read Message
    const readMessage = async(friendAddress) => {
        try{
            const contract = await connectingWithContract();
            const messages = contract.readChatHistory(friendAddress);
            setFriendMessages(messages);

        }catch(error){
            setError("Currently you have no message");
        }
    };


    //CREATE ACCOUNT
    const createAccount = async({accountName, accountaddress}) => {
        try{
            if(accountName === "" || accountaddress === ""){
                setError("Please fill all the fields");
                return;
            }
            const contract = await connectingWithContract();
            const getCreatedUser = await contract.createAccount(accountName);
            setLoading(true);
            await getCreatedUser.wait();
            setLoading(false);
            window.location.reload();

        }catch(error){
            setError("Unable to create your account");
        }
    };


    //ADD FRIENDS addFriend
    const addFriends = async({friendName, friendAddress}) => {
        try{
            if(friendName === "" || friendAddress === ""){
                setError("Please fill all the fields");
                return;
            }

            const contract = await connectingWithContract();
            const getAddFriend = contract.addFriend(friendAddress, friendName);
            setLoading(true);
            await getAddFriend.wait();
            setLoading(false);
            router.push("/");
            window.location.reload();
        }catch(error){
            setError("Unable to add your friend");
        }
    };


    // SEND MESSAGE sendMessage(address friendKey, string calldata _message)
    const sendMessage = async({friendAddress, message}) => {
        try{}catch(error){
            setError("Unable to send message");
        }
    };


    return(
        <ChatAppContext.Provider value={{ readMessage, createAccount, addFriends }} >
            {children}
        </ChatAppContext.Provider>
    );
};