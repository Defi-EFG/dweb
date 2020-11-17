<template>
  <v-card dark class="side-navbar">
    <v-card-text class="inner-nav">
      <div v-for="(item, index) in items" :key="index">
        <div
          class="defi-menu"
          @click="menuSelect(index)"
          :class="{ selected: index === activePage }"
        >
          <img :src="index === activePage ? item.iconClicked : item.icon" alt="" />
          <div class="menu_width">{{ item.title }}</div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class DefiNav extends Vue {
  item = 0
  activePage = 0

  get items() {
    return [
      {
        title: this.$t('views.wallet'),
        page: 'wallet',
        icon: require('@/assets/icon/wallet-w.svg'),
        iconClicked: require('@/assets/icon/wallet.svg')
      },
      {
        title: this.$t('views.lending'),
        page: 'lending',
        icon: require('@/assets/icon/lending-w.svg'),
        iconClicked: require('@/assets/icon/lending.svg')
      },
      {
        title: this.$t('views.staking'),
        page: 'staking',
        icon: require('@/assets/icon/staking-w.svg'),
        iconClicked: require('@/assets/icon/staking.svg')
      }
    ]
  }

  mounted() {
    const currentMenu = this.getCurrentPageMenu(this.pageParams)
    this.activePage = this.items.findIndex(item => item.page === currentMenu)
  }

  menuSelect(index: number) {
    if (index !== this.activePage) {
      this.activePage = index
      this.$router.push(`/defi/${this.items[index].page}`)
    }
  }

  getCurrentPageMenu(path: string) {
    // take slash off
    return path.substring('/defi'.length + 1)
  }

  get pageParams() {
    return this.$router.currentRoute.path
  }
}
</script>

<style lang="scss" scoped>
.side-navbar {
  background: transparent linear-gradient(180deg, #2b3043 0%, #333848 100%) 0% 0% no-repeat
    padding-box;

  margin-right: 12px;

  .inner-nav {
    padding: 1.7rem 0.5rem 1rem;
  }
}

.menu_width {
  width: 57px;
}
.defi-menu {
  display: flex;
  padding: 0.75rem 2.4rem;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: 5px;
  text-transform: capitalize;
  align-items: center;
  img {
    margin-right: 8px;
    width: 22px;
  }
}

.defi-menu:hover {
  background: #353848;
}

.selected {
  background: #353848 !important;
  color: #c074f9;
}
</style>
