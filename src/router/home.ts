import { RouteConfig } from 'vue-router'
import HomeIndex from '@/views/home/Index.vue'
import MainPage from '@/views/home/Main.vue'
import AboutPage from '@/views/home/About.vue'
import MarketPage from '@/views/home/Markets.vue'
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
        path: 'about',
        name: 'home-about',
        component: AboutPage
      },
      {
        path: 'markets',
        name: 'home-markets',
        component: MarketPage
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
