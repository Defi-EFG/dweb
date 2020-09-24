<template>
  <v-card dark class="lending-card">
    <v-tabs grow background-color="#252B3D" class="lending-tabs" :hide-slider="true" show-arrows>
      <v-tab>My Collateral</v-tab>
      <v-tab>My borrowing</v-tab>
      <v-tab>My Activity</v-tab>

      <v-tab-item>
        <v-card dark color="#2e3344">
          <v-card-text>
            <div class="supply-header">
              <div>Assets</div>
              <div>Balance</div>
            </div>
            <div class="supply-item" v-for="(item, index) in myCollateral" :key="index">
              <div class="assets">
                <img src="@/assets/efg_logo.svg" />
                <span>{{ item.token }}</span>
              </div>
              <div class="balance">
                <div>${{ item.balance.toFixed(2) }}</div>
                <small>≈{{ item.estimated.toFixed(1) }} {{ item.token }}</small>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card dark color="#2e3344">
          <v-card-text>
            <div class="borrow-header">
              <div class="mr-3">Assets</div>
              <div>APY</div>
              <div>Balance</div>
            </div>
            <div class="borrow-item" v-for="(item, index) in myBorrowing" :key="index">
              <div class="assets">
                <img src="@/assets/efg_logo.svg" />
                <span>{{ item.token }}</span>
              </div>
              <div class="apy">
                <span>{{ item.apy }}%</span>
              </div>
              <div class="balance">
                <div>${{ item.balance.toFixed(2) }}</div>
                <small>≈{{ item.estimated.toFixed(1) }} {{ item.token }}</small>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card dark color="#2e3344">
          <v-list color="#222738" class="activity-list">
            <v-list-item v-for="(act, index) in myActivity" :key="index" class="activity-item">
              <v-icon class="mr-3">{{ activityIcon[act.type] }}</v-icon>

              <v-list-item-content>
                <v-list-item-title class="activity-type">
                  <span v-if="act.type == 'activated'">{{ act.token }} Collateral Activated</span>
                  <span v-else>{{ act.type }} ({{ act.token }})</span>
                  <v-spacer></v-spacer>
                  <span v-if="act.type != 'activated'">${{ act.value.toFixed(2) }}</span>
                </v-list-item-title>
                <div class="activity-date">
                  <small>{{ act.time }}</small>
                  <v-spacer></v-spacer>
                  <small
                    v-if="act.type != 'activated'"
                  >≈{{ act.estimated.toFixed(2) }} {{ act.token }}</small>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class LendingActivity extends Vue {
  activityIcon = {
    borrow: 'mdi-transfer-up',
    supply: 'mdi-transfer-down',
    activated: 'mdi-circle-slice-8'
  }

  myCollateral = [
    {
      token: 'ECOC',
      balance: 1000,
      estimated: 500
    },
    {
      token: 'ECOC',
      balance: 1000,
      estimated: 500
    }
  ]

  myBorrowing = [
    {
      token: 'EFG',
      apy: 2.9,
      balance: 200,
      estimated: 200
    }
  ]

  myActivity = [
    {
      type: 'borrow',
      token: 'EFG',
      time: '2020-06-15 03:04:56',
      value: 200,
      estimated: 100
    },
    {
      type: 'supply',
      token: 'ECOC',
      time: '2020-06-15 02:56:41',
      value: 1000,
      estimated: 500
    },
    {
      type: 'activated',
      token: 'ECOC',
      time: '2020-06-15 02:56:41'
    }
  ]
}
</script>

<style lang="scss" scoped>
.lending-card {
  background: #252b3d;
}

.borrow-header,
.supply-header {
  display: flex;
  justify-content: space-between;
  padding: 4px 1rem 1rem 1rem;
}

.borrow-item,
.supply-item {
  padding: 0.45rem 1rem;
  background: rgba(255, 255, 255, 0.071);
  border-radius: 6px;
  display: flex;
  color: white;
  justify-content: space-between;
  margin-bottom: 0.5rem;

  .assets {
    display: flex;
    place-items: center;

    img {
      width: 23px;
      margin-left: 0.5rem;
      margin-right: 1rem;
    }
  }

  .balance {
    text-align: right;
    small {
      opacity: 0.5;
    }
  }

  .apy {
    margin: auto;
  }
}

.borrow-item:nth-last-child(1),
.supply-item:nth-last-child(1) {
  margin-bottom: 0;
}

.activity-list {
  background: #2e3344 !important;
  height: 154px;
  overflow: auto;

  .activity-item {
    border-bottom: 1px solid rgba(255, 255, 255, 0.105);
    margin-bottom: 8px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 5px;
  }

  .activity-item:nth-last-child(1) {
    border-bottom: 0;
  }

  .activity-type {
    color: white;
    display: flex;
    text-transform: capitalize;
  }

  .activity-date {
    color: white;
    display: flex;
    opacity: 0.6;
  }
}
</style>

<style lang="scss">
.lending-tabs {
  .v-card__text {
    height: 154px;
    overflow: auto;
  }

  .v-tabs-items {
    background-color: transparent !important;
  }

  .v-tab--active {
    background: #2e3344 !important;
  }
}
</style>
