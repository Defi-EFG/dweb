import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import defiRoutes from './defi'
import homeRoutes from './home'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [...homeRoutes]//, ...defiRoutes]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
