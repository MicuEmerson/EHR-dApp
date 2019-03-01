import personJSON from "../../build/contracts/Person.json"
import { async } from "q";
var TruffleContract = require("truffle-contract");
Web3 = require('web3')

const App = {
  loading: false,
  contracts: {},

  load: async () => {
    await App.loadWeb3();
    await App.loadAccount();
    await App.loadContract();
    console.log(App.account);
  },

  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)

    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */ })
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */ })
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    // Set the current blockchain account
    web3.eth.getAccounts(function (error, accounts) {
      App.account = accounts[0];
    })
  },

  createNewPerson: async (firstName, lastName, SID) => {
    App.person = await App.contracts.Person.new(firstName, lastName, SID, { from: App.account });
    return App.person.address;
  },

  getFirstName: async (contractAddress) => {
    try {
      App.person = await App.contracts.Person.at(contractAddress);
      console.log(App.account);
      let personName = await App.person.getFirstName({from: App.account});
      console.log(personName);
      return personName;
    }
    catch (e) {
      return "error";
    }
  },

  loadContract: async () => {
    // Create a JavaScript version of the smart contract

    App.contracts.Person = TruffleContract(personJSON)
    App.contracts.Person.setProvider(App.web3Provider);

    // Hydrate the smart contract with values from the blockchain
    // App.factory = await App.contracts.Factory.deployed()
  },
}

export default App;