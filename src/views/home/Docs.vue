<template>
  <div class="docs">
    <v-container style="max-width:1088px;">
      <v-row>
        <v-col lg="3" md="3" cols="12" style="padding:0px;">
          <section class="sec_doc1" name="doc">
            <div class="sibar_dc">
              <a
                href="#Introduction"
                @click="onClickActive('Introduction')"
                :class="active == 'Introduction' ? 'active' : undefined"
                >{{ $t('views.Introduction') }}</a
              >
            </div>
            <div class="sibar_dc">
              <a
                href="#tutorialhead"
                @click="onClickActive('Tutorial ')"
                :class="active == 'Tutorial ' ? 'active' : undefined"
                >{{ $t('views.tutorial') }}
              </a>
            </div>
          </section>
        </v-col>
        <v-col lg="9" md="9" cols="12" style="padding:0px;">
          <section id="Introduction" class="sec_doc2">
            <div class="img">
              <div class="docs_head">{{ $t('views.Introduction') }}</div>
              <img src="@/assets/docs02.png" alt="" />
            </div>
            <div v-for="(item, i) in msg" :key="i">
              <div class="head_Introduction">
                {{ item.head }} - <span>{{ item.headsub }}</span
                ><br />
              </div>
            </div>
            <div id="tutorialhead"></div>
            <div id="tutorial">
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
              <div class="head_list">2nd {{ $t('views.step_2') }}</div>
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
export default class Docs extends Vue {
  active = 'Introduction'
  name = ''

  onClickActive(name: string) {
    this.active = name
    this.name = name
  }

  get msg() {
    return this.$t('views.docs')
  }
}
</script>

<style scoped>
.docs {
  background: rgb(228, 228, 228);
  background: linear-gradient(90deg, rgba(228, 228, 228, 1) 45%, rgba(237, 237, 237, 1) 45%);
}
.active {
  color: #c074f9 !important;
  transition: 0.5s;
}
.sibar_dc {
  margin-bottom: 10px;
}
.sibar_dc a {
  color: #000000;
  text-align: left;
  font: normal normal bold 18px/24px Segoe UI;
  letter-spacing: 0px;
  color: #000000;
  opacity: 1;
}
.sibar_dc a:hover {
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
  padding: 150px 30px 400px 82px;
  height: 100%;
}
.sec_doc2 .img img {
  width: 100%;
  margin-bottom: 40px;
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
#tutorial {
  margin-top: 100px;
}
#tutorial img {
  width: 100%;
}
.sec_doc2 .docs_head {
  width: 100%;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 5px;
}
#tutorial ol {
  margin-top: 20px;
}
#tutorial .head_list {
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
#tutorialhead {
  margin-bottom: 150px;
  border-top: 1px solid #cccccc;
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
  .sibar_dc {
    display: inline;
    margin-right: 10px;
  }
  .sec_doc2 {
    padding: 140px 20px;
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
</style>
