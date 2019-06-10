<template>
  <div>
    <h1>This is doctor's page</h1>
    <button @click="ceAccAm()"> ok </button>
  </div>
</template>


<script>

import Web3Wrapper from "../utils/Web3Wrapper.js";
import Pacient from "../utils/Pacient.js";
export default {
  name: "Doctor",
  data() {
    return {
      myWeb3: '',
      pacient: ''
    };
  },
  mounted: function() {
    this.$nextTick( async function() {
      // this.myWeb3 = new Web3Wrapper();
      // await this.myWeb3.loadWeb3();
      // await this.myWeb3.loadAccount();
      this.pacient = new Pacient();
      if(typeof this.pacient.contracts == "undefined"){
       await this.pacient.loadContracts();
      }
      console.log(this.pacient);
    });
  },
  methods: {
    ceAccAm: function(){
      console.log(this.myWeb3.account);
    }
  }
};
</script>

<style scoped>

</style>
