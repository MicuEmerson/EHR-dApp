import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import PersonInfo from './components/personComponents/PersonInfo.vue'
import PersonDoctorsAccess from './components/personComponents/PersonDoctorsAccess.vue'
import PersonMedicalData from './components/personComponents/PersonMedicalData.vue'
import DoctorPersonInfo from './components/doctorComponents/DoctorPersonInfo.vue'
import DoctorAddData from './components/doctorComponents/DoctorAddData.vue'
import DoctorMedicalData from './components/doctorComponents/DoctorMedicalData.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/pacient',
      name: 'pacient',
      component: () => import('./views/Pacient.vue'),
      children: [
        {
          path: '',
          component: PersonInfo
        },
        {
          path: 'medical',
          component: PersonMedicalData
        },
        {
          path: 'doctors',
          component: PersonDoctorsAccess
        }
      ]
    },
    {
      path: '/doctor',
      name: 'doctor',
      component: () => import('./views/Doctor.vue'),
      children: [
        {
          path: '',
          component: DoctorPersonInfo
        },
        {
          path: 'medical',
          component: DoctorMedicalData
        },
        {
          path: 'newdata',
          component: DoctorAddData
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    }
  ]
})
