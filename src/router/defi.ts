import { RouteConfig } from 'vue-router'
import DefiIndex from '@/views/defi/Index.vue'
import DefiWalletPage from '@/views/defi/wallet/Index.vue'
import DefiStakingPage from '@/views/defi/staking/Index.vue'
import DefiLendingPage from '@/views/defi/lending/Index.vue'

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
