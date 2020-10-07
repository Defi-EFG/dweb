<template>
  <div class="docs">
    <v-container style="max-width:1088px;">
      <v-row>
        <v-col lg="3" md="3" cols="12" style="padding:0px;">
          <section class="sec_doc1" name="doc">
            <div class="sibar_dc">
              <a
                @click="onClickActive(active == 'Introduction')"
                :class="active == 'Introduction' ? 'active' : undefined"
                href="#Introduction"
                >Introduction</a
              >
            </div>
          </section>
        </v-col>
        <v-col lg="9" md="9" cols="12" style="padding:0px;">
          <section id="Introduction" class="sec_doc2">
            <div class="head_Introduction">What is DeFi?</div>
            <div class="sun_Introduction">
              Decentralized Finance or DeFi refers to the ecosystem comprised of financial
              applications that are being developed on top of blockchain systems. DeFi aims to
              recreate the traditional financial system without intermediaries. Many of the
              traditional actions in the markets such as lending or borrowing can now be done
              through a decentralized open-source network.
            </div>
            <div class="head_Introduction">What is ECOC Financial Growth (EFG)</div>
            <div class="sun_Introduction">
              ECOC Financial Growth (EFG) is a decentralized currency, building on ECRC-20 and
              sharing the same interface of ERC-20 (Ethereum) standard. EFG is created form ECOChain
              developers and trying to expand and strengthen the ecosystem, providing the desired
              missing attributes for users, reality, and stable prices. EFG aims to simplify DeFi
              for the general users and help boost their profits at the same time, even for those
              unfamiliar with the world of digital assets.
            </div>

            <div class="head_Introduction">Why EGF?</div>
            <div class="sun_Introduction">
              EFG brings an opportunity for increasing the investment value for users. Our goal is
              to make DeFi simple and accessible for everyone, even for the digital asset novices.
              As well as, gather a wide user base and create high utility services. Get ready to
              join a brand-new monetary,
            </div>
          </section>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    active: 'Introduction',
    name: ''
  }),

  methods: {
    onClickActive() {
      this.active = 'Introduction'
      this.name = 'home-docs'
      this.$store.dispatch('addAction')
    },
    onClickActive2() {
      this.active = 'Guides'
      this.name = 'home-docs'
    }
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
.sec_doc2 .head_Introduction {
  font: normal normal bold 16px/21px Segoe UI;
  letter-spacing: 0px;
  color: #000000;
  opacity: 1;
  margin-bottom: 5px;
}
.sec_doc2 .sun_Introduction {
  font: normal normal normal 16px/21px Segoe UI;
  letter-spacing: 0px;
  color: #929292;
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
    padding: 20px 50px;
    height: 70px;
    background: #ffffff;
  }
  .sibar_dc {
    display: inline;
    margin-right: 10px;
  }
  .sec_doc2 {
    padding: 150px 50px;
  }
  .container {
    padding: 12px;
  }
}
</style>
