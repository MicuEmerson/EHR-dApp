<template>
  <div id="register-view">
    <h2>Pacient Smart Contract</h2>

    <transition name="fade">
      
      <!-- smart contract result address -->
      <div class="input-group input-group-lg" v-if="loading == 2">
        <div class="input-group-prepend">
          <span class="input-group-text">Address</span>
        </div>
        <input type="text" class="form-control" v-model="smAddress" disabled>
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            title="Copy Address"
            @click="copyAddressField()"
          >
            <img src="/images/clippy-icon.svg" width="30" height="26">
          </button>
        </div>
      </div>

      <!-- register smart contract form -->
      <form class="my-form" v-if="loading == 0 || loading == 1">

        <!-- first-name / last-name -->
        <div class="form-row">
          <div class="form-group col-md-5">
            <label>First Name</label>
            <input
              type="text"
              class="form-control"
              :class="validators.firstName"
              v-model="firstName"
              placeholder="John"
            >
            <div class="invalid-feedback">First Name can contain only letters.</div>
          </div>
          <div class="form-group col-md-5">
            <label>Last Name</label>
            <input
              type="text"
              class="form-control"
              :class="validators.lastName"
              v-model="lastName"
              placeholder="Smith"
            >
            <div class="invalid-feedback">Last Name can contain only letters.</div>
          </div>
        </div>

        <!-- SID -->
        <div class="form-row">
          <div class="form-group col-md-10">
            <label>SID</label>
            <input
              type="text"
              class="form-control"
              :class="validators.SID"
              v-model="SID"
              placeholder="security identifier"
            >
            <div class="invalid-feedback">SID can contain only digits.</div>
          </div>
        </div>

        <!-- year / month / day -->
        <div class="form-row">
          <div class="form-group col-md-4">
            <label>Year</label>
            <select class="custom-select" :class="validators.selectedYear" v-model="selectedYear">
              <option disabled value>Select year</option>
              <option v-for="i in 2019" v-if="i >= 1935" :key="i">{{i}}</option>
            </select>
            <div class="invalid-feedback">Please select year.</div>
          </div>

          <div class="form-group col-md-3">
            <label>Month</label>
            <select class="custom-select" :class="validators.selectedMonth" v-model="selectedMonth">
              <option disabled value>Select month</option>
              <option v-for="i in 12" :key="i">{{i}}</option>
            </select>
            <div class="invalid-feedback">Please select month.</div>
          </div>

          <div class="form-group col-md-3">
            <label>Day</label>
            <select class="custom-select" :class="validators.selectedDay" v-model="selectedDay">
              <option disabled value>Select day</option>
              <option v-for="i in 31" :key="i">{{i}}</option>
            </select>
            <div class="invalid-feedback">Please select day.</div>
          </div>
        </div>

        <!-- email / phone -->
        <div class="form-row">
          <div class="form-group col-md-5">
            <label>Email</label>
            <input
              type="text"
              class="form-control"
              :class="validators.email"
              v-model="email"
              placeholder="johnsmith@gmail.com"
            >
            <div class="invalid-feedback">Invalid email, please use this form abcd@xyz.</div>
          </div>
          <div class="form-group col-md-5">
            <label>Telephone</label>
            <input
              type="text"
              class="form-control"
              :class="validators.telephone"
              v-model="telephone"
              placeholder="+40..."
            >
            <div class="invalid-feedback">Telephone number can contain only digits and + sign.</div>
          </div>
        </div>

        <!-- address -->
        <div class="form-row">
          <div class="form-group col-md-10">
            <label>Address</label>
            <input
              type="text"
              class="form-control"
              :class="validators.address"
              v-model="address"
              placeholder="full address"
            >
            <div class="invalid-feedback">Address field cannot be empty.</div>
          </div>
          <div class="form-group col-md-5">
            <label>City</label>
            <select class="custom-select" :class="validators.selectedCity" v-model="selectedCity">
              <option disabled value>Select city</option>
              <option>Cluj</option>
              <option>Satu Mare</option>
              <option>Bucuresti</option>
            </select>
            <div class="invalid-feedback">Please select city.</div>
          </div>

          <div class="form-group col-md-5">
            <label>Zip</label>
            <input
              type="text"
              class="form-control"
              :class="validators.zip"
              v-model="zip"
              placeholder="12345"
            >
            <div class="invalid-feedback">Zip code can contain only digits.</div>
          </div>
        </div>

        <button
          class="btn btn-outline-primary central-button"
          type="button"
          disabled
          v-if="loading == 1"
        >
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Loading...
        </button>
        
        <button
          v-if="loading == 0"
          type="button"
          class="btn btn-outline-primary central-button"
          @click="handleForm()"
        >Register</button>
      </form>
    </transition>
  </div>
