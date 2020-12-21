<template>
  <div class="docs">
    <v-container style="max-width:1088px;">
      <v-row>
        <v-col lg="3" md="3" cols="12" style="padding:0px;">
          <section class="sec_doc1" name="doc">
            <div class="sidebar_dc1">{{ $t('views.Introduction') }}</div>
            <div class="sidebar_dc">
              <a
                href="#efg"
                @click="onClickActive('efg')"
                :class="active == 'efg' ? 'active' : undefined"
                >{{ $t('views.titles.How EFG Works') }}</a
              >
            </div>
            <div class="sidebar_dc">
              <a
                href="#gpt"
                @click="onClickActive('gpt')"
                :class="active == 'gpt' ? 'active' : undefined"
                >{{ $t('views.titles.How GPT Works') }}</a
              >
            </div>
          </section>
        </v-col>
        <v-col lg="9" md="9" cols="12" style="padding:0px;">
          <section class="sec_doc2">
            <div class="detail">
              <div id="efg" class="detailEFG">
                <div class="docs_head">{{ $t('views.Introduction') }}</div>
                <img src="@/assets/docs02.png" alt="" />
              </div>
              <div v-for="(item, i) in docsEFG" :key="i">
                <div class="head_Introduction">
                  {{ item.head }} - <span>{{ item.headsub }}</span
                  ><br />
                </div>
              </div>
            </div>
            <div class="detail">
              <div id="gpt" class="detailGPT">
                <img src="@/assets/intoGpt.png" alt="" />
              </div>
              <div v-for="(item, i) in docsGPT" :key="i">
                <div class="head_Introduction">
                  {{ item.head }} - <span>{{ item.headsub }}</span
                  ><br />
                </div>
              </div>
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
export default class Introduction extends Vue {
  active = 'efg'
  name = ''

  onClickActive(name: string) {
    this.active = name
    this.name = name
  }

  get docsEFG() {
    return this.$t('views.docsEFG')
  }
  get docsGPT() {
    return this.$t('views.docsGPT')
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
.sidebar_dc1 {
  margin-bottom: 10px;
  font-weight: 800;
}
.sidebar_dc {
  padding: 5px 0;
}
.sidebar_dc a {
  color: #000000;
  text-align: left;
  letter-spacing: 0px;
  color: #000000;
  opacity: 1;
  font-weight: 400;
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
.sec_doc2 .detail .detailGPT {
  padding-top: 150px;
}
.sec_doc2 .detail .detailEFG {
  padding-top: 150px;
}
.sec_doc2 img {
  width: 100%;
  margin-bottom: 40px;
  box-shadow: 0px 0px 20px 1px #cccccc;
  border-radius: 5px;
}

.sec_doc2 .docs_head {
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
@media only screen and (max-width: 960px) {
  .sidebar_dc a {
    font-weight: bold;
  }
  .active {
    border-bottom: 2px solid #c074f9;
  }
  .sidebar_dc1 {
    display: none;
  }
  .sec_doc1 {
    position: fixed;
    width: 100%;
    top: 50px;
    padding: 40px 20px;
    height: 70px;
    background: #ffffff;
  }
  .sidebar_dc {
    display: inline;
    margin-right: 10px;
  }
  .sec_doc2 {
    padding: 0px 20px;
  }
  .container {
    padding: 12px;
  }
  .sec_doc2 .img img {
    margin-bottom: 20px;
  }
  .sec_doc2 .detail .detailGPT {
    padding-top: 150px;
  }
  .sec_doc2 .detail .detailEFG {
    padding-top: 150px;
  }
}
</style>
