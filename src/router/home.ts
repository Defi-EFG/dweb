import { RouteConfig } from 'vue-router'
import HomeIndex from '@/views/home/Index.vue'
import MainPage from '@/views/home/Main.vue'
import Delay from '@/views/home/Delay.vue'
import Efg from '@/views/home/Efg.vue'
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
        component: MainPage
      },
      {
        path: 'Delay',
        name: 'home-Delay',
        component: Delay
      },
      {
        path: 'Efg',
        name: 'home-Efg',
        component: Efg
      },
      {
        path: 'docs',
        name: 'home-docs',
        component: DocsPage
      },
      {
        path: 'whitepaper',
        name: 'home-whitepaper',
        component: WhitePaper
      }
    ]
  }
]

export default homeRoutes
