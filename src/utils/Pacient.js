import personJSON from "../../build/contracts/Person.json"
import doctorJSON from "../../build/contracts/Doctor.json"
import Web3Wrapper from "../utils/Web3Wrapper.js";
var TruffleContract = require("truffle-contract");

let instance = null;

export default class Pacient {

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

    async createNewPacient(firstName, lastName, SID, year, month, day, email, phone, address, city, zip) {
        this.person = await this.contracts.Person.new(firstName, lastName, SID, year, month, day, email,
            phone, address, city, zip, { from: this.web3Wrapper.account });
        return this.person.address;
    }

    //this function will be called first time time when pacient enter a smart-contract adddress
    // and also will cache smart-contract address and Person smart-contract from blockchain
    async getAccess(contractAddress) {
        try {
            this.person = await this.contracts.Person.at(contractAddress);
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

    async getAllMedicalData() {
        let nr = await this.person.getMedicalDataSize({ from: this.web3Wrapper.account });
        let medicalDatas = [];

        for (let i = 0; i < nr; i++) {
            let x = await this.person.getMedicalDataIndex(i, { from: this.web3Wrapper.account });
            medicalDatas.push(x);
        }

        return medicalDatas;
    }

    async getAllDoctors() {
        let nr = await this.person.getDoctorsSize({ from: this.web3Wrapper.account });
        let doctorsAddresses = [];

        for (let i = 0; i < nr; i++) {
            doctorsAddresses.push(await this.person.doctorsAccess(i, { from: this.web3Wrapper.account }));
        }

        let doctorsDetails = [];
        for (let i = 0; i < doctorsAddresses.length; i++) {
            let details = await this.checkDoctorAddress(doctorsAddresses[i], { from: this.web3Wrapper.account });

            let doctor = {
                id: i,
                address: doctorsAddresses[i],
                name: details.name,
                specialty: details.specialty
            }

            doctorsDetails.push(doctor);
        };

        return doctorsDetails;
    }

    async checkDoctorAddress(doctorAddress) {
        try {
            return await this.doctor.doctors(doctorAddress, { from: this.web3Wrapper.account });
        }
        catch (e) {
            return "error";
        }
    }

    async addDoctor(doctorAddress) {
        try {
            return await this.person.addDoctor(doctorAddress, { from: this.web3Wrapper.account });
        }
        catch (e) {
            return "error";
        }
    }

    async deleteDoctor(doctorAddress) {
        try {
            return await this.person.removeDoctor(doctorAddress, { from: this.web3Wrapper.account });
        }
        catch (e) {
            return "error";
        }
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

    //setters part
    async setEmail(email) {
        return await this.person.setEmail(email, { from: this.web3Wrapper.account });
    }
    async setTelephone(telephone) {
        return await this.person.setTelephone(telephone, { from: this.web3Wrapper.account });
    }
    async setAddress(address) {
        return await this.person.setAddress(address, { from: this.web3Wrapper.account });
    }
    async setCity(city) {
        return await this.person.setCity(city, { from: this.web3Wrapper.account });
    }
    async setZip(zip) {
        return await this.person.setZip(zip, { from: this.web3Wrapper.account });
    }

}
