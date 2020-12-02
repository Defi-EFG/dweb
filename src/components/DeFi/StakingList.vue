<template>
  <v-card class="mx-auto sl-card" dark>
    <v-toolbar class="sl-header" flat dense>
      <v-toolbar-title>
        <v-icon class="head-icon">table_rows</v-icon>
        <span>{{ $t('views.stakingpage.stakinglist') }}</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-card-text class="sl-list-wrapper">
      <v-card
        v-for="(token, index) in stakingList"
        :key="index"
        class="staking-token"
        :class="token.status ? 'selected' : ''"
        @click="selectStaking(token, index)"
      >
        <v-row :class="index === activeIndex ? 'clicked' : ''">
          <v-col cols="auto" class="token d-flex">
            <img src="@/assets/efg_logo.svg" alt="" />
            <span>{{ token.currency.name }}</span>
          </v-col>
          <v-col class="reward">
            <template v-if="isPendingTx(token.pendingId)">
              <div class="pending-status">
                <v-progress-circular
                  color="white"
                  :width="2"
                  :size="18"
                  indeterminate
                ></v-progress-circular>
                <div class="d-inline type ml-2">
                  <span v-if="!!onPendingRewardWithdraw(token.pendingId)">Withdrawing</span>
                  <span v-else-if="!!onPendingStop">Stopping</span>
                  <span v-else-if="!!onPendingDeposit">Depositing</span>
                </div>
              </div>
            </template>
            <template v-else>
              <small>{{ $t('views.stakingpage.total_staking') }}</small>
              <div class="value">
                {{ token.staking | numberWithCommas({ fixed: [0, 8] }) }} {{ token.currency.name }}
              </div>
            </template>
          </v-col>
        </v-row>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { StakingInfo } from '@/types/staking'
import { getModule } from 'vuex-module-decorators'
import * as constants from '@/constants'
import WalletModule from '@/store/wallet'

@Component({})
export default class StakingList extends Vue {
  @Prop() stakingList!: StakingInfo[]

  walletStore = getModule(WalletModule)

  activeIndex = 0

  isPendingTx(id: any) {
    if (id) {
      return !!this.onPendingRewardWithdraw(id)
    }
    return !!this.onPendingDeposit || !!this.onPendingStop
  }

  get onPendingDeposit() {
    return this.walletStore.pendingTransactions.find(tx => {
      return tx.actionType === constants.ACTION_DEPOSIT && tx.status === constants.STATUS_PENDING
    })
  }

  get onPendingStop() {
    return this.walletStore.pendingTransactions.find(tx => {
      return tx.actionType === constants.ACTION_STOP && tx.status === constants.STATUS_PENDING
    })
  }

  onPendingRewardWithdraw(stakeId: any) {
    return this.walletStore.pendingTransactions.find(tx => {
      return (
        tx.actionType === constants.ACTION_REWARD &&
        tx.status === constants.STATUS_PENDING &&
        tx.stakingId == stakeId
      )
    })
  }

  selectStaking(token: StakingInfo, index: number) {
    this.activeIndex = index
    this.$emit('selectStaking', token)
  }
}
</script>

<style lang="scss" scoped>
.sl-header {
  background: transparent linear-gradient(180deg, #2b3043 0%, #333848 100%) 0% 0% no-repeat
    padding-box;

  span {
    font-size: 16px;
  }

  .head-icon {
    font-size: 20px;
    margin-right: 0.5rem;
  }
}

.sl-card {
  width: inherit;
  min-height: 247px;
  background: #222738;
}

.sl-list-wrapper {
  max-height: 210px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ffffff41;
    border-radius: 6px;
  }
}

.staking-token {
  width: -webkit-fill-available;
  background: #2e3345;
  box-shadow: none !important;
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
  border: none;
  transition: 0.5s;
}

.clicked {
  box-shadow: 0px 6px 5px 0px #0000004d;
}

.pending-status {
  width: fit-content;
  margin-left: auto;
  border: 1px solid white;
  padding: 11px;
  border-radius: 6px;

  .type {
    color: white;
  }
}

@media (max-width: 1264px) {
  .sl-card {
    min-height: unset;
  }
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
