<template>
  <div>
    <transition name="fade">
      <div v-if="show == 1">
        <h3 class="my-h3">Select Analysis</h3>
        <div class="parent-flex">
          <div class="chield-flex">
            <fieldset v-for="(analyse, index) in analysis" :key="analyse.legend" v-if="index <= 2">
              <legend>{{analyse.legend}}</legend>

              <div
                v-for="elem in analyse.elems"
                :key="elem.name"
                class="custom-control custom-checkbox mb-3"
              >
                <input v-model="elem.checked" type="checkbox" class="custom-control-input">
                <label
                  class="custom-control-label"
                  @click="elem.checked = !elem.checked"
                >{{elem.name}}</label>
              </div>
            </fieldset>
          </div>

          <div class="chield-flex">
            <fieldset v-for="(analyse, index) in analysis" :key="analyse.legend" v-if="index > 2">
              <legend>{{analyse.legend}}</legend>

              <div
                v-for="elem in analyse.elems"
                :key="elem.name"
                class="custom-control custom-checkbox mb-3"
              >
                <input v-model="elem.checked" type="checkbox" class="custom-control-input">
                <label
                  class="custom-control-label"
                  @click="elem.checked = !elem.checked"
                >{{elem.name}}</label>
              </div>
            </fieldset>
          </div>
        </div>
        <button type="button" class="btn btn-outline-primary central-button" @click="show = 2">Next</button>
      </div>

      <!-- |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||-->

      <div v-if="show == 2" class="complete-analysis">
        <h3 style="margin-bottom: 25px" class="my-h3">Complete Analysis</h3>
        <div class="parent-flex">
          <div>
            <div
              v-for="(elem,index) in separeArray[0]"
              :key="index"
              style="width: 450px; margin-bottom: 20px"
            >
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">{{analysis[elem[0]].elems[elem[1]].name}}</span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  v-model="analysis[elem[0]].elems[elem[1]].value"
                >
                <div class="input-group-append">
                  <span class="input-group-text">{{analysis[elem[0]].elems[elem[1]].unit}}</span>
                </div>
              </div>
              <div class="range-data">{{analysis[elem[0]].elems[elem[1]].range}}</div>
            </div>
          </div>

          <div>
            <div
              v-for="(elem,index) in separeArray[1]"
              :key="index"
              style="width: 450px; margin-bottom: 20px"
            >
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">{{analysis[elem[0]].elems[elem[1]].name}}</span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  v-model="analysis[elem[0]].elems[elem[1]].value"
                >
                <div class="input-group-append">
                  <span class="input-group-text">{{analysis[elem[0]].elems[elem[1]].unit}}</span>
                </div>
              </div>
              <div class="range-data">{{analysis[elem[0]].elems[elem[1]].range}}</div>
            </div>
          </div>
        </div>

        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Additional Information</span>
          </div>
          <textarea class="form-control" aria-label="With textarea" v-model="additionalInfo"></textarea>
        </div>
        <button
          class="btn btn-outline-primary central-button"
          type="button"
          disabled
          v-if="loading == 1"
        >
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Loading...
        </button>
        <button
          v-if="loading == 0"
          type="button"
          class="btn btn-outline-primary central-button"
          @click="showModal = true"
        >Add</button>

        <div v-if="showModal">
          <transition name="modal">
            <div class="modal-mask">
              <div class="modal-wrapper">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-body">
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Key</span>
                        </div>
                        <input type="text" class="form-control" v-model="key">
                      </div>
                      <div v-if="invalidKey" role="alert" class="alert alert-danger">
                        Please enter a valid key
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button @click="handleModal()" type="button" class="btn btn-danger">Ok</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Doctor from "../../utils/Doctor.js";
import SimpleCrypto from "simple-crypto-js";
export default {
  name: "DoctorAddData",
  data() {
    return {
      key: "",
      invalidKey: false,
      loading: 0,
      showModal: false,
      doctor: "",
      show: 1,
      additionalInfo: "",
      myJson: {
        doctor: "",
        data: "",
        medicalData: [],
        additionalInfo: ""
      },
      analysis: [
        {
          legend: "Cholesterol",
          elems: [
            {
              name: "Total Cholesterol",
              value: "",
              checked: false,
              range: "< 200 mg/dL",
              unit: "mg/dL"
            },
            {
              name: "LDL (low-density lipoprotein)",
              value: "",
              checked: false,
              range: "< 100 mg/dL",
              unit: "mg/dL"
            },
            {
              name: "HDL (high-density lipoprotein)",
              value: "",
              checked: false,
              range: "> 60 mg/dL",
              unit: "mg/dL"
            }
          ]
        },
        {
          legend: "Electrolytes",
          elems: [
            {
              name: "Calcium",
              value: "",
              checked: false,
              range: "8.5 - 10.5  mg/dL",
              unit: "mg/dL"
            },
            {
              name: "Sodium",
              value: "",
              checked: false,
              range: "135 - 145 mEq/L",
              unit: "mEq/L"
            },
            {
              name: "Potassium",
              value: "",
              checked: false,
              range: "3.6 - 5.2 mmol/L",
              unit: "mmol/L"
            },
            {
              name: "Magnesium",
              value: "",
              checked: false,
              range: "1.7 - 2.4 mg/dL",
              unit: "mg/dL"
            },
            {
              name: "Chloride",
              value: "",
              checked: false,
              range: "98 - 106 mmol/L",
              unit: "mmol/L"
            }
          ]
        },
        {
          legend: "Glucose",
          elems: [
            {
              name: "Glucose",
              value: "",
              checked: false,
              range: "4.0 - 5.9 mmol/L",
              unit: "mmol/L"
            },
            {
              name: "Hemoglobin A1C (HbA1c)",
              value: "",
              checked: false,
              range: "4% - 5.6%",
              unit: "%"
            }
          ]
        },
        {
          legend: "Complete Blood Count (CBC)",
          elems: [
            {
              name: "Erythrocytes",
              value: "",
              checked: false,
              range: "4.7 - 6.1 / mcL",
              unit: "mcL"
            },
            {
              name: "Leukocytes",
              value: "",
              checked: false,
              range: "5,000 - 10,000 / mcL",
              unit: "mcL"
            },
            {
              name: "Thrombocytes",
              value: "",
              checked: false,
              range: "150,000 - 450,000 / mcL",
              unit: "mcL"
            },
            {
              name: "Hemoglobin (Hb)",
              value: "",
              checked: false,
              range: "4% - 5.6%",
              unit: "%"
            },
            {
              name: "Hematocrit (Ht)",
              value: "",
              checked: false,
              range: "13.5 – 17.5 g/dL",
              unit: "g/dL"
            },
            {
              name: "Mean Corpuscular Volume (MCV)",
              value: "",
              checked: false,
              range: "27 - 33 pg/cell", //picograms
              unit: "pg/cell"
            }
          ]
        },
        {
          legend: "Endocrine Markers For Thyroid Function",
          elems: [
            {
              name: "TSH (Thyroid Stimulating Hormone)",
              value: "",
              checked: false,
              range: "0.4 – 4.0 mU/L",
              unit: "mU/L"
            },
            {
              name: "FT4 (free thyroxine)",
              value: "",
              checked: false,
              range: "0.7 - 1.9 ng/dL",
              unit: "ng/dL"
            },
            {
              name: "T4 (Thyroxine)",
              value: "",
              checked: false,
              range: "4.6 - 12  ug/dL",
              unit: " ug/dL"
            },
            {
              name: "T3 (Triiodothyronine)",
              value: "",
              checked: false,
              range: "80 - 180 ng/dL",
              unit: "ng/dL"
            }
          ]
        }
      ]
    };
  },
  mounted: function() {
    this.doctor = new Doctor();
  },
  methods: {
    addToBlockchain: async function() {
      this.loading = 1;

      for (let i of this.analysis) {
        for (let j of i.elems) {
          if (j.checked && j.value != "") {
            this.myJson.medicalData.push({
              name: j.name,
              value: j.value
            });
          }
        }
      }
      this.myJson.additionalInfo = this.additionalInfo;
      this.myJson.doctor = this.doctor.doctorName;
      this.myJson.data = new Date().getTime();

      var stringData = JSON.stringify(this.myJson);
      this.simpleCrypto = new SimpleCrypto(this.key);
      this.encrypt = this.simpleCrypto.encrypt(stringData);
      console.log(this.encrypt);

      await this.doctor.addMedicalData(this.encrypt);
      this.loading = 0;
      this.show = 1;
      this.clearAll();
    },

    handleModal: function(){
      if(this.key.length != 64){
        this.invalidKey = true;
      }
      else{
        this.invalidKey = false;
        this.showModal = false;
        this.addToBlockchain();
      }
    },

    clearAll: async function() {
      for (let i of this.analysis) {
        for (let j of i.elems) {
          j.checked = false;
          j.value = "";
        }
      }
      this.additionalInfo = "";
    }
  },
  computed: {
    separeArray: function() {
      let who = -1;
      let arr1 = [];
      let arr2 = [];
      for (let i in this.analysis) {
        for (let j in this.analysis[i].elems) {
          if (this.analysis[i].elems[j].checked) {
            who = who * -1;
            if (who > 0) {
              arr1.push([i, j]);
            } else {
              arr2.push([i, j]);
            }
          }
        }
      }
      return [arr1, arr2];
    }
  }
};
</script>

<style scoped>
fieldset {
  border: 1px solid lightgray !important;
  padding: 0 1.4em 1.4em 1.4em !important;
  border-radius: 5px;
  margin: 30px !important;
  -webkit-box-shadow: 0px 0px 0px 0px #000;
  box-shadow: 0px 0px 0px 0px #000;
  width: 450px;
  background-color: whitesmoke;
}
legend {
  font-size: 1.2em !important;
  font-weight: normal !important;
  font-weight: 900;
  text-align: left !important;
  width: auto;
  padding: 0 10px;
  border-bottom: none;
}

.my-h3 {
  text-align: center;
  margin-top: 15px;
}

.parent-flex {
  display: flex;
  /* justify-content: space-between; */
  justify-content: space-around;
}

.chield-flex {
}

.complete-analysis {
  margin: 30px !important;
}

.central-button {
  margin-left: 275px;
  margin-top: 35px;
  margin-bottom: 30px;
  width: 50%;
  font-weight: bold;
}

.range-data {
  font-size: 12px;
  margin-top: -17px;
  margin-bottom: 10px;
  border: 1px lightgray solid;
  border-top: none;
  border-radius: 5px;
  width: 200px;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>