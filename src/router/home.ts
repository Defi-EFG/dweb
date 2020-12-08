import { RouteConfig } from 'vue-router'
import HomeIndex from '@/views/home/Index.vue'

const MainPage = () => import(/* webpackChunkName: "group-home-main" */ '@/views/home/Main.vue')
const Gpt = () => import(/* webpackChunkName: "group-home" */ '@/views/home/Gpt.vue')
const Efg = () => import(/* webpackChunkName: "group-home" */ '@/views/home/Efg.vue')
const Collateral = () => import(/* webpackChunkName: "group-home" */ '@/views/home/Collateral.vue')
const DocsPage = () => import(/* webpackChunkName: "group-home" */ '@/views/home/Docs.vue')
const WhitePaper = () => import(/* webpackChunkName: "group-home" */ '@/views/home/Whitepaper.vue')

const homeRoutes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeIndex,
    redirect: { name: 'home-main' },
    children: [
      {
        path: '',
        name: 'home-main',
        component: MainPage,
        meta: {
          title: 'Home - EFG'
        }
      },
      {
        path: 'docs',
        name: 'home-docs',
        component: DocsPage,
        meta: {
          title: 'Documents - EFG'
        }
      },
      {
        path: 'whitepaper',
        name: 'home-whitepaper',
        component: WhitePaper,
        meta: {
          title: 'Whitepaper - EFG'
        }
      },
      {
        path: 'staking-info',
        name: 'home-staking',
        component: Gpt,
        meta: {
          title: 'Gpt Details - EFG'
        }
      },
      {
        path: 'loan-info',
        name: 'home-loan',
        component: Efg,
        meta: {
          title: 'EFG Details - EFG'
        }
      },
      {
        path: 'Collateral-info',
        name: 'home-Collateral',
        component: Collateral,
        meta: {
          title: 'EFG Collateral - Collateral'
        }
      }
    ]
  }
]

export default homeRoutes
