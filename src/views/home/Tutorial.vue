<template>
  <div class="docs">
    <v-container style="max-width:1088px;">
      <v-row>
        <v-col lg="3" md="3" cols="12" style="padding:0px;">
          <section class="sec_doc1" name="doc">
            <div class="headtext">{{ $t('views.tutorial') }}</div>
            <div v-for="(listmenu, index) in listmenus" :key="index" class="sidebar_dc">
              <a
                :href="`#${listmenu.name}`"
                @click="onClickActive(`${listmenu.name}`)"
                :class="active == listmenu.name ? 'active' : undefined"
                >{{ listmenu.name }}
              </a>
            </div>
          </section>
        </v-col>
        <v-col lg="9" md="9" cols="12" style="padding:0px;">
          <section class="sec_doc2" id="Tutorial">
            <div class="tutorial" :id="textid.wallet">
              <div class="docs_head">{{ $t('views.EFG Tutorial') }}</div>
              <div class="head_Introduction">{{ $t('views.ECOC Financial Growth') }}</div>
              <div class="sub_Introduction">{{ $t('views.docsWallet.How to create') }}</div>
              <div class="head_Introduction">{{ $t('views.docsWallet.On this page') }}</div>
              <img src="@/assets/tutorial01.png" alt="" />
              <div class="sub_Introduction">{{ $t('views.docsWallet.Create the Wallet') }}</div>
              <ol>
                <li>{{ $t('views.docsWallet.Create_li1') }}</li>
                <li>{{ $t('views.docsWallet.Create_li2') }}</li>
                <li>{{ $t('views.docsWallet.Create_li3') }}</li>
                <li>{{ $t('views.docsWallet.Create_li4') }}</li>
              </ol>
              <img src="@/assets/tutorial02.png" alt="" />
              <div class="sub_Introduction">{{ $t('views.docsWallet.Connect the Wallet') }}</div>
              <ol>
                <li>{{ $t('views.docsWallet.Connect_li1') }}</li>
                <li>{{ $t('views.docsWallet.Connect_li2') }}</li>
                <li>{{ $t('views.docsWallet.Connect_li3') }}</li>
                <li>{{ $t('views.docsWallet.Connect_li4') }}</li>
                <li>{{ $t('views.docsWallet.Connect_li5') }}</li>
              </ol>
            </div>
            <div :id="textid.deposit" class="tutorial">
              <div class="sub_Introduction">{{ $t('views.docsDeposit.How to Deposit EFG?') }}</div>
              <div class="head_Introduction">{{ $t('views.docsDeposit.This function') }}</div>
              <img src="@/assets/tutorial03.png" alt="" />
              <ol>
                <li>{{ $t('views.docsDeposit.Deposit_step1') }}</li>
                <li>{{ $t('views.docsDeposit.Deposit_step2') }}</li>
              </ol>
            </div>
            <div :id="textid.lending" class="tutorial">
              <div class="sub_Introduction">{{ $t('views.docsDeposit.How to loan EFG?') }}</div>
              <div class="head_Introduction">{{ $t('views.docsDeposit.To start') }}</div>
              <img src="@/assets/tutorial04.png" alt="" />
              <div class="sub_Introduction">{{ $t('views.docsDeposit.DEPOSIT ECOC') }}</div>
              <ol>
                <li>{{ $t('views.docsDeposit.Depositecoc_step1') }}</li>
                <li>{{ $t('views.docsDeposit.Depositecoc_step2') }}</li>
                <li>{{ $t('views.docsDeposit.Depositecoc_step3') }}</li>
              </ol>
              <img src="@/assets/tutorial05.png" alt="" />
              <div class="sub_Introduction">{{ $t('views.docsDeposit.BORROW EFG') }}</div>
              <ol>
                <li>{{ $t('views.docsDeposit.borrow_step1') }}</li>
                <li>{{ $t('views.docsDeposit.borrow_step2') }}</li>
                <li>{{ $t('views.docsDeposit.borrow_step3') }}</li>
              </ol>
              <img src="@/assets/tutorial06.png" alt="" />
              <ol start="4">
                <li>{{ $t('views.docsDeposit.borrow_step4') }}</li>
              </ol>
              <div class="sub_Introduction">{{ $t('views.docsDeposit.How to Repay EFG?') }}</div>
              <img src="@/assets/tutorial07.png" alt="" />
              <ol>
                <li>{{ $t('views.docsDeposit.Repay_step1') }}</li>
                <li>{{ $t('views.docsDeposit.Repay_step2') }}</li>
              </ol>
              <img src="@/assets/tutorial08.png" alt="" />
              <ol start="3">
                <li>{{ $t('views.docsDeposit.Repay_step3') }}</li>
              </ol>
            </div>
            <div :id="textid.withdraw" class="tutorial">
              <div class="sub_Introduction">
                {{ $t('views.docsWithdraw.How to Withdraw EFG') }}
              </div>
              <img src="@/assets/tutorial09.png" alt="" />
              <ol>
                <li>{{ $t('views.docsWithdraw.Withdraw_step1') }}</li>
                <li>{{ $t('views.docsWithdraw.Withdraw_step2') }}</li>
                <li>{{ $t('views.docsWithdraw.Withdraw_step3') }}</li>
              </ol>
            </div>
            <div :id="textid.staking" class="tutorial">
              <div class="sub_Introduction">
                {{ $t('views.docsStaking.How to Staking EFG?') }}
              </div>
              <img src="@/assets/tutorial010.png" alt="" />
              <ol>
                <li>{{ $t('views.docsStaking.Staking_step1') }}</li>
                <li>{{ $t('views.docsStaking.Staking_step2') }}</li>
              </ol>
              <div class="sub_Introduction">
                {{ $t('views.docsStaking.How to Stop Staking?') }}
              </div>
              <img src="@/assets/tutorial011.png" alt="" />
              <ol>
                <li>{{ $t('views.docsStaking.HowtoStaking_step1') }}</li>
                <li>{{ $t('views.docsStaking.HowtoStaking_step2') }}</li>
              </ol>
              <img src="@/assets/tutorial012.png" alt="" />
              <div class="head_Introduction">{{ $t('views.docsStaking.Click the') }}</div>
            </div>
          </section>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class Tutorial extends Vue {
  active = 'Wallet'
  name = ''

  onClickActive(name: string) {
    this.active = name
    this.name = name
  }
  get listmenus() {
    return [
      {
        name: this.$t('views.wallet')
      },
      {
        name: this.$t('views.deposit')
      },
      {
        name: this.$t('views.lending')
      },
      {
        name: this.$t('views.withdraw')
      },
      {
        name: this.$t('views.staking')
      }
    ]
  }
  get msg() {
    return this.$t('views.docs')
  }
  get textid() {
    return this.$t('views')
  }
}
</script>

