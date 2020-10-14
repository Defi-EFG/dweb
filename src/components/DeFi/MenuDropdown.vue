<template>
  <div class="menu-dropdown">
    <v-select
      :menu-props="{ 'content-class': 'blurry-bg' }"
      :items="items"
      v-model="currentPage"
      @change="menuSelect"
      :hide-details="true"
      solo
    >
      <template v-slot:item="data">
        <img class="page-icon" :src="data.item.icon" />
        <span class="page-text">{{ data.item.page }}</span>
      </template>

      <template v-slot:selection="data">
        <img class="page-icon" :src="data.item.icon" />
        <span class="page-text">{{ data.item.page }}</span>
      </template>
    </v-select>
    <v-divider dark class="mt-3"></v-divider>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({})
export default class MenuDropdown extends Vue {
  activePage = 0
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

  currentPage: any = this.items[0]

  mounted() {
    const currentMenu = this.getCurrentPageMenu(this.pageParams)
    this.activePage = this.items.findIndex(item => item.page === currentMenu)
    this.currentPage = this.items[this.activePage]
  }

  menuSelect(item: any) {
    this.$router.push(`/defi/${item.page}`)
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
.v-select-list::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.2) !important;
  background: inherit !important;
}

.v-select-list {
  background: inherit !important;
}

.page-icon {
  width: 23px;
  margin-right: 0.5rem;
}

.page-text {
  color: white;
  text-transform: capitalize;
}
</style>

<style lang="scss">
.blurry-bg {
  -webkit-backdrop-filter: blur(12px); /* Safari 9+ */
  backdrop-filter: blur(12px);
  padding: 0 1rem;

  .v-list {
    .primary--text {
      color: transparent !important;
      caret-color: transparent !important;
    }
  }

  .v-list-item {
    border-bottom: 1px solid rgba(255, 255, 255, 0.125);
  }

  .v-list-item:nth-last-child(1) {
    border-bottom: 0;
  }

  .v-list-item:hover {
    background: rgba(159, 159, 159, 0.434);
    transition: 0.3s;
  }
}

.menu-dropdown {
  width: -webkit-fill-available;
  margin-bottom: 0.75rem;

  .v-input__slot::before {
    content: '' !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.2) !important;
  }

  .v-input__slot {
    background: rgb(56, 61, 80) !important;
    // background: inherit !important;
  }

  .v-input__append-inner {
    .v-input__icon {
      .v-icon {
        color: white !important;
      }
    }
  }
}
</style>
