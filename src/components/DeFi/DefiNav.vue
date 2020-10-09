<template>
  <v-card dark class="side-navbar">
    <v-card-text class="inner-nav">
      <div v-for="(item, index) in items" :key="index">
        <div
          class="defi-menu"
          @click="menuSelect(index)"
          :class="{ selected: index === activeItem }"
        >
          <img :src="index === activeItem ? item.iconClicked : item.icon" /> {{ item.page }}
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
  activeItem = -1
  items = [
    {
      page: 'wallet',
      icon: require('@/assets/icon/wallet-w.svg'),
      iconClicked: require('@/assets/icon/wallet.svg')
    },
    {
      page: 'lending',
      icon: require('@/assets/icon/lending-w.svg'),
      iconClicked: require('@/assets/icon/lending.svg')
    },
    {
      page: 'staking',
      icon: require('@/assets/icon/staking-w.svg'),
      iconClicked: require('@/assets/icon/staking.svg')
    }
  ]

  menuSelect(index: number) {
    this.activeItem = index
    this.$router.push(`/defi/${this.items[index].page}`)
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
