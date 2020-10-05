<template>
  <v-card class="mx-auto history-container" dark color="#222738">
    <v-toolbar class="reward-history-head" flat dense>
      <v-toolbar-title>
        <v-icon class="mr-2">mdi-star</v-icon>
        <span>Reward History</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-card-text class="wrapper">
      <div class="history-items" v-for="(item, index) in rewardHistory" :key="index">
        <v-row>
          <v-col>
            <div class="token">
              <img src="@/assets/delay.svg" />
              <span>{{ item.token }}</span>
            </div>
          </v-col>
          <v-col class="ma-auto">
            <div class="time">{{ item.timestamp }}</div>
          </v-col>
          <v-col class="ma-auto">
            <div class="value">{{ item.value }} {{ item.token }}</div>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class RewardHistory extends Vue {
  rewardHistory = [
    {
      token: 'DELAY',
      timestamp: '2020-09-17 02:56:41',
      value: 0.56
    },
    {
      token: 'DELAY',
      timestamp: '2020-09-17 02:56:41',
      value: 0.56
    },
    {
      token: 'DELAY',
      timestamp: '2020-09-17 02:56:41',
      value: 0.56
    },
    {
      token: 'DELAY',
      timestamp: '2020-09-17 02:56:41',
      value: 0.56
    }
  ]
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
    font-size: 18px;
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
  }

  .value {
    text-align: right;
  }
}

.history-items:nth-last-child(1) {
  margin-bottom: 0;
}
</style>