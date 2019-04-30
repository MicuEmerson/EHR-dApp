import personJSON from "../../build/contracts/Person.json"
import doctorJSON from "../../build/contracts/Doctor.json"
import { async } from "q";
var TruffleContract = require("truffle-contract");
Web3 = require('web3')

const App = {
  contracts: {},

  load: async () => {
    await App.loadWeb3();
    await App.loadAccount();
    await App.loadContract();
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
    // Set the current blockchain account from MetaMask
    web3.eth.getAccounts(function (error, accounts) {
      App.account = accounts[0];
    })
  },

  loadContract: async () => {
    // Create a JavaScript version of the smart contract
    App.contracts.Person = TruffleContract(personJSON)
    App.contracts.Person.setProvider(App.web3Provider);

    App.contracts.Doctor = TruffleContract(doctorJSON);
    App.contracts.Doctor.setProvider(App.web3Provider);

    App.doctor = await App.contracts.Doctor.deployed();
    console.log(App.doctor);
  },

  createNewPerson: async (firstName, lastName, SID, year, month, day, email, phone, address, city, zip) => {
    App.person = await App.contracts.Person.new(firstName, lastName, SID, year, month, day, email,
      phone, address, city, zip, { from: App.account });
    return App.person.address;
  },

  //this function will be called first time time when pacient enter a smart-contract adddress
  // and also will cache smart-contract address and Person smart-contract from blockchain
  getAccess: async (contractAddress) => {
    try {
      App.person = await App.contracts.Person.at(contractAddress);
      let personName = await App.person.getFirstName({from: App.account});
      return personName;
    }
    catch (e) {
      return "error";
    }
  },

  getAllDoctors: async () => {
    let nr = await App.person.getDoctorsSize({from: App.account});
    let doctorsAddresses = [];

    for(let i = 0; i < nr; i++){
      doctorsAddresses.push(await App.person.doctorsAccess(i, {from: App.account}));
    }

    let doctorsDetails = [];
    for(let i = 0; i < doctorsAddresses.length; i++){
      let details = await App.checkDoctorAddress(doctorsAddresses[i], {from: App.account});
      
      let doctor = {
        id : i,
        address : doctorsAddresses[i],
        name: details.name,
        specialty: details.specialty
      }

      doctorsDetails.push(doctor);
    };

     console.log("dectorsDetails", doctorsDetails);
    return doctorsDetails;

  },

  checkDoctorAddress: async(doctorAddress) => {
    try{
      return await App.doctor.doctors(doctorAddress, {from: App.account});
    }
    catch(e){
      return "error";
    }
  },

  addDoctor: async (doctorAddress) => {
    try{
      return await App.person.addDoctor(doctorAddress, {from: App.account});
    }
    catch(e){
      return "error";
    }
  },

  deleteDoctor: async (doctorAddress) => {
    try{
      return await App.person.removeDoctor(doctorAddress, {from: App.account});
    }
    catch(e){
      return "error";
    }
  },

  //getters part
  getFirstName: async () => {
    return await App.person.getFirstName({from: App.account});
  },
  getLastName: async () => {
    return await App.person.getLastName({from: App.account});
  },
  getSID: async () => {
    return await App.person.getSID({from: App.account});
  },
  getYear: async () => {
    return await App.person.getYear({from: App.account});
  },
  getMonth: async () => {
    return await App.person.getMonth({from: App.account});
  },
  getDay: async () => {
    return await App.person.getDay({from: App.account});
  },
  getEmail: async () => {
    return await App.person.getEmail({from: App.account});
  },
  getTelephone: async () => {
    return await App.person.getTelephone({from: App.account});
  },
  getPersonAddress: async () => {
    return await App.person.getPersonAddress({from: App.account});
  },
  getCity: async () => {
    return await App.person.getCity({from: App.account});
  },
  getZip: async () => {
    return await App.person.getZip({from: App.account});
  },

  //setters part
  setEmail: async (email) => {
    return await App.person.setEmail(email, {from: App.account});
  },
  setTelephone: async (telephone) => {
    return await App.person.setTelephone(telephone, {from: App.account});
  },
  setAddress: async (address) => {
    return await App.person.setAddress(address, {from: App.account});
  },
  setCity: async (city) => {
    return await App.person.setCity(city, {from: App.account});
  },
  setZip: async (zip) => {
    return await App.person.setZip(zip, {from: App.account});
  },
 
}

export default App;