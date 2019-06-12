<template>
  <div>
    <div v-if="doctorLogin == 1">
      <h2 class="h2-doctorName">Welcome {{doctorName}}</h2>

      <transition name="fade">
        <div id="connect-part" v-if="loading == 0 || loading == 2">
          <h2 class="h2-connect">Connect to Patient Smart Contract</h2>
          <div class="input-group input-group-lg">
            <div class="input-group-prepend">
              <span class="input-group-text">Contract Address</span>
            </div>
            <input type="text" class="form-control" v-model="smAddress">
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary"
                type="button"
                title="Copy Address"
                @click="login()"
              >
                <img src="/images/login-icon.svg" width="30" height="26">
              </button>
            </div>
          </div>
          <div
            class="alert alert-danger"
            v-if="loading == 2"
          >You don't have access to this contract.</div>
        </div>

        <div v-if="loading == 1">
          <div class="doctor-layout">
            <div class="doctor-menu">
              <ul class="list-group">
                <li class="list-group-item">
                  <router-link class="nav-link" to="/doctor">Pacient Info</router-link>
                </li>
                <li class="list-group-item">
                  <router-link class="nav-link" to="/doctor/medical">Previous Medical Data</router-link>
                </li>
                <li class="list-group-item">
                  <router-link class="nav-link" to="/doctor/newdata">Add Medical Data</router-link>
                </li>

              </ul>
            </div>
            <div class="doctor-display">
              <router-view/>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div v-if="doctorLogin == 2" class="alert alert-danger">
      <h2 class="h2-connect">You are not logged with a doctor address!</h2>
    </div>
  </div>
</template>


<script>
import Web3Wrapper from "../utils/Web3Wrapper.js";
import Doctor from "../utils/Doctor.js";
export default {
  name: "Doctor",
  data() {
    return {
      smAddress: "",
      doctorName: "",
      loading: 0,
      doctorLogin: 0,
      firstName: "",
      doctor: ""
    };
  },
  mounted: function() {
    this.$nextTick(async function() {
      this.doctor = new Doctor();
      if (typeof this.doctor.contracts == "undefined") {
        await this.doctor.loadContracts();
      }
      await this.checkDoctorAddress();
    });
  },
  methods: {
    login: async function() {
      this.firstName = await this.doctor.getAccess(this.smAddress);
      if (this.firstName !== "error") {
        this.loading = 1;
      } else {
        this.loading = 2;
      }
    },
    checkDoctorAddress: async function() {
      let x = await this.doctor.checkDoctorAddress();
      this.doctorName = x.name;
      if (this.doctorName != "") {
        this.doctorLogin = 1;
      } else {
        this.doctorLogin = 2;
      }
    }
  }
};
</script>

<style scoped>
#connect-part {
  margin: auto;
  width: 75%;
  border: 1px solid lightgray;
  padding: 20px;
  margin-bottom: 40px;
  background-color: whitesmoke;
}
.h2-connect {
  text-align: center;
  margin-bottom: 20px;
}
.h2-doctorName {
  margin: 20px;
}

.doctor-layout {
  display: flex;
  justify-content: flex-start;
  margin: 15px;
}
.doctor-menu {
  flex-grow: 1;
}

.doctor-display {
  flex-grow: 11;
  border: 1px solid lightgray;
  height: auto;
}

.active-select{
  background-color: #f8f8f8
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
