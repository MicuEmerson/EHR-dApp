<template>
  <div class="my-content">
    <!-- @@@@@@ Filtre tabel  @@@@@@-->
    <div class="table-filters">
      <input
        class="form-control"
        type="text"
        v-model="search"
        placeholder="Search"
        @input="resetPagination()"
      >

      <select class="custom-select" v-model="length" @change="resetPagination()">
        <option value="5" selected>5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
    </div>

    <!-- @@@@@@ tabelul @@@@@@ -->
    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.name"
            :style="'width:'+column.width+';'+'cursor:pointer;'"
          >{{column.label}}</th>
        </tr>
      </thead>

      <tbody v-if="loading == false">
        <tr v-for="med in paginated" :key="med.data" @click="showData(med)">
          <td>{{med.doctor}}</td>
          <td>{{formatDate(med.data)}}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="loading == true" class="text-center" style="margin-bottom: 15px">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
    </div>

    <!-- @@@@@@ paginarea @@@@@@ -->
    <nav aria-label="..." class="pagination-table">
      <ul class="pagination">
        <span style="margin: 5px 10px 0 10px">
          {{pagination.from}} - {{pagination.to}} of {{filteredProjects.length}}
          <span
            v-if="filteredProjects.length < pagination.total"
          >(filtered from {{pagination.total}} total entries)</span>
        </span>

        <li
          :class="{disabled : cursorDown != 'pointer'}"
          class="page-item"
          @click="pagination.currentPage == 1 ? 1 : --pagination.currentPage"
          :style="'cursor:' + cursorDown"
        >
          <a class="page-link">Previous</a>
        </li>
        <li
          :class="{disabled : cursorUp != 'pointer'}"
          class="page-item"
          @click="pagination.currentPage == pagination.lastPag ? pagination.lastPag : ++pagination.currentPage"
          :style="'cursor:' + cursorUp"
        >
          <a class="page-link">Next</a>
        </li>
      </ul>
    </nav>

    <!-- Modal with medical data -->
    <div v-if="showModal">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper bd-example-modal-lg">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <button
                  style="text-align:right; margin: 5px"
                  type="button"
                  class="close"
                  @click="closeModal()"
                >&times;</button>
                <h5 class="title">Analysis Result</h5>
                <hr>
                <div class="parent-flex">
                  <div style="margin-left: 10px">
                    <div class="text-titlu">
                      First Name:
                      <span style="font-weight: bold">{{this.doctor.firstName}}</span>
                    </div>
                    <div class="text-titlu">
                      Last Name:
                      <span style="font-weight: bold">{{this.doctor.lastName}}</span>
                    </div>
                    <div class="text-titlu">
                      SID:
                      <span style="font-weight: bold">{{this.doctor.sid}}</span>
                    </div>
                    <div class="text-titlu">
                      Birthday:
                      <span style="font-weight: bold">{{personBirthday}}</span>
                    </div>
                  </div>

                  <div style="margin-right: 10px">
                    <div class="text-titlu">
                      Date:
                      <span style="font-weight: bold">{{formatDate(currMedData.data)}}</span>
                    </div>
                    <div class="text-titlu">
                      Made By:
                      <span style="font-weight: bold">{{currMedData.doctor}}</span>
                    </div>
                  </div>
                </div>

                <div class="modal-body">
                  <table class="table table-sm">
                    <thead>
                      <tr>
                        <th style="width: 38%" scope="col">Name</th>
                        <th style="width: 15%" scope="col">Result</th>
                        <th style="width: 15%" scope="col">Unit</th>
                        <th style="width: 32%" scope="col">Reference Range</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="medData in currMedData.medicalData" :key="medData.name">
                        <td>{{medData.name}}</td>
                        <td>
                          <span
                            :class="{'just-border' : checkRangeOk(resultRange[medData.name].down,
                          resultRange[medData.name].up, medData.value)}"
                          >{{medData.value}}</span>
                        </td>
                        <td>{{resultRange[medData.name].unit}}</td>
                        <td>{{resultRange[medData.name].range}}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="input-group" v-if="currMedData.additionalInfo != ''">
                    <div class="input-group-prepend">
                      <span class="input-group-text">Additional Information</span>
                    </div>
                    <textarea
                      class="form-control"
                      aria-label="With textarea"
                      v-model="currMedData.additionalInfo"
                      disabled
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>


