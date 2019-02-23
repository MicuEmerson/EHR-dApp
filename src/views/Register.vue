<template>
  <div id="register-view">
    <h2>Pacient Smart Contract</h2>

    <form class="my-form">

      <!-- first-name / last-name -->
      <div class="form-row">
        <div class="form-group col-md-5">
          <label>First Name</label>
          <input type="text" class="form-control" :class="validators.firstName" v-model="firstName" placeholder="John"> 
          <div class="invalid-feedback">
            First Name can contain only letters.
          </div>
        </div>
        <div class="form-group col-md-5">
          <label>Last Name</label>
          <input type="text" class="form-control" :class="validators.lastName" v-model="lastName" placeholder="Smith">
          <div class="invalid-feedback">
            Last Name can contain only letters.
          </div>
        </div>
      </div>

      <!-- SID -->
      <div class="form-row">
        <div class="form-group col-md-10">
          <label>SID</label>
          <input type="text" class="form-control" :class="validators.SID" v-model="SID" placeholder="security identifier">
          <div class="invalid-feedback">
            SID can contain only digits.
          </div>
        </div>
      </div>

      <!-- year / month / day -->
       <div class="form-row">
        <div class="form-group col-md-4">
          <label for="inputCNP">Year</label>
          <select class="custom-select" :class="validators.selectedYear" v-model="selectedYear" required>
            <option disabled value="">Select year</option>
            <option v-for="i in 2019" v-if="i >= 1935" :key="i">
              {{i}}
            </option>
          </select>
          <div class="invalid-feedback">
            Please select year.
          </div>
        </div>

        <div class="form-group col-md-3">
          <label for="inputCNP">Month</label>
          <select class="custom-select" :class="validators.selectedMonth" v-model="selectedMonth" required>
            <option disabled value="">Select month</option>
            <option v-for="i in 12" :key="i">
              {{i}}
            </option>
          </select>
          <div class="invalid-feedback">
            Please select month.
          </div>
        </div>

        <div class="form-group col-md-3">
          <label>Day</label>
          <select class="custom-select" :class="validators.selectedDay" v-model="selectedDay" required>
            <option disabled value="">Select day</option>
            <option v-for="i in 31" :key="i">
              {{i}}
            </option>
          </select>
          <div class="invalid-feedback">
            Please select day.
          </div>
        </div>
      </div>

      <!-- email / phone -->
      <div class="form-row">
        <div class="form-group col-md-5">
          <label>Email</label>
          <input type="text" class="form-control" :class="validators.email" v-model="email" placeholder="johnsmith@gmail.com">
          <div class="invalid-feedback">
            Invalid email, please use this form abcd@xyz.
          </div>
        </div>
        <div class="form-group col-md-5">
          <label>Telephone</label>
          <input type="text" class="form-control" :class="validators.telephone" v-model="telephone" placeholder="+40...">
          <div class="invalid-feedback">
            Telephone number can contain only digits and + sign.
          </div>
        </div>
      </div>

      <!-- address -->
      <div class="form-row">
        <div class="form-group col-md-10">
          <label>Address</label>
          <input type="text" class="form-control" :class="validators.address" v-model="address" placeholder="full address">
          <div class="invalid-feedback">
            Address field cannot be empty.
          </div>
        </div>
        <div class="form-group col-md-5">
          <label>City</label>
          <select class="custom-select" :class="validators.selectedCity" v-model="selectedCity" required>
            <option disabled value="">Select city</option>
            <option>Cluj</option>
            <option>Satu Mare</option>
            <option>Bucuresti</option>
          </select>
          <div class="invalid-feedback">
            Please select city.
          </div>
        </div>
        
        <div class="form-group col-md-5">
          <label>Zip</label>
          <input type="text" class="form-control" :class="validators.zip" v-model="zip" placeholder="12345">
          <div class="invalid-feedback">
            Zip code can contain only digits.
          </div>
        </div>
      </div>

      <button type="button" class="btn btn-outline-primary" @click="handleForm()">Register</button>

    </form>
  </div>
</template>

<script>
//aici bagam web3

export default {
  name: 'Register',
  data(){
    return {
      firstName: "",
      lastName : "",
      SID: "",
      selectedYear: "",
      selectedMonth: "",
      selectedDay: "",
      email: "",
      telephone: "",
      address: "",
      zip: "",
      selectedCity: "",

      validators:{
        firstName: "",
        lastName : "",
        SID: "",
        selectedYear: "",
        selectedMonth: "",
        selectedDay: "",
        email: "",
        telephone: "",
        address: "",
        zip: "",
        selectedCity: ""
      }
    }
  },
  methods:{
     handleForm: function() {
         console.log(this.firstName);
         this.validators.firstName = Math.random() > 0.5 ? "is-valid" : "is-invalid";
         this.validators.lastName = Math.random() > 0.5 ? "is-valid" : "is-invalid";
         this.validators.email = Math.random() > 0.5 ? "is-valid" : "is-invalid";
         this.validators.selectedYear = Math.random() > 0.5 ? "is-valid" : "is-invalid";
         this.validators.selectedMonth = Math.random() > 0.5 ? "is-valid" : "is-invalid";
         this.validators.selectedDay = Math.random() > 0.5 ? "is-valid" : "is-invalid";        
     },
  },

}
</script>

<style scoped>
#register-view {
  margin: auto;
  width: 75%;
  border: 1px solid lightgray;
  padding: 20px;
  margin-bottom: 40px;
}
h2 {
  text-align: center;
  margin-bottom: 20px;
}
.my-form {
  margin-left: 150px;
}
button {
  margin-left: 150px;
  margin-top: 35px;
  width: 50%;
  font-weight: bold;
}
</style>