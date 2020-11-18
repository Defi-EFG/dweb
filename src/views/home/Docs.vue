<template>
  <div class="docs">
    <v-container style="max-width:1088px;">
      <v-row>
        <v-col lg="3" md="3" cols="12" style="padding:0px;">
          <section class="sec_doc1" name="doc">
            <div class="sibar_dc">
              <a
                @click="onClickActive(active == 'Introduction')"
                :class="active == 'Introduction' ? 'active' : ''"
                href="#Introduction"
                >{{ $t('views.Introduction') }}</a
              >
            </div>
          </section>
        </v-col>
        <v-col lg="9" md="9" cols="12" style="padding:0px;">
          <section id="Introduction" class="sec_doc2">
            <div class="img">
              <div class="docs_head">{{ $t('views.Introduction') }}</div>
              <img src="@/assets/docs01.png" alt="" />
            </div>
            <div v-for="(item, i) in msg" :key="i">
              <div class="head_Introduction">
                {{ item.head }} - <span>{{ item.headsub }}</span
                ><br />
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
export default class Docs extends Vue {
  active = 'Introduction'
  name = ''

  onClickActive() {
    this.active = 'Introduction'
    this.name = 'home-docs'
  }

  onClickActive2() {
    this.active = 'Guides'
    this.name = 'home-docs'
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
  background: #e4e4e4;
  height: 100%;
  position: fixed;
}
.sec_doc1 .list_head {
  font: normal normal bold 18px/24px Segoe UI;
  letter-spacing: 0px;
  color: #000000;
  opacity: 1;
  margin-bottom: 15px;
}
.sec_doc1 .list_head:hover {
  color: #c074f9;
  transition: 0.5s;
}
.sec_doc1 .list_head:hover {
  color: #c074f9;
  transition: 0.5s;
}
.sec_doc1 .list_head .active {
  color: #c074f9;
  transition: 0.5s;
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
.sec_doc2 .sun_Introduction {
  font-size: 20px;
  letter-spacing: 0px;
  color: #434141;
  opacity: 1;
  margin-bottom: 80px;
  line-height: 1.5;
}
.container {
  max-width: 100%;
  padding: 0;
}
.efg-header {
  background-color: #000000 !important;
}
@media only screen and (max-width: 960px) {
  .sec_doc1 {
    position: fixed;
    width: 100%;
    top: 50px;
    padding: 20px 20px;
    height: 70px;
    background: #ffffff;
    display: none;
  }
  .sibar_dc {
    display: inline;
    margin-right: 10px;
  }
  .sec_doc2 {
    padding: 130px 20px;
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
