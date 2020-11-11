import { RouteConfig } from 'vue-router'
import HomeIndex from '@/views/home/Index.vue'
import MainPage from '@/views/home/Main.vue'
import Gpt from '@/views/home/Gpt.vue'
import Efg from '@/views/home/Efg.vue'
import Collateral from '@/views/home/Collateral.vue'
import DocsPage from '@/views/home/Docs.vue'
import WhitePaper from '@/views/home/Whitepaper.vue'

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
