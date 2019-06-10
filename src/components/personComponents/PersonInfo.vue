<template>
  <div>
    <div v-if="loadingData == true" class="text-center" style="margin: 75px">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  <form v-if="loadingData == false" class="my-form">
    <!-- first-name / last-name -->
    <div class="form-row">
      <div class="form-group col-md-5">
        <label>First Name</label>
        <input style="cursor: not-allowed" type="text" class="form-control" v-model="firstName" disabled>
      </div>
      <div class="form-group col-md-5" >
        <label>Last Name</label>
        <input style="cursor: not-allowed" type="text" class="form-control" v-model="lastName" disabled>
      </div>
    </div>

    <!-- SID -->
    <div class="form-row">
      <div class="form-group col-md-10">
        <label>SID</label>
        <input style="cursor: not-allowed" type="text" class="form-control" v-model="SID" disabled>
      </div>
    </div>

    <!-- year/month/day -->
    <div class="form-row">
      <div class="form-group col-md-4">
        <label>Year</label>
        <input style="cursor: not-allowed" type="text" class="form-control" v-model="selectedYear" disabled>
      </div>

      <div class="form-group col-md-3">
        <label>Month</label>
        <input style="cursor: not-allowed" type="text" class="form-control" v-model="selectedMonth" disabled>
      </div>

      <div class="form-group col-md-3">
        <label>Day</label>
        <input style="cursor: not-allowed" type="text" class="form-control" v-model="selectedDay" disabled>
      </div>
    </div>

    <!-- email & telephone -->
    <div class="form-row">
      <div class="form-group col-md-5">
        <label>Email</label>
        <input type="text" class="form-control" :class="validators.email" v-model="email">
        <div class="invalid-feedback">Invalid email, please use this form abcd@xyz.</div>
      </div>
      <div class="form-group col-md-5">
        <label>Telephone</label>
        <input type="text" class="form-control" :class="validators.telephone" v-model="telephone">
        <div class="invalid-feedback">Telephone number can contain only digits and + sign.</div>
      </div>
    </div>

    <!-- address -->
    <div class="form-row">
      <div class="form-group col-md-10">
        <label>Address</label>
        <input type="text" class="form-control" :class="validators.address" v-model="address">
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
      </div>
      <div class="form-group col-md-5">
        <label>Zip</label>
        <input type="text" class="form-control" v-model="zip" :class="validators.zip">
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
      v-if="loading == 0 || loading == 2"
      type="button"
      class="btn btn-outline-primary central-button"
      @click="updateContract()"
    >Update</button>

    <div
      v-if="loading == 2"
      class="alert alert-success info-div"
      role="alert"
    >Successfully Updated</div>
  </form>
  </div>
</template>

<script>
// import PersonWeb3 from "../../utils/PersonWeb3.js";
import Pacient from "../../utils/Pacient.js";
import FieldValidator from "../../utils/FieldValidator.js";
export default {
  name: "PacientInfo",
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
        email: "",
        telephone: "",
        address: "",
        zip: "",
        selectedCity: ""
      },

      changed: {
        email: "",
        telephone: "",
        address: "",
        city: "",
        zip: ""
      },

      loading: 0,
      loadingData: true
    };
  },
  mounted: function() {
     this.$nextTick(async function() {
      this.pacient = new Pacient();
      this.firstName = await this.pacient.getFirstName();
      this.lastName = await this.pacient.getLastName();
      this.SID = await this.pacient.getSID();
      this.selectedYear = await this.pacient.getYear();
      this.selectedMonth = await this.pacient.getMonth();
      this.selectedDay = await this.pacient.getDay();
      this.email = await this.pacient.getEmail();
      this.telephone = await this.pacient.getTelephone();
      this.address = await this.pacient.getPersonAddress();
      this.selectedCity = await this.pacient.getCity();
      this.zip = await this.pacient.getZip();

      this.changed.email = this.email;
      this.changed.telephone = this.telephone;
      this.changed.address = this.address;
      this.changed.city = this.selectedCity;
      this.changed.zip = this.zip;

      this.loadingData = false;
    });
  },
  methods: {
    updateContract: async function() {
      if (this.checkFieldValidity()) {
        this.loading = 1;
        if (this.changed.email != this.email) {
          await this.pacient.setEmail(this.email);
          this.changed.email = this.email;
        }
        if (this.changed.telephone != this.telephone) {
          await this.pacient.setTelephone(this.telephone);
           this.changed.telephone = this.telephone;
        }
        if (this.changed.address != this.address) {
          await this.pacient.setAddress(this.address);
          this.changed.address = this.address;
        }
        if (this.changed.zip != this.zip) {
          await this.pacient.setZip(this.zip);
          this.changed.zip = this.zip;
        }
        if (this.changed.city != this.selectedCity) {
          await this.pacient.setCity(this.selectedCity);
          this.changed.city = this.city;
        }
        this.loading = 2;
      }
     
    },
    checkFieldValidity: function() {
      let fieldValidator = new FieldValidator();
      let ok = true;

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
.my-form {
  margin-top: 25px;
  margin-left: 150px;
  margin-bottom: 30px;

}
.central-button {
  margin-left: 150px;
  margin-top: 35px;
  width: 50%;
  font-weight: bold;
}

.info-div{
  width: 800px;
  text-align: center;
  margin-top: 15px;
}
</style>