<style lang="scss">
.v-card__subtitle,
.v-card__text,
.v-card__title {
  padding: 0px !important;
}
</style>
<style scoped lang="scss">
.open {
  display: none;
}
.open_active {
  display: block !important;
}
.active {
  color: #c074f9 !important;
  transition: 0.5s;
}
.docs {
  background: rgb(228, 228, 228);
  background: linear-gradient(90deg, rgba(228, 228, 228, 1) 45%, rgba(237, 237, 237, 1) 45%);
}
.sidebar_dc {
  margin-bottom: 10px;
}
.sidebar_dc a {
  color: #000000;
  text-align: left;
  font: 18px;
  letter-spacing: 0px;
  color: #000000;
  opacity: 1;
}
.sidebar_dc a:hover {
  color: #c074f9;
  transition: 0.5s;
}
.sec_doc1 {
  padding: 150px 50px 100px 50px;
  height: 100%;
  position: fixed;
}
.sec_doc1 .headtext {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
.sec_doc2 {
  background: #ededed;
  padding: 0px 30px 400px 82px;
  height: 100%;
  position: block;
}
.sec_doc2 img {
  width: 100%;
  box-shadow: 0px 0px 20px 1px #cccccc;
  border-radius: 5px;
}

.sec_doc2 .img .docs_head {
  width: 100%;
  margin-bottom: 20px;
  color: #010101;
  font-size: 23px;
  text-transform: uppercase;
  font-weight: bold;
}
.sec_doc2 .head_Introduction {
  font-size: 16px;
  letter-spacing: 0px;
  color: #010101;
  opacity: 1;
  margin-bottom: 30px;
  line-height: 1.2;
  text-align: justify;
}
.sec_doc2 .sub_Introduction {
  font-size: 20px;
  letter-spacing: 0px;
  color: #010101;
  opacity: 1;
  margin-bottom: 10px;
  font-weight: bold;
  line-height: 1.2;
  text-align: justify;
}
.sec_doc2 .head_Introduction span {
  font-weight: 200;
  font-size: 14px;
  letter-spacing: 0px;
  opacity: 1;
  margin-bottom: 5px;
}
.container {
  max-width: 100%;
  padding: 0;
}
.tutorial {
  padding-top: 150px;
}
.tutorial ol {
  margin-bottom: 70px;
}
.tutorial img {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 20px;
}
.sec_doc2 .docs_head {
  width: 100%;
  font-size: 23px;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 5px;
}

.tutorial .head_list {
  font-size: 16px;
  letter-spacing: 0px;
  color: #010101;
  opacity: 1;
  margin-bottom: 20px;
  margin-top: 50px;
  font-weight: bold;
  line-height: 1.2;
  text-align: justify;
}
#Withdrawal .Withdrawal_commect {
  color: red;
}
#Withdrawal .Withdrawal_commect span {
  color: #000000;
}
@media only screen and (max-width: 960px) {
  .tutorial ol {
    margin-bottom: 40px;
  }
  .sec_doc1 .headtext {
    display: inline;
    position: relative;
    margin-right: 10px;
  }
  .sec_doc1 {
    position: fixed;
    width: 100%;
    top: 50px;
    padding: 40px 20px;
    height: 70px;
    background: #ffffff;
  }
  .tutorial {
    padding-top: 180px;
  }
  .sidebar_dc {
    display: inline;
    margin-right: 10px;
  }
  .sec_doc2 {
    padding: 0 20px 50px 20px;
  }
  .container {
    padding: 12px;
  }
  .sec_doc2 .head_Introduction {
    margin-bottom: 20px;
  }
  .sec_doc2 .img img {
    margin-bottom: 20px;
  }
}
@media only screen and (max-width: 500px) {
  .docs {
    background: #ededed;
  }
  .sec_doc1 {
    position: fixed;
    width: 100%;
    top: 50px;
    padding: 40px 20px;
    height: 102px;
    background: #ffffff;
  }
}
</style>
