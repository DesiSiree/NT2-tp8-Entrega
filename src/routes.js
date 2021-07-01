import Vue from 'vue'
import VueRouter from 'vue-router'
import http from './componentes/http.vue'
import ApiRestFull from './componentes/ApiRestFull.vue'


Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', redirect: '/apirestfull' },
        { path: '/http', component: http },
        { path: '/apirestfull', component: ApiRestFull}



    ]
})