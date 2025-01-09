// SPDX-License-Identifier: MIT

pragma solidity ^0.8.27;

contract ChatApp {

    struct User {
        string name;
        Friend[] friendList;
        mapping(address => bool) isFriend;
    }

    struct Friend {
        address pubKey;
        string name;
    }

    struct Message {
        address sender;
        uint256 timestamp;
        string message;
    }

    struct AllUserStruct {
        string name;
        address accountAddress;
    }

    AllUserStruct[] getAllUsers;

    mapping(address => User) userList;
    mapping(bytes32 => Message[]) chatHistory;


    // check if user exist
    function checkUserExist(address pubkey) public view returns(bool){
        return bytes(userList[pubkey].name).length > 0;
    }

    // create account
    function createAccount(string calldata _name) external {
        require(!checkUserExist(msg.sender), "User already exist");
        require(bytes(_name).length > 0, "Name cannot be empty");
        userList[msg.sender].name = _name;

        getAllUsers.push(AllUserStruct({
            name: _name,
            accountAddress: msg.sender
        }));
    }

    //get username
    function getUsername(address pubKey) external view returns(string memory){
        require(checkUserExist(pubKey), "User does not exist");
        return userList[pubKey].name;
    }

    //Add friends
    function addFriend(address friendKey, string calldata _name) external {
        require(checkUserExist(msg.sender), "You need to register first");
        require(checkUserExist(friendKey), "Friend has not registered yet");
        require(msg.sender != friendKey, "You cannot add yourself as a friend");
        require(bytes(_name).length > 0, "Your friend's name is empty");
        require(!checkFriendAlreadyExist(msg.sender, friendKey), "You've already added this friend");

        _addFriend(msg.sender, friendKey, _name);
        _addFriend(friendKey, msg.sender, userList[msg.sender].name);
    }

    //check if friend already exist
    function checkFriendAlreadyExist(address pubKey, address friendKey) public view returns(bool){
        require(checkUserExist(pubKey), "User does not exist");
        require(checkUserExist(friendKey), "Friend does not exist");
        return userList[pubKey].isFriend[friendKey];
    }

    // Add friend
    function _addFriend(address myKey, address friendKey, string memory _name) internal {
        userList[myKey].friendList.push(Friend({
            pubKey: friendKey,
            name: _name
        }));
    }

    // Get Friend List
    function getFriendList() external view returns(Friend[] memory){
        require(checkUserExist(msg.sender), "You need to register first");
        return userList[msg.sender].friendList;
    }

    // get chat code
    function _getChatCode(address pubKey1, address pubKey2) internal pure returns (bytes32) {

        if(pubKey1 < pubKey2){
            return keccak256(abi.encodePacked(pubKey1, pubKey2));
        }

        return keccak256(abi.encodePacked(pubKey2, pubKey1));
    }

    // Send Message
    function sendMessage(address friendKey, string calldata _message) external {
        require(checkUserExist(msg.sender), "You need to register first");
        require(checkUserExist(friendKey), "Your friend has not registered");
        require(checkFriendAlreadyExist(msg.sender, friendKey), "You need to add your friend first");
        require(bytes(_message).length > 0, "Message cannot be empty");

        bytes32 chatCode = _getChatCode(msg.sender, friendKey);

        Message memory newMessage = Message({
            sender: msg.sender,
            timestamp: block.timestamp,
            message: _message
        });

        chatHistory[chatCode].push(newMessage);
    }

    //Get Chat History
    function readChatHistory(address friendKey) external view returns(Message[] memory){
        require(checkUserExist(msg.sender), "You need to register first");
        require(checkUserExist(friendKey), "Your friend Has not registered");

        bytes32 chatCode = _getChatCode(msg.sender, friendKey);

        return chatHistory[chatCode];
    }

    //Get All Users
    function getAllUsersList() public view returns (AllUserStruct[] memory) {
        return getAllUsers;
    }

}