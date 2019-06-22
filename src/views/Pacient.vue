<template>
  <div>
    <transition name="fade">

      <!-- connect to smart-contract -->
      <div id="connect-part" v-if="loading == 0 || loading == 2">
        <h2>Connect to your Smart Contract</h2>
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
          role="alert"
          v-if="loading == 2"
        >You don't have access to this contract.</div>
      </div>

      <!-- Logged Pacient -->
      <div v-if="loading == 1">
        <h2>Welcome {{firstName}}</h2>

        <div class="pacient-layout">
          <div class="pacient-menu">
            <ul class="list-group">
              <li class="list-group-item" @click="selected(1)" :style="{'background-color': one, 'border-bottom': '1px solid #dee2e6'}">
                <router-link class="nav-link" to="/">Info</router-link>
              </li>
              <li class="list-group-item" @click="selected(2)" :style="{'background-color': two, 'border-bottom': '1px solid #dee2e6'}">
                <router-link class="nav-link" to="/medical">Medical Data</router-link>
              </li>
              <li class="list-group-item" @click="selected(3)" :style="{'background-color': three, 'border-bottom': '1px solid #dee2e6'}">
                <router-link class="nav-link" to="/doctors">Doctors Access</router-link>
              </li>
            </ul>
          </div>
          <div class="pacient-display">
            <router-view/>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Pacient from "../utils/Pacient.js";
export default {
  name: "Pacient",
  data() {
    return {
      smAddress: "",
      firstName: "",
      loading: 0,
      pacient: "",
      one: "whitesmoke",
      two: "white",
      three: "white",
    };
  },
  mounted: function() {
    this.$nextTick(async function() {
      this.pacient = new Pacient();
      if(typeof this.pacient.contracts == 'undefined'){
        await this.pacient.loadContracts();
      }
    });
  },
  methods: {
    login: async function() {
      this.firstName = await this.pacient.getAccess(this.smAddress);
      if (this.firstName !== "error"){
        this.loading = 1;
      }
      else{
        this.loading = 2;
      }
    },
    selected(id){
      this.one = id == 1 ?  "whitesmoke" : "white";
      this.two = id == 2 ?  "whitesmoke" : "white";
      this.three = id == 3 ?  "whitesmoke" : "white";
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
h2 {
  text-align: center;
  margin-bottom: 20px;
}
.pacient-layout {
  display: flex;
  justify-content: flex-start;
  margin: 15px;
}
.pacient-menu {
  flex-grow: 1;
}

.pacient-display {
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
