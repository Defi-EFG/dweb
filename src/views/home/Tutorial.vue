<template>
  <div class="docs">
    <v-container style="max-width:1088px;">
      <v-row>
        <v-col lg="3" md="3" cols="12" style="padding:0px;">
          <section class="sec_doc1" name="doc">
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
            <div :class="`tutorial open ${active == 'Tutorial' ? 'open_active' : undefined}`">
              <div class="docs_head">EFG Tutorial</div>
              <div class="head_Introduction">ECOC Financial Growth</div>
              <div class="head_list">{{ $t('views.step_1') }}</div>
              <img src="@/assets/Artboard_2.png" alt="" />
              <ol>
                <li>{{ $t('views.step1.step1_1') }}</li>
                <li>{{ $t('views.step1.step1_2') }}</li>
                <li>{{ $t('views.step1.step1_3') }}</li>
                <li>{{ $t('views.step1.step1_4') }}</li>
              </ol>
              <div class="head_list">{{ $t('views.step_2') }}</div>
              <img src="@/assets/Artboard_3.png" alt="" />
              <ol>
                <li>{{ $t('views.step2.step2_1') }}</li>
                <li>{{ $t('views.step2.step2_2') }}.</li>
                <li>{{ $t('views.step2.step2_3') }}</li>
                <li>{{ $t('views.step2.step2_4') }}</li>
                <li>{{ $t('views.step2.step2_5') }}</li>
              </ol>
              <div class="head_list">
                <li>{{ $t('views.How_to_Deposit') }}</li>
              </div>
              <img src="@/assets/Artboard_4.png" alt="" />
              <ol>
                <li>{{ $t('views.step3.step3_1') }}</li>
                <li>{{ $t('views.step3.step3_2') }}</li>
                <li>{{ $t('views.step3.step3_3') }}</li>
                <li>{{ $t('views.step3.step3_4') }}</li>
              </ol>
              <div class="head_list">{{ $t('views.How_to_Staking') }}</div>
              <img src="@/assets/Artboard_5.png" alt="" />
              <ol>
                <li>{{ $t('views.step4.step4_1') }}</li>
                <li>{{ $t('views.step4.step4_2') }}</li>
              </ol>
            </div>
            <div
              id="Deposit"
              :class="`tutorial divmargin open ${active == 'Deposit' ? 'open_active' : undefined}`"
            >
              <div class="docs_head">EFG Deposit</div>
              <div class="head_Introduction">ECOC Financial Growth</div>
              <div class="head_list">{{ $t('views.step_1') }}</div>
              <img src="@/assets/Artboard_2.png" alt="" />
              <ol>
                <li>{{ $t('views.step1.step1_1') }}</li>
                <li>{{ $t('views.step1.step1_2') }}</li>
                <li>{{ $t('views.step1.step1_3') }}</li>
                <li>{{ $t('views.step1.step1_4') }}</li>
              </ol>
              <div class="head_list">{{ $t('views.step_2') }}</div>
              <img src="@/assets/Artboard_3.png" alt="" />
              <ol>
                <li>{{ $t('views.step2.step2_1') }}</li>
                <li>{{ $t('views.step2.step2_2') }}.</li>
                <li>{{ $t('views.step2.step2_3') }}</li>
                <li>{{ $t('views.step2.step2_4') }}</li>
                <li>{{ $t('views.step2.step2_5') }}</li>
              </ol>
              <div class="head_list">
                <li>{{ $t('views.How_to_Deposit') }}</li>
              </div>
              <img src="@/assets/Artboard_4.png" alt="" />
              <ol>
                <li>{{ $t('views.step3.step3_1') }}</li>
                <li>{{ $t('views.step3.step3_2') }}</li>
                <li>{{ $t('views.step3.step3_3') }}</li>
                <li>{{ $t('views.step3.step3_4') }}</li>
              </ol>
              <div class="head_list">{{ $t('views.How_to_Staking') }}</div>
              <img src="@/assets/Artboard_5.png" alt="" />
              <ol>
                <li>{{ $t('views.step4.step4_1') }}</li>
                <li>{{ $t('views.step4.step4_2') }}</li>
              </ol>
            </div>
            <div
              id="Wallet"
              :class="`tutorial divmargin open ${active == 'Wallet' ? 'open_active' : undefined}`"
            >
              <div class="docs_head">EFG Wallet</div>
              <div class="head_Introduction">ECOC Financial Growth</div>
              <div class="head_list">{{ $t('views.step_1') }}</div>
              <img src="@/assets/Artboard_2.png" alt="" />
              <ol>
                <li>{{ $t('views.step1.step1_1') }}</li>
                <li>{{ $t('views.step1.step1_2') }}</li>
                <li>{{ $t('views.step1.step1_3') }}</li>
                <li>{{ $t('views.step1.step1_4') }}</li>
              </ol>
              <div class="head_list">{{ $t('views.step_2') }}</div>
              <img src="@/assets/Artboard_3.png" alt="" />
              <ol>
                <li>{{ $t('views.step2.step2_1') }}</li>
                <li>{{ $t('views.step2.step2_2') }}.</li>
                <li>{{ $t('views.step2.step2_3') }}</li>
                <li>{{ $t('views.step2.step2_4') }}</li>
                <li>{{ $t('views.step2.step2_5') }}</li>
              </ol>
              <div class="head_list">
                <li>{{ $t('views.How_to_Deposit') }}</li>
              </div>
              <img src="@/assets/Artboard_4.png" alt="" />
              <ol>
                <li>{{ $t('views.step3.step3_1') }}</li>
                <li>{{ $t('views.step3.step3_2') }}</li>
                <li>{{ $t('views.step3.step3_3') }}</li>
                <li>{{ $t('views.step3.step3_4') }}</li>
              </ol>
              <div class="head_list">{{ $t('views.How_to_Staking') }}</div>
              <img src="@/assets/Artboard_5.png" alt="" />
              <ol>
                <li>{{ $t('views.step4.step4_1') }}</li>
                <li>{{ $t('views.step4.step4_2') }}</li>
              </ol>
            </div>
            <div
              id="Withdrawal"
              :class="
                `tutorial divmargin open ${active == 'Withdrawal' ? 'open_active' : undefined}`
              "
            >
              <div class="docs_head" data-aos="Withdrawal">EFG Withdrawal</div>
              <div class="head_Introduction">ECOC Financial Growth</div>
              <div class="head_list">{{ $t('views.step_1') }}</div>
              <img src="@/assets/Artboard_2.png" alt="" />
              <ol>
                <li>{{ $t('views.step1.step1_1') }}</li>
                <li>{{ $t('views.step1.step1_2') }}</li>
                <li>{{ $t('views.step1.step1_3') }}</li>
                <li>{{ $t('views.step1.step1_4') }}</li>
              </ol>
              <div class="head_list">{{ $t('views.step_2') }}</div>
              <img src="@/assets/Artboard_3.png" alt="" />
              <ol>
                <li>{{ $t('views.step2.step2_1') }}</li>
                <li>{{ $t('views.step2.step2_2') }}.</li>
                <li>{{ $t('views.step2.step2_3') }}</li>
                <li>{{ $t('views.step2.step2_4') }}</li>
                <li>{{ $t('views.step2.step2_5') }}</li>
              </ol>
              <div class="head_list">
                <li>{{ $t('views.How_to_Deposit') }}</li>
              </div>
              <img src="@/assets/Artboard_4.png" alt="" />
              <ol>
                <li>{{ $t('views.step3.step3_1') }}</li>
                <li>{{ $t('views.step3.step3_2') }}</li>
                <li>{{ $t('views.step3.step3_3') }}</li>
                <li>{{ $t('views.step3.step3_4') }}</li>
              </ol>
              <div class="head_list">{{ $t('views.How_to_Staking') }}</div>
              <img src="@/assets/Artboard_5.png" alt="" />
              <ol>
                <li>{{ $t('views.step4.step4_1') }}</li>
                <li>{{ $t('views.step4.step4_2') }}</li>
              </ol>
            </div>
            <div
              id="Staking"
              :class="`tutorial divmargin open ${active == 'Staking' ? 'open_active' : undefined}`"
            >
              <div class="docs_head">EFG Staking</div>
              <div class="head_Introduction">ECOC Financial Growth</div>
              <div class="head_list">{{ $t('views.step_1') }}</div>
              <img src="@/assets/Artboard_2.png" alt="" />
              <ol>
                <li>{{ $t('views.step1.step1_1') }}</li>
                <li>{{ $t('views.step1.step1_2') }}</li>
                <li>{{ $t('views.step1.step1_3') }}</li>
                <li>{{ $t('views.step1.step1_4') }}</li>
              </ol>
              <div class="head_list">{{ $t('views.step_2') }}</div>
              <img src="@/assets/Artboard_3.png" alt="" />
              <ol>
                <li>{{ $t('views.step2.step2_1') }}</li>
                <li>{{ $t('views.step2.step2_2') }}.</li>
                <li>{{ $t('views.step2.step2_3') }}</li>
                <li>{{ $t('views.step2.step2_4') }}</li>
                <li>{{ $t('views.step2.step2_5') }}</li>
              </ol>
              <div class="head_list">
                <li>{{ $t('views.How_to_Deposit') }}</li>
              </div>
              <img src="@/assets/Artboard_4.png" alt="" />
              <ol>
                <li>{{ $t('views.step3.step3_1') }}</li>
                <li>{{ $t('views.step3.step3_2') }}</li>
                <li>{{ $t('views.step3.step3_3') }}</li>
                <li>{{ $t('views.step3.step3_4') }}</li>
              </ol>
              <div class="head_list">{{ $t('views.How_to_Staking') }}</div>
              <img src="@/assets/Artboard_5.png" alt="" />
              <ol>
                <li>{{ $t('views.step4.step4_1') }}</li>
                <li>{{ $t('views.step4.step4_2') }}</li>
              </ol>
            </div>
            <div
              id="Lending"
              :class="`tutorial divmargin open ${active == 'Lending' ? 'open_active' : undefined}`"
            >
              <div class="docs_head">EFG Lending</div>
              <div class="head_Introduction">ECOC Financial Growth</div>
              <div class="head_list">{{ $t('views.step_1') }}</div>
              <img src="@/assets/Artboard_2.png" alt="" />
              <ol>
                <li>{{ $t('views.step1.step1_1') }}</li>
                <li>{{ $t('views.step1.step1_2') }}</li>
                <li>{{ $t('views.step1.step1_3') }}</li>
                <li>{{ $t('views.step1.step1_4') }}</li>
              </ol>
              <div class="head_list">{{ $t('views.step_2') }}</div>
              <img src="@/assets/Artboard_3.png" alt="" />
              <ol>
                <li>{{ $t('views.step2.step2_1') }}</li>
                <li>{{ $t('views.step2.step2_2') }}.</li>
                <li>{{ $t('views.step2.step2_3') }}</li>
                <li>{{ $t('views.step2.step2_4') }}</li>
                <li>{{ $t('views.step2.step2_5') }}</li>
              </ol>
              <div class="head_list">
                <li>{{ $t('views.How_to_Deposit') }}</li>
              </div>
              <img src="@/assets/Artboard_4.png" alt="" />
              <ol>
                <li>{{ $t('views.step3.step3_1') }}</li>
                <li>{{ $t('views.step3.step3_2') }}</li>
                <li>{{ $t('views.step3.step3_3') }}</li>
                <li>{{ $t('views.step3.step3_4') }}</li>
              </ol>
              <div class="head_list">{{ $t('views.How_to_Staking') }}</div>
              <img src="@/assets/Artboard_5.png" alt="" />
              <ol>
                <li>{{ $t('views.step4.step4_1') }}</li>
                <li>{{ $t('views.step4.step4_2') }}</li>
              </ol>
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
  active = 'Tutorial'
  name = ''

  onClickActive(name: string) {
    this.active = name
    this.name = name
  }
  get listmenus() {
    return [
      {
        name: 'Tutorial'
      },
      {
        name: 'Deposit'
      },
      {
        name: 'Wallet'
      },
      {
        name: 'Withdrawal'
      },
      {
        name: 'Staking'
      },
      {
        name: 'Lending'
      }
    ]
  }
  get msg() {
    return this.$t('views.docs')
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
  font: 18px/24px;
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
  font-size: 20px;
  text-transform: uppercase;
  font-weight: bold;
}
.sec_doc2 .head_Introduction {
  font-size: 16px;
  letter-spacing: 0px;
  color: #010101;
  opacity: 1;
  margin-bottom: 40px;
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
.tutorial img {
  width: 100%;
}
.sec_doc2 .docs_head {
  width: 100%;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 5px;
}
.tutorial ol {
  margin-top: 20px;
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
@media only screen and (max-width: 960px) {
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
