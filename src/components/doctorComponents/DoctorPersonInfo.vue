<template >
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
        <input style="cursor: not-allowed" type="text" class="form-control" v-model="email" disabled>
      </div>
      <div class="form-group col-md-5">
        <label>Telephone</label>
        <input style="cursor: not-allowed" type="text" class="form-control" v-model="telephone" disabled>
      </div>
    </div>

    <!-- address -->
    <div class="form-row">
      <div class="form-group col-md-10">
        <label>Address</label>
        <input style="cursor: not-allowed" type="text" class="form-control" v-model="address" disabled>
      </div>
      <div class="form-group col-md-5">
        <label>City</label>
        <select style="cursor: not-allowed" class="custom-select" v-model="selectedCity" disabled>
          <option disabled value>Select city</option>
          <option>Cluj</option>
          <option>Satu Mare</option>
          <option>Bucuresti</option>
        </select>
      </div>
      <div class="form-group col-md-5">
        <label>Zip</label>
        <input style="cursor: not-allowed" type="text" class="form-control" v-model="zip" disabled>
      </div>
    </div>

  </form>
  </div>
</template>

<script>
import Doctor from "../../utils/Doctor.js";
export default {
  name: "DoctorPersonInfo",
  data() {
    return {
      doctor: "",
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

      loadingData: true
    };
  },
  mounted: function() {
     this.$nextTick(async function() {
      this.doctor = new Doctor();
      this.firstName = await this.doctor.getFirstName();
      this.lastName = await this.doctor.getLastName();
      this.SID = await this.doctor.getSID();
      this.selectedYear = await this.doctor.getYear();
      this.selectedMonth = await this.doctor.getMonth();
      this.selectedDay = await this.doctor.getDay();
      this.email = await this.doctor.getEmail();
      this.telephone = await this.doctor.getTelephone();
      this.address = await this.doctor.getPersonAddress();
      this.selectedCity = await this.doctor.getCity();
      this.zip = await this.doctor.getZip();

      this.loadingData = false;
    });
  },
  methods: {
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