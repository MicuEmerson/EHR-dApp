<template>
  <form class="my-form">
    <!-- first-name / last-name -->
    <div class="form-row">
      <div class="form-group col-md-5">
        <label>First Name</label>
        <input type="text" class="form-control" v-model="firstName" disabled>
      </div>
      <div class="form-group col-md-5">
        <label>Last Name</label>
        <input type="text" class="form-control" v-model="lastName" disabled>
      </div>
    </div>

    <!-- SID -->
    <div class="form-row">
      <div class="form-group col-md-10">
        <label>SID</label>
        <input type="text" class="form-control" v-model="SID" disabled>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group col-md-4">
        <label for="inputCNP">Year</label>
        <input type="text" class="form-control" v-model="selectedYear" disabled>
      </div>

      <div class="form-group col-md-3">
        <label for="inputCNP">Month</label>
        <input type="text" class="form-control" v-model="selectedMonth" disabled>
      </div>

      <div class="form-group col-md-3">
        <label>Day</label>
        <input type="text" class="form-control" v-model="selectedDay" disabled>
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
        <input type="text" class="form-control" v-model="zip">
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
      @click="updateContract()"
    >Update</button>
  </form>
</template>

<script>
import PersonWeb3 from "../../utils/PersonWeb3.js";
export default {
  name: "Pacient",
  data() {
    return {
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

      loading: 0
    };
  },
  // mounted: function() {
  //   this.$nextTick(function() {
  //     PersonWeb3.load();
  //   });
  // },
  methods: {
    updateContract: function(){
      this.loading = 1;
    }
  }
};
</script>

<style scoped>
.my-form {
  margin-top: 25px;
  margin-left: 150px;
}
.central-button {
  margin-left: 150px;
  margin-top: 35px;
  width: 50%;
  font-weight: bold;
}
</style>