<script>
import Doctor from "../../utils/Doctor.js";
import ResultsRange from "../../../public/resultsRange.json";
export default {
  name: "DoctorMedicalData",
  data() {
    return {
      doctor: "",
      resultRange: "",
      currMedData: "",
      medData: [],
      loading: true,
      columns: [
        { width: "60%", label: "Doctor", name: "doctor" },
        { width: "40%", label: "Date", name: "date" }
      ],
      projects: [],
      pagination: {
        currentPage: 1,
        total: "",
        nextPage: "",
        prevPage: "",
        from: "",
        to: "",
        lastPag: ""
      },
      length: 5,
      search: "",
      cursorDown: "pointer",
      cursorUp: "pointer",
      showModal: false
    };
  },
  mounted: function() {
    this.$nextTick(async function() {
      this.doctor = await new Doctor();
      this.medData = await this.doctor.getAllMedicalData();
      //   medData.sort(function(a, b) {
      //     return b.date - a.date;
      //   });
      this.pagination.total = this.medData.length;
      this.resultRange = ResultsRange;
      this.loading = false;
    });
  },
  methods: {
    paginate(array, length, pageNumber) {
      this.pagination.from = array.length ? (pageNumber - 1) * length + 1 : " ";
      this.pagination.to =
        pageNumber * length > array.length ? array.length : pageNumber * length;
      this.pagination.prevPage = pageNumber > 1 ? pageNumber : "";
      this.pagination.nextPage =
        array.length > this.pagination.to ? pageNumber + 1 : "";
      return array.slice((pageNumber - 1) * length, pageNumber * length);
    },
    resetPagination() {
      this.pagination.currentPage = 1;
      this.pagination.prevPage = "";
      this.pagination.nextPage = "";
    },
    sortBy(key) {
      this.resetPagination();
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
    },
    getIndex(array, key, value) {
      return array.findIndex(i => i[key] == value);
    },
    showData(data) {
      this.currMedData = data;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    formatDate(nr) {
      var dateObj = new Date(nr);
      var month = dateObj.getUTCMonth() + 1; //months from 1-12
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();
      var hour = dateObj.getHours();
      var minute = dateObj.getMinutes();

      if (month < 10) {
        month = "0" + month;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }

      return year + "-" + month + "-" + day + "  " + hour + ":" + minute;
    },
    checkRangeOk(down, up, value) {
      let ok = down <= value && value <= up;
      return !ok;
    }
  },
  computed: {
    filteredProjects() {
      let medData = this.medData;
      if (this.search) {
        medData = medData.filter(row => {
          return Object.keys(row).some(key => {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(this.search.toLowerCase()) > -1
            );
          });
        });
      }
      // let sortKey = this.sortKey;
      // let order = this.sortOrders[sortKey] || 1;
      // if (sortKey) {
      //     projects = projects.slice().sort((a, b) => {
      //         let index = this.getIndex(this.columns, 'name', sortKey);
      //         a = String(a[sortKey]).toLowerCase();
      //         b = String(b[sortKey]).toLowerCase();
      //         if (this.columns[index].type && this.columns[index].type === 'date') {
      //             return (a === b ? 0 : new Date(a).getTime() > new Date(b).getTime() ? 1 : -1) * order;
      //         } else if (this.columns[index].type && this.columns[index].type === 'number') {
      //             return (+a === +b ? 0 : +a > +b ? 1 : -1) * order;
      //         } else {
      //             return (a === b ? 0 : a > b ? 1 : -1) * order;
      //         }
      //     });
      // }
      return medData;
    },
    paginated() {
      this.pagination.currentPage == 1
        ? (this.cursorDown = "not-allowed")
        : (this.cursorDown = "pointer");

      this.pagination.lastPag =
        this.filteredProjects.length % this.length == 0
          ? Math.floor(this.filteredProjects.length / this.length)
          : Math.floor(this.filteredProjects.length / this.length + 1);

      this.pagination.currentPage == this.pagination.lastPag
        ? (this.cursorUp = "not-allowed")
        : (this.cursorUp = "pointer");

      return this.paginate(
        this.filteredProjects,
        this.length,
        this.pagination.currentPage
      );
    },
    personBirthday() {
      return this.doctor.year + "-" + this.doctor.month + "-" + this.doctor.day;
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
.table-filters {
  display: flex;
  justify-content: space-between;
  margin: 15px 0 15px 0;
}
.custom-select {
  width: 75px;
}
.form-control {
  width: 300px;
}
.pagination-table {
  display: flex;
  justify-content: flex-end;
  margin: 15px 0 15px 0;
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
.modal-title {
  text-align: center !important;
}
.modal-body {
  max-height: calc(100vh - 200px);
  overflow-y: auto;
  margin-bottom: 30px;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.title {
  text-decoration: underline;
  text-align: center;
}
.text-titlu {
  font-size: 12px;
}
.parent-flex {
  display: flex;
  justify-content: space-between;
}
.just-border {
  border: solid 1px black;
  padding: 2px;
}
hr {
  border: 0;
  clear: both;
  display: block;
  width: 96%;
  background-color: gray;
  height: 1px;
}
</style>