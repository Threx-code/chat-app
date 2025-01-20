const { expect } = require('chai');
const { ethers } = require('hardhat');


describe("ChatApp Contract", function(){
    let chatApp;
    let owner, user1, user2;

    this.beforeEach(async() => {
        const ChatApp = await ethers.getContractFactory("ChatApp");
        chatApp = await ChatApp.deploy();
        console.log("ChatApp deployed to: ", chatApp.address);

        [owner, user1, user2] = await ethers.getSigners();
    });


    describe("Deployment", () => {
        it("Should deploy the contract", async() => {
            expect(chatApp.address).to.not.equal(ethers.constants.AddressZero);
            expect(chatApp.address).to.not.equal(null);
            expect(chatApp.address).to.not.equal(undefined);
            expect(chatApp.address).to.not.equal("");
            expect(chatApp.address).to.not.equal(0x0);
            expect(chatApp.address).to.not.equal(0);
        });

        it("Should initalize with an empty list of users", async() => {
            const allUsers = await chatApp.getAllUsersList();
            expect(allUsers.length).to.equal(0); 
        });

        it("Should allow checking for user existence and return false initally", async() => {
            const userExist = await chatApp.checkUserExist(owner.address);
            expect(userExist).to.equal(false);
        });

        it("should ensure chat history is empty between two addresses", async() => {
            await expect(chatApp.readChatHistory(user1.address)).to.be.revertedWith("You need to register first");
        });

        it("Should ensure friend list is empty for a new user", async() => {
           
            await expect(chatApp.getFriendList()).to.be.revertedWith("You need to register first");
        });
    });


    describe("Account Creation", () => {
        it("should create a new account", async() => {
            await chatApp.connect(user1).createAccount("Threx");
            const username = await chatApp.getUsername(user1.address);
            expect(username).to.equal("Threx");
        });
    });
});