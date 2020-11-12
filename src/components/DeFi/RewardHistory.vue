<template>
  <v-card class="mx-auto history-container" dark color="#222738">
    <v-toolbar class="reward-history-head" flat dense>
      <v-toolbar-title>
        <v-icon class="head-icon">mdi-star</v-icon>
        <span>{{ $t('views.stakingpage.rewardhistory') }}</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-card-text class="wrapper" v-if="rewardList.length > 0">
      <div class="history-items" v-for="(item, index) in rewardList" :key="index">
        <v-row>
          <v-col class="ma-auto token-col">
            <div class="token">
              <img src="@/assets/gpt.svg" />
              <span>{{ rewardCurrencyName }}</span>
            </div>
          </v-col>
          <v-col cols="auto" class="time-col">
            <div class="time">
              <div class="remain">{{ getTime(item.timestamp).remain }}</div>
              <small class="timestamp">{{ getTime(item.timestamp).timestamp }}</small>
            </div>
          </v-col>
          <v-col class="ma-auto value-col">
            <div class="value">{{ item.amount }} {{ rewardCurrencyName }}</div>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
    <v-card-text class="empty-wrapper">
      <div class="inner">
        <v-icon large>mdi-history</v-icon>
        <div>No Reward history</div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import moment from 'moment'
import { RewardHistory as Rewardlist } from '@/types/staking'

@Component({})
export default class RewardHistory extends Vue {
  @Prop({ default: [] }) readonly rewardList!: Rewardlist
  @Prop({ default: '###' }) readonly rewardCurrencyName!: string

  getTime(timestamp: number) {
    if (timestamp) {
      const timeMsg = moment(timestamp * 1000)
        .startOf('minute')
        .fromNow()

      return {
        remain: timeMsg,
        timestamp: moment(timestamp * 1000).format('YYYY-MM-DD HH:mm')
      }
    }

    return { remain: '', timestamp }
  }
}
</script>

<style lang="scss" scoped>
.history-container {
  width: inherit;
}

.reward-history-head {
  background: transparent linear-gradient(180deg, #2b3043 0%, #333848 100%) 0% 0% no-repeat
    padding-box;

  span {
    font-size: 16px;
  }

  .head-icon {
    margin-right: 0.5rem;
    font-size: 20px;
  }
}

.wrapper {
  height: 482px;
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

.history-items {
  // display: flex;
  padding: 3px;
  background: #363a4a7e;
  border-radius: 5px;
  // justify-content: space-between;
  align-items: center;
  color: white;
  margin-bottom: 0.5rem;

  .row {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }

  .token {
    display: flex;
    align-items: center;
    img {
      width: 28px;
      margin-right: 0.5rem;
    }

    span {
      text-transform: uppercase;
    }
  }

  .time {
    text-align: center;

    .remain {
      margin-bottom: -6px;
    }
  }

  .timestamp {
    opacity: 0.5;
  }

  .value {
    text-align: right;
  }
}

.history-items:nth-last-child(1) {
  margin-bottom: 0;
}

.empty-wrapper {
  display: flex;
  height: 100%;
  text-align: center;

  .inner {
    margin: auto;
    opacity: 0.4;
  }
}

@media (max-width: 425px) {
  .time-col {
    display: none;
  }

  .value-col {
    text-align: right;
  }
}
</style>
