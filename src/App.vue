<template>
  <div id="app">
    
    <ul class="nav nav-tabs nav-fill" style="margin-bottom: 20px">
      <!-- <li class="nav-item">
        <router-link class="nav-link" to="/">Home</router-link>
      </li> -->
      <li class="nav-item" @click="selected(1)" :style="{'background-color': one, 'border-bottom': '1px solid #dee2e6'}">
        <router-link  class="nav-link" to="/">Pacient</router-link>
      </li>
      <li class="nav-item" @click="selected(2)" :style="{'background-color': two, 'border-bottom': '1px solid #dee2e6'}">
        <router-link  class="nav-link" to="/doctor">Doctor</router-link>
      </li>
      <li class="nav-item" @click="selected(3)" :style="{'background-color': three, 'border-bottom': '1px solid #dee2e6'}">
        <router-link  class="nav-link " to="/register">Register</router-link>
      </li>

      <!-- <li class="nav-item" >
        <router-link  class="nav-link" to="/">Pacient</router-link>
      </li>
      <li class="nav-item">
        <router-link  class="nav-link" to="/doctor">Doctor</router-link>
      </li>
      <li class="nav-item">
        <router-link  class="nav-link " to="/register">Register</router-link>
      </li> -->
    </ul>
    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      one: "whitesmoke",
      two: "white",
      three: "white",
    };
  },
  mounted: function() {
    this.$nextTick(async function() {
      
    });
  },
  methods: {
    selected(id){
      this.one = id == 1 ?  "whitesmoke" : "white";
      this.two = id == 2 ?  "whitesmoke" : "white";
      this.three = id == 3 ?  "whitesmoke" : "white";
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin-bottom: 15px;
}
the-selected{
  background-color: whitesmoke;
}
</style>
