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
      <tbody>
        <tr v-for="doctor in mockDoctors" :key="doctor.id">
          <td>{{doctor.name}}</td>
          <td>{{doctor.specialty}}</td>
          <td>{{doctor.address}}</td>
          <td class="delete-icon" @click="deleteDoctor(doctor.id)">
            <img src="/images/delete-icon.svg" width="30" height="26">
          </td>
        </tr>
      </tbody>
    </table>

    <!-- modal for delete button -->
    <div v-if="showModal">
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
                  <button @click="cancelModal" type="button" class="btn btn-secondary">Cancel</button>
                  <button @click="deleteDoctor" type="button" class="btn btn-danger">Remove</button>
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
            @click="addDoctor()"
          >
            <img src="/images/add-icon.png" width="30" height="26">
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import PersonWeb3 from "../../utils/PersonWeb3.js";
import FieldValidator from "../../utils/FieldValidator.js";
export default {
  name: "PacientDoctorsAccess",
  data() {
    return {
      loading: 0,
      showModal: false,
      doctorAddress: "",
      nada: "",
      mockDoctors: [
        {
          id: 0,
          name: "Mark",
          specialty: "Dermatology",
          address: "0x28C7B4047Ac19F69BaE94aEB2Ace6f5b17B62908"
        },
        {
          id: 1,
          name: "Johnny",
          specialty: "Cardiology",
          address: "0x28C7B4047Ac19F69BaE94aEB2Ace6f5b17B62908"
        },
        {
          id: 2,
          name: "Arthur ",
          specialty: "Imunology",
          address: "0x28C7B4047Ac19F69BaE94aEB2Ace6f5b17B62908"
        }
      ]
    };
  },
  mounted: function() {
    this.$nextTick(async function() {});
  },
  methods: {
    addDoctor: async function(){
      this.nada = await PersonWeb3.checkDoctorAddress(this.doctorAddress);
      console.log(this.nada);
      // PersonWeb3.addDoctor(this.doctorAddress);
    },
    deleteDoctor: function(id) {
      console.log("deleteDoctor with id:" + id);
      this.showModal = true;
    },
    deleteModal: function() {
      console.log("deleteModal");
    },
    cancelModal: function() {
      console.log("cancelModal");
      this.showModal = false;
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