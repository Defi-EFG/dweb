<template>
  <v-card class="mx-auto sl-card" dark>
    <v-toolbar class="sl-header" flat dense>
      <v-toolbar-title>
        <v-icon class="head-icon">mdi-database</v-icon>
        <span>{{ $t('views.stakingpage.stakinglist') }}</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <v-card v-for="(token, index) in tokenList" :key="index" class="staking-token selected">
        <v-row>
          <v-col cols="auto" class="token d-flex">
            <img src="@/assets/efg_logo.svg" />
            <span>{{ token.currency.name }}</span>
          </v-col>
          <v-col class="reward">
            <small>{{ $t('views.stakingpage.total_staking') }}</small>
            <div class="value">
              {{ token.amount | numberWithCommas({ fixed: [0, 8] }) }} {{ token.currency.name }}
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CurrencyInfo } from '@/types/currency'

@Component({})
export default class StakingList extends Vue {
  @Prop({ default: 0 }) readonly stakingAmount!: number
  @Prop({ default: {} }) readonly stakingCurrency!: CurrencyInfo

  selected = false

  get tokenList() {
    if (!this.stakingCurrency.name) return []

    return [
      {
        currency: this.stakingCurrency,
        amount: this.stakingAmount
      }
    ]
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
