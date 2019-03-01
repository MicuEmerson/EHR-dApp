<template>
  <div id="app">
    
    <ul class="nav nav-tabs nav-fill" style="margin-bottom: 20px">
      <li class="nav-item">
        <router-link class="nav-link" to="/">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/pacient">Pacient</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/doctor">Doctor</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/register">Register</router-link>
      </li>
    </ul>
    
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin-bottom: 15px;
  
}
</style>
