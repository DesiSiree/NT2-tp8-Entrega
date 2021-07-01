import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";


Vue.use(Vuex)

const urlUsuarios ='https://60c13689b8d3670017556a6d.mockapi.io/usuario/user';
export default new Vuex.Store({
    state: {
       usuarios:[],
    },
    actions: {
       async addUsuario({ commit },usuario){try {
        await axios.post(urlUsuarios, usuario,{'content-type':'application/json'});
        commit('addUsuario',usuario)  
       } catch (error) {
           alert(error.message)
       }

    },

      async getUsuarios({commit}){
        try {
            const {data} =  await axios.get(urlUsuarios);
            commit('getUsuarios',data)   
        } catch (error) {
            alert(error.message)
        }
      
    }, 
            
    },
    mutations: {
        getUsuarios(state,data) {
        state.usuario = data
        }, 
        addUsuario(state,data){
        state.personas.push(data)
        }
    }
})