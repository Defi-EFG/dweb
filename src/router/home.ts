import { RouteConfig } from 'vue-router'
import HomeIndex from '@/views/home/Index.vue'
import MainPage from '@/views/home/Main.vue'
import Delay from '@/views/home/Delay.vue'
import Efg from '@/views/home/Efg.vue'
import DocsPage from '@/views/home/Docs.vue'
import WhitePaper from '@/views/home/Whitepaper.vue'
import Socket from '@/views/home/socket.vue'

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
        path: 'Delay',
        name: 'home-Delay',
        component: Delay,
        meta: {
          title: 'Delay Details - EFG'
        }
      },
      {
        path: 'Efg',
        name: 'home-Efg',
        component: Efg,
        meta: {
          title: 'EFG Details - EFG'
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
      }
    ]
  }
]

export default homeRoutes
