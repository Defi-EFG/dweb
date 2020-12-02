import { RouteConfig } from 'vue-router'

const DefiIndex = () => import(/* webpackChunkName: "group-defi" */ '@/views/defi/Index.vue')
const DefiWalletPage = () =>
  import(/* webpackChunkName: "group-defi" */ '@/views/defi/wallet/Index.vue')
const DefiStakingPage = () =>
  import(/* webpackChunkName: "group-defi" */ '@/views/defi/staking/Index.vue')
const DefiLendingPage = () =>
  import(/* webpackChunkName: "group-defi" */ '@/views/defi/lending/Index.vue')

const defiRoutes: Array<RouteConfig> = [
  {
    path: '/defi',
    name: 'defi',
    component: DefiIndex,
    redirect: { name: 'defi-wallet' },
    children: [
      {
        path: 'wallet',
        name: 'defi-wallet',
        meta: {
          title: 'Defi - Wallet'
        },
        component: DefiWalletPage
      },
      {
        path: 'staking',
        name: 'defi-staking',
        meta: {
          title: 'Defi - Staking'
        },
        component: DefiStakingPage
      },
      {
        path: 'lending',
        name: 'defi-lending',
        meta: {
          title: 'Defi - Lending'
        },
        component: DefiLendingPage
      }
    ]
  }
]

export default defiRoutes