</template>

<script>
import FieldValidator from "../utils/FieldValidator.js";
import Pacient from "../utils/Pacient.js";
export default {
  name: "Register",
  data() {
    return {
      pacient: "",
      firstName: "",
      lastName: "",
      SID: "",
      selectedYear: "",
      selectedMonth: "",
      selectedDay: "",
      email: "",
      telephone: "",
      address: "",
      zip: "",
      selectedCity: "",

      validators: {
        firstName: "",
        lastName: "",
        SID: "",
        selectedYear: "",
        selectedMonth: "",
        selectedDay: "",
        email: "",
        telephone: "",
        address: "",
        zip: "",
        selectedCity: ""
      },

      smAddress: "asdasds",
      loading: 0
    };
  },
  mounted: function() {
    this.$nextTick( async function() {
      this.pacient = new Pacient();
      if(typeof this.pacient.contracts == 'undefined'){
        await this.pacient.loadContracts();
      }
    });
  },
  methods: {
    handleForm: async function() {
      if (this.checkFieldValidity()) {
        this.loading = 1;
        this.smAddress = await this.pacient.createNewPacient(
          this.firstName, this.lastName, this.SID, this.selectedYear,
          this.selectedMonth, this.selectedDay, this.email, this.telephone, 
          this.address,  this.zip, this.selectedCity
        );
        this.loading = 2;
      }
    },

    copyAddressField() {
      navigator.clipboard.writeText(this.smAddress);
    },

    checkFieldValidity: function() {
      let fieldValidator = new FieldValidator();
      let ok = true;

      if (!fieldValidator.checkOnlyLetters(this.firstName)) {
        this.validators.firstName = "is-invalid";
        ok = false;
      } else {
        this.validators.firstName = "";
      }
      if (!fieldValidator.checkOnlyLetters(this.lastName)) {
        this.validators.lastName = "is-invalid";
        ok = false;
      } else {
        this.validators.lastName = "";
      }
      if (!fieldValidator.checkNumber(this.SID)) {
        this.validators.SID = "is-invalid";
        ok = false;
      } else {
        this.validators.SID = "";
      }
      if (fieldValidator.checkEmpty(this.selectedYear)) {
        this.validators.selectedYear = "is-invalid";
        ok = false;
      } else {
        this.validators.selectedYear = "";
      }
      if (fieldValidator.checkEmpty(this.selectedMonth)) {
        this.validators.selectedMonth = "is-invalid";
        ok = false;
      } else {
        this.validators.selectedMonth = "";
      }
      if (fieldValidator.checkEmpty(this.selectedDay)) {
        this.validators.selectedDay = "is-invalid";
        ok = false;
      } else {
        this.validators.selectedDay = "";
      }
      if (fieldValidator.checkEmpty(this.selectedCity)) {
        this.validators.selectedCity = "is-invalid";
        ok = false;
      } else {
        this.validators.selectedCity = "";
      }
      if (!fieldValidator.checkEmail(this.email)) {
        this.validators.email = "is-invalid";
        ok = false;
      } else {
        this.validators.email = "";
      }
      if (!fieldValidator.checkNumber(this.telephone)) {
        this.validators.telephone = "is-invalid";
        ok = false;
      } else {
        this.validators.telephone = "";
      }
      if (fieldValidator.checkEmpty(this.address)) {
        this.validators.address = "is-invalid";
        ok = false;
      } else {
        this.validators.address = "";
      }
      if (fieldValidator.checkEmpty(this.selectedCity)) {
        this.validators.selectedCity = "is-invalid";
        ok = false;
      } else {
        this.validators.selectedCity = "";
      }
      if (!fieldValidator.checkNumber(this.zip)) {
        this.validators.zip = "is-invalid";
        ok = false;
      } else {
        this.validators.zip = "";
      }

      return ok;
    }
  }
};
</script>

<style scoped>
#register-view {
  margin: auto;
  width: 75%;
  border: 1px solid lightgray;
  padding: 20px;
  margin-bottom: 40px;
  background-color: whitesmoke;
}
h2 {
  text-align: center;
  margin-bottom: 20px;
}
.my-form {
  margin-left: 150px;
}
.central-button {
  margin-left: 150px;
  margin-top: 35px;
  width: 50%;
  font-weight: bold;
}
#copy-button {
  background-image: url("/styles/images/clippy_icon.png") !important;
  background-repeat: no-repeat;
  width: 150px;
  height: 150px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>