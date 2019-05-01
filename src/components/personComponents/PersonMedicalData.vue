<template>
  <div class="my-content">

    <!-- @@@@@@ Filtre tabel  @@@@@@-->
    <div class="table-filters">
      <input class="form-control" type="text" v-model="search" placeholder="Search" @input="resetPagination()">
  
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

      <tbody>
        <tr v-for="project in paginated" :key="project.id" @click="showData(project)">
          <td>{{project.budget}}</td>
          <td>{{project.status}}</td>
        </tr>
      </tbody>
    </table>

    <!-- @@@@@@ paginarea @@@@@@ -->
    <nav aria-label="..." class="pagination-table">
      <ul class="pagination">
   
        <span style="margin: 5px 10px 0 10px">
          {{pagination.from}} - {{pagination.to}} of {{filteredProjects.length}}
           <span
            v-if="filteredProjects.length < pagination.total"
          >(filtered from {{pagination.total}} total entries)</span> 
        </span>
       
        <li :class="{disabled : cursorDown != 'pointer'}"  class="page-item" 
         @click="pagination.currentPage == 1 ? 1 : --pagination.currentPage" :style="'cursor:' + cursorDown">
          <a class="page-link">Previous</a>
        </li> 
        <li :class="{disabled : cursorUp != 'pointer'}" class="page-item"
        @click="pagination.currentPage == pagination.lastPag ? pagination.lastPag : ++pagination.currentPage" :style="'cursor:' + cursorUp">
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
                <div class="modal-header">
                  <h6 class="modal-title">Medical Data</h6>
                  <button type="button" class="close" @click="closeModal()">&times;</button>
                </div>
                <div class="modal-body">
                  <h1> aici vin datele medicale </h1>
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
import PersonWeb3 from "../../utils/PersonWeb3.js";
import FieldValidator from "../../utils/FieldValidator.js";

export default {
  name: "PersonMedicalData",
  data() {
    return {
      columns: [
        { width: "70%", label: "Budget", name: "budget" },
        { width: "30%", label: "Status", name: "status" }
      ],
      projects: [],
      pagination: {
        currentPage: 1,
        total: '',
        nextPage: '',
        prevPage: '',
        from: '',
        to: '',
        lastPag: ''
      },
      length: 5,
      search: '',
      cursorDown: 'pointer',
      cursorUp: 'pointer',
      showModal: false
    };
  },
  mounted: function() {
    this.$nextTick(async function() {
      //aici o sa iau datele de pe blockchain
      for (let i = 1; i <= 50; i++) {
        this.projects.push({
          id: i,
          budget: "buget" + i,
          status: "status" + i
        });
      }
      this.pagination.total = this.projects.length;
    });
  },
  methods: {
    paginate(array, length, pageNumber) {
      this.pagination.from = array.length ? ((pageNumber - 1) * length) + 1 : ' ';
      this.pagination.to = pageNumber * length > array.length ? array.length : pageNumber * length;
      this.pagination.prevPage = pageNumber > 1 ? pageNumber : '';
      this.pagination.nextPage = array.length > this.pagination.to ? pageNumber + 1 : '';
      return array.slice((pageNumber - 1) * length, pageNumber * length);
    },
    resetPagination() {
      this.pagination.currentPage = 1;
      this.pagination.prevPage = '';
      this.pagination.nextPage = '';
    },
    sortBy(key) {
      this.resetPagination();
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
    },
    getIndex(array, key, value) {
      return array.findIndex(i => i[key] == value)
    },
    showData(data){
      this.showModal = true;
    },
    closeModal(){
      this.showModal = false;
    }
  },
  computed:{

    filteredProjects(){
      let projects = this.projects;
      if (this.search) {
          projects = projects.filter((row) => {
              return Object.keys(row).some((key) => {
                  return String(row[key]).toLowerCase().indexOf(this.search.toLowerCase()) > -1;
              })
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
      return projects;
    },
    paginated(){
        this.pagination.currentPage == 1 ? this.cursorDown = 'not-allowed' : this.cursorDown = 'pointer';
       
        this.pagination.lastPag = this.filteredProjects.length % this.length == 0 ? 
                                  Math.floor(this.filteredProjects.length / this.length) : 
                                  Math.floor(this.filteredProjects.length / this.length + 1);

        this.pagination.currentPage == this.pagination.lastPag ?  this.cursorUp = 'not-allowed' : this.cursorUp = 'pointer';
        
        return this.paginate(this.filteredProjects, this.length, this.pagination.currentPage);
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
.table-filters{
  display: flex;
  justify-content: space-between;
  margin: 15px 0 15px 0;
}
.custom-select{
  width: 75px;
}
.form-control{
  width: 300px;
}
.pagination-table{
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
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>