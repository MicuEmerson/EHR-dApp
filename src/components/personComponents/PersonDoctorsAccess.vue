<template>
  <div class="my-content">
    <!-- table to show doctors -->
    <table class="table table-hover table-bordered">
      <thead>
        <tr class="my-tr">
          <th scope="col">Name</th>
          <th scope="col">Specialty</th>
          <th scope="col">Address</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>
      <tbody v-if="loading == false">
        <tr v-for="doctor in doctors" :key="doctor.id">
          <td>{{doctor.name}}</td>
          <td>{{doctor.specialty}}</td>
          <td>{{doctor.address}}</td>
          <td class="delete-icon" @click="deleteDoctorModal(doctor)">
            <img src="/images/delete-icon.svg" width="30" height="26">
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="loading == true" class="text-center" style="margin-bottom: 15px">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <!-- modal for delete button -->
    <div v-if="showModalDelete">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h6
                    class="modal-title"
                    id="exampleModalLabel"
                  >Do you wanna to remove this doctor's access?</h6>
                </div>
                <div class="modal-footer">
                  <button @click="cancelModalDelete" type="button" class="btn btn-secondary">Cancel</button>
                  <button @click="deleteDoctor" type="button" class="btn btn-danger">Remove</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

  <!-- modal for add doctor -->
    <div v-if="showModalAdd">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h6
                    class="modal-title"
                    id="exampleModalLabel"
                  >Do you wanna to add <b>{{doctor.name}}</b> with specialty <b>{{doctor.specialty}}</b>?</h6>
                </div>
                <div class="modal-footer">
                  <button @click="cancelModalAdd" type="button" class="btn btn-secondary">Cancel</button>
                  <button @click="addDoctor" type="button" class="btn btn-danger">Add</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- add new doctor -->
    <div class="add-doctor">
      <div class="input-group input-group-lg">
        <div class="input-group-prepend">
          <span class="input-group-text">Doctor's Address</span>
        </div>
        <input type="text" class="form-control" v-model="doctorAddress">
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            title="Copy Address"
            @click="addDoctorModal()"
          >
            <img src="/images/add-icon.png" width="30" height="26">
          </button>
        </div>
      </div>
    </div>
    <div
        v-if="error"
        class="alert alert-danger"
        role="alert"
        >{{this.errorMsg}}
    </div>

   
  </div>
</template>


<script>
import PersonWeb3 from "../../utils/PersonWeb3.js";
export default {
  name: "PacientDoctorsAccess",
  data() {
    return {
      loading: true,
      showModalDelete: false,
      showModalAdd: false,
      doctorAddress: "",
      doctor: "",
      doctors: [],
      errorMsg: "cf",
      error: false
    };
  },
  mounted: function() {
    this.$nextTick(async function() {
      this.doctors = await PersonWeb3.getAllDoctors();
      this.loading = false;
    });
  },
  methods: {

    checkDuplicateDoctor: function(){
      for(let i = 0; i < this.doctors.length; i++){
        if(this.doctors[i].address == this.doctorAddress){
          return true;
        }
      }
      return false;
    },

    addDoctorModal: async function(){
      //tre sa verific daca e doctor si nu este deja adaugat
      if(!this.checkDuplicateDoctor()){
        
        this.doctor = await PersonWeb3.checkDoctorAddress(this.doctorAddress);
        console.log('doctor', this.doctor);
        if(this.doctor == "error"){
          this.errorMsg = "Invalid address!"
          this.error = true;
        }
        else{
          if(this.doctor.name == ""){
            this.errorMsg = "This address is not a doctor address!"
            this.error = true;
          }
          else{
            this.errorMsg = ""
            this.error = false;
            this.showModalAdd = true;
          }
        }
      }
      else{
        this.errorMsg = "This doctor already exist in access list!"
        this.error = true;
      }
    },

    addDoctor: async function(){
      await PersonWeb3.addDoctor(this.doctorAddress);
      
      let id = this.doctors.length == 0 ? 0 : this.doctors[this.doctors.length - 1].id + 1;
      
      this.$set(this.doctors, this.doctors.length, {
        id: id,
        address: this.doctorAddress,
        name: this.doctor.name,
        specialty: this.doctor.specialty
      })

      this.doctorAddress = "";
      this.showModalAdd = false;
    },

    deleteDoctorModal: function(doctor) {
      this.showModalDelete = true;
      this.doctor = doctor;
    },
    deleteDoctor: async function(){
      console.log('deleteDoctor', await PersonWeb3.deleteDoctor(this.doctor.address));
      this.$delete(this.doctors, this.doctor.id)
      this.showModalDelete = false;
    },

    cancelModalDelete: function() {
      this.showModalDelete = false;
    },
    cancelModalAdd: function() {
      this.showModalAdd = false;
    }
  }
};
</script>

<style scoped>
.my-content {
  margin-bottom: 30px;
  margin-top: 30px;
  margin-left: 110px;
  width: 80%;
}
.my-tr {
  text-align: center;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.delete-icon {
  text-align: center;
  cursor: pointer;
}
.add-doctor {
}
</style>