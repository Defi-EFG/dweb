<template>
  <div id="nav">
    <v-card width="219" class="drawer-container">
      <v-navigation-drawer class="defi-drawer" dark floating permanent>
        <v-list nav dense>
          <v-list-item-group v-model="item" color="primary">
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              @click="$router.push(`/defi/${item.text}`)"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class DefiNav extends Vue {
  item = 0
  items = [
    { text: 'wallet', icon: 'mdi-folder' },
    { text: 'lending', icon: 'mdi-account-multiple' },
    { text: 'staking', icon: 'mdi-star' }
  ]
}
</script>

<style lang="scss" scoped>
#nav {
  display: flex;
  min-height: 80vh;
  padding-top: 12px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #b942a9;
    }
  }
}

.drawer-container {
  border-radius: 8px !important;
}

.defi-drawer {
  text-transform: capitalize;
  padding-top: 1.5rem;
  background: transparent linear-gradient(180deg, #2b3043 0%, #333848 100%) 0% 0% no-repeat
    padding-box;
  border-radius: 5px !important;

  .v-list-item__icon {
    padding: 0.8rem 0 0.8rem 2rem;
    margin-right: 10px !important;
  }

  .v-item--active {
    // background: rgba(255, 255, 255, 0.1) !important;
    .v-list-item__icon {
      color: #c074f9 !important;
    }

    .v-list-item__content {
      color: #c074f9 !important;
    }
  }

  .v-list-item--link:before {
    background-color: #ffffff47;
  }
}
</style>
