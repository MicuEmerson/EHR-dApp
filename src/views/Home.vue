<template>
  <div>
    <h1>Hello Home</h1>
    <button @click="ceAccAm()"> ok </button>
  </div>
</template>

<script>
import Web3Wrapper from "../utils/Web3Wrapper.js";
export default {
  name: 'home',
  data() {
    return {
      myWeb3: ''
    };
  },
  mounted: function() {
    this.$nextTick( async function() {
      this.web3Wrapper = new Web3Wrapper();
      if(typeof this.web3Wrapper.account == 'undefined'){
         await this.web3Wrapper.loadWeb3();
         await this.web3Wrapper.loadAccount();
      }
    });
  },
  methods: {
    ceAccAm: function(){
      console.log(this.web3Wrapper.account);
    }
  }
}
</script>
