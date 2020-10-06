<template>
  <v-card class="mx-auto sl-card" dark>
    <v-toolbar class="sl-header" flat dense>
      <v-toolbar-title>
        <v-icon class="mr-2">mdi-database</v-icon>
        <span>Staking List</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <v-card v-for="(token, index) in tokenList" :key="index" class="staking-token selected">
        <v-row>
          <v-col cols="auto" class="token d-flex">
            <img src="@/assets/efg_logo.svg" />
            <span>{{ token.token }}</span>
          </v-col>
          <v-col class="reward">
            <small>Total Staked Reward</small>
            <div class="value">{{ token.value }} {{ token.token }}</div>
          </v-col>
        </v-row>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class StakingList extends Vue {
  selected = false

  tokenList = [
    {
      token: 'DELAY',
      value: '5.16349650'
    }
  ]
}
</script>

<style lang="scss" scoped>
.sl-header {
  background: transparent linear-gradient(180deg, #2b3043 0%, #333848 100%) 0% 0% no-repeat
    padding-box;

  span {
    font-size: 18px;
  }
}

.sl-card {
  width: inherit;
  background: #222738;
}

.staking-token {
  width: -webkit-fill-available;
  background: transparent;
  box-shadow: none !important;
  border: 1px solid #ffffff12;
  cursor: pointer;
  padding: 6px;
  margin-bottom: 0.5rem;

  .token {
    align-self: baseline;

    img {
      width: 18px;
      margin-right: 6px;
    }

    span {
      text-transform: uppercase;
    }
  }

  .reward {
    text-align: right;

    .value {
      font-size: large;
      text-transform: uppercase;
    }
  }
}

.selected {
  background: linear-gradient(90deg, #8a40d6 0%, #6800fe 100%);
  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 12px 17px 2px rgba(0, 0, 0, 0.14),
    0 5px 22px 4px rgba(0, 0, 0, 0.12) !important;

  border: none;
  transition: 0.5s;
}
</style>

<style lang="scss">
.staking-token {
  .row {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>