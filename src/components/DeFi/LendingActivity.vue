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
                <img :src="item.currency.style.icon" />
                <span>{{ item.currency.name }}</span>
              </div>
              <div class="balance">
                <div>${{ getEstimatedValue(item.amount, item.price).toFixed(2) }}</div>
                <small>≈{{ item.amount.toFixed(2) }} {{ item.currency.name }}</small>
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
              <div>Inrerest Rate</div>
              <div>Balance</div>
            </div>
            <div class="borrow-item" v-for="(item, index) in myBorrowing" :key="index">
              <div class="assets">
                <img :src="item.currency.style.icon" />
                <span>{{ item.currency.name }}</span>
              </div>
              <div class="apy">
                <span>{{ item.interestRate }}%</span>
              </div>
              <div class="balance">
                <div>${{ getEstimatedValue(item.amount, item.exchangeRate).toFixed(2) }}</div>
                <small>≈{{ item.amount.toFixed(2) }} {{ item.currency.name }}</small>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card dark color="#2e3344">
          <v-list color="#222738" class="activity-list">
            <v-list-item v-for="(act, index) in myActivity" :key="index" class="activity-item">
              <v-icon class="mr-3">{{ activityIcon[act.activityName] }}</v-icon>

              <v-list-item-content>
                <v-list-item-title class="activity-type">
                  <span v-if="act.activityName == 'activated'"
                    >{{ act.currencyName }} Collateral Activated</span
                  >
                  <span v-else>{{ act.activityName }} ({{ act.currencyName }})</span>
                  <v-spacer></v-spacer>
                  <span v-if="act.activityName != 'activated'"
                    >${{ getEstimatedValue(act.amount, act.price).toFixed(2) }}</span
                  >
                </v-list-item-title>
                <div class="activity-date">
                  <small>{{ getTime(act.timestamp) }}</small>
                  <v-spacer></v-spacer>
                  <small v-if="act.activityName != 'activated'"
                    >≈{{ act.amount.toFixed(2) }} {{ act.currencyName }}</small
                  >
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
import { getModule } from 'vuex-module-decorators'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import LendingModule from '@/store/lending'

@Component({})
export default class LendingActivity extends Vue {
  lendingStore = getModule(LendingModule)

  activityIcon = {
    borrow: 'mdi-transfer-up',
    deposit: 'mdi-transfer-down',
    activated: 'mdi-circle-slice-8'
  }

  get myCollateral() {
    return this.lendingStore.myCollateralAssets
  }

  get myBorrowing() {
    return this.lendingStore.myBorrowing
  }

  get myActivity() {
    return this.lendingStore.myActivity
  }

  getEstimatedValue(amount: number, price: number) {
    if (!price) return 0
    return new BigNumber(amount).multipliedBy(new BigNumber(price))
  }

  getTime(timestamp: number) {
    if (timestamp) {
      // const timeMsg = moment(timestamp * 1000)
      //   .startOf('minute')
      //   .fromNow()

      return `${moment(timestamp * 1000).format('YYYY-MM-DD HH:mm')}`
    }

    return timestamp
  }
}
</script>

<style lang="scss" scoped>
.lending-card {
  background: #252b3d;
  width: inherit;
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
      width: 28px;
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
  height: 192px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 6px;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ffffff41;
    border-radius: 6px;
  }

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
    height: 192px;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 6px;
      border-radius: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
      border-radius: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #ffffff41;
      border-radius: 6px;
    }
  }

  .v-tabs-items {
    background-color: transparent !important;
  }

  .v-tab--active {
    background: #2e3344 !important;
  }
}
</style>
