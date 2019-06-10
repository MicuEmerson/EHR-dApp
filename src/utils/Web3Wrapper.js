Web3 = require('web3')

let instance = null;

export default class Web3Wrapper {

  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  async loadWeb3() {
    if (typeof web3 !== 'undefined') {
      this.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }

    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        await ethereum.enable();
      } catch (error) {
        window.alert("User denied account access...");
      }
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  async loadAccount() {
    console.log("am intrat in loadaccount");
    var self = this;

    await web3.eth.getAccounts(function (error, accounts) {
      self.account = accounts[0];
    })

    //check every 1second if account is changed...
    var accountInterval = setInterval(async function () {
      var accounts = await web3.eth.getAccounts();
      if (accounts[0] !== self.account) {
        self.account = accounts[0];
      }
    }, 1000);

  }
}
