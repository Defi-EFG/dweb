<template>
  <v-card class="mx-auto" dark color="#222738">
    <v-toolbar class="reward-history-head" flat dense>
      <v-toolbar-title>
        <v-icon class="mr-2">mdi-star</v-icon>
        <span>Reward History</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-card-text class="wrapper">
      <div class="history-items" v-for="(item, index) in rewardHistory" :key="index">
        <div class="token">
          <img src="@/assets/delay.svg" />
          <span>{{ item.token}}</span>
        </div>
        <div class="time">{{ item.timestamp }}</div>
        <div class="value">{{ item.value }} {{ item.token }}</div>
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
}

.history-items {
  display: flex;
  padding: 1rem;
  background: #363a4a7e;
  border-radius: 5px;
  justify-content: space-between;
  align-items: center;
  color: white;
  margin-bottom: 0.5rem;

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