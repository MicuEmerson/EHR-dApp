import personJSON from "../../build/contracts/Person.json"
import doctorJSON from "../../build/contracts/Doctor.json"
import Web3Wrapper from "../utils/Web3Wrapper.js";
var TruffleContract = require("truffle-contract");

let instance = null;

export default class Doctor {

    constructor() {
        if (!instance) {
            instance = this;
            this.web3Wrapper = new Web3Wrapper();
        }
        return instance;
    }

    async loadContracts() {
        //ensure that loadWeb3 & loadAccount are called
        if (typeof this.web3Wrapper.web3Provider == 'undefined') {
            await this.web3Wrapper.loadWeb3();
            await this.web3Wrapper.loadAccount();
        }
        this.contracts = {};
        // Create a JavaScript version of the smart contract
        this.contracts.Person = TruffleContract(personJSON);
        this.contracts.Person.setProvider(this.web3Wrapper.web3Provider);
        this.contracts.Doctor = TruffleContract(doctorJSON);
        this.contracts.Doctor.setProvider(this.web3Wrapper.web3Provider);

        this.doctor = await this.contracts.Doctor.deployed();
    }

    async checkDoctorAddress() {
        try {
            this.doctorName = "";
            let x = await this.doctor.doctors(this.web3Wrapper.account, { from: this.web3Wrapper.account });
            this.doctorName = x.name;
            return x;
        }
        catch (e) {
            return "error";
        }
    }

    async getAccess(contractAddress) {
        try {
            this.person = await this.contracts.Person.at(contractAddress);
            this.firstName = await this.person.getFirstName({ from: this.web3Wrapper.account });
            this.lastName = await this.person.getLastName({ from: this.web3Wrapper.account });
            this.sid = await this.person.getSID({ from: this.web3Wrapper.account });
            this.year = await this.person.getYear({ from: this.web3Wrapper.account });
            this.month = await this.person.getMonth({ from: this.web3Wrapper.account });
            this.day = await this.person.getDay({ from: this.web3Wrapper.account });
            return this.firstName;
        }
        catch (e) {
            return "error";
        }
    }

    async addMedicalData(medicalData){
        try{
            await this.person.addMedicalData(medicalData, {from: this.web3Wrapper.account});
        }
        catch (e) {
            return "error";
        }
    }

    async getAllMedicalData() {
        let nr = await this.person.getMedicalDataSize({ from: this.web3Wrapper.account });
        let medicalDatas = [];

        for (let i = 0; i < nr; i++) {
            let x = await this.person.getMedicalDataIndex(i, { from: this.web3Wrapper.account });
            medicalDatas.push(JSON.parse(x));
        }

        return medicalDatas;
    }

    //getters part
    async getFirstName() {
        return await this.person.getFirstName({ from: this.web3Wrapper.account });
    }
    async getLastName() {
        return await this.person.getLastName({ from: this.web3Wrapper.account });
    }
    async getSID() {
        return await this.person.getSID({ from: this.web3Wrapper.account });
    }
    async getYear() {
        return await this.person.getYear({ from: this.web3Wrapper.account });
    }
    async getMonth() {
        return await this.person.getMonth({ from: this.web3Wrapper.account });
    }
    async getDay() {
        return await this.person.getDay({ from: this.web3Wrapper.account });
    }
    async getEmail() {
        return await this.person.getEmail({ from: this.web3Wrapper.account });
    }
    async getTelephone() {
        return await this.person.getTelephone({ from: this.web3Wrapper.account });
    }
    async getPersonAddress() {
        return await this.person.getPersonAddress({ from: this.web3Wrapper.account });
    }
    async getCity() {
        return await this.person.getCity({ from: this.web3Wrapper.account });
    }
    async getZip() {
        return await this.person.getZip({ from: this.web3Wrapper.account });
    }

}