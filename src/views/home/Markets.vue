<template>
  <div class="markets">
      <section class="sec_m1">
        <v-container>
          <v-row>
            <v-col cols="6">
              <div class="h_detail">
                <v-row>
                  <v-col cols="12" style="padding:0px">
                    <div class="logo_ecoc">
                      <img class="logo_ecoc_m" src="../../assets/bitcoin2.png" alt="">
                      <div class="logo_ecoc_m_text">ECOC <span>- Market Details</span></div>
                    </div>
                  </v-col>
                  <v-col cols="9" style="padding:0px">
                    <div class="m_titel">Total Deposited</div>
                    <div class="m_price">$5,561,347.42</div>
                  </v-col>
                  <v-col cols="3" style="padding:0px">
                    <div class="m_titel" style="text-align: right;">Deposit APY</div>
                    <div class="m_price" style="text-align: right;">2.5%</div>
                  </v-col>
                  <v-col cols="9" style="padding:0px; border-top:1px solid #ffffff; ">
                    <div class="m_titel">Total Deposited</div>
                    <div class="m_price">$5,561,347.42</div>
                  </v-col>
                  <v-col cols="3" style="padding:0px;  border-top:1px solid #ffffff; ">
                    <div class="m_titel" style="text-align: right;">Deposit APY</div>
                    <div class="m_price" style="text-align: right;">2.5%</div>
                  </v-col>
                </v-row>
              </div>
            </v-col>
            <v-col cols="6">
              <div class="M_detail">
                <v-row>
                  <v-col cols="12">
                    <div class="M_detail_text">Number of Suppiliers <span>1,610</span></div>
                    <div class="M_detail_text">Interest Paid/Day <span>$4,541</span></div>
                    <div class="M_detail_text">Number of Borrowers <span>841</span></div>
                    <div class="M_detail_text">Reserves <span>4012.2 ECOC</span></div>
                    <div class="M_detail_text">Reserve Factor <span>10%</span></div>
                    <div class="M_detail_text">Collateral Factor <span>80%</span></div>
                  </v-col>
                </v-row>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </section>
      <section class="sec_m2">
          <v-container>
            <v-row>
              <v-col cols="12">
                  <div class="chart_view">
                   
                  </div>
              </v-col>
            </v-row>
          </v-container>
      </section>
  </div>
</template>


<style scoped>
  .container{
    max-width :1088px;
    margin:  0 auto;
    
  }
  .sec_m1{
   background: transparent linear-gradient(180deg, #2C1635 0%, #070C1A 100%) 0% 0% no-repeat padding-box;
   padding: 80px 0 50px 0;
  }
  .sec_m2{
    background: #17181C 0% 0% no-repeat padding-box;
    height: 500px;
    padding: 50px 0 0 0 ;
  }
  .h_detail {
    padding: 30px 10px;
    max-width: 500px;
    margin: 0 auto;
  }
  .logo_ecoc {
    color:#ffffff;
    position: relative;
    margin-bottom: 30px;
  }
  .logo_ecoc_m{
    padding: 5px;
    background-color:#ffffff ;
    border-radius: 50%;
  }
  .logo_ecoc_m img{ 
    border-radius: 50%;
    padding: 0px;
    margin-left: -3px;
    margin-top: 2px;
  }
  .logo_ecoc .logo_ecoc_m_text {
    position: relative;
    display: inline;
    top: -5px;
    left: 10px;
    font: normal normal normal 44px/58px Segoe UI;
  }
  .logo_ecoc .logo_ecoc_m_text span{
    font: normal normal 400 41px/54px Segoe UI;
    font-weight: 300;
  }
  .m_titel{
    text-align: left;
    font: normal normal normal 16px/21px Segoe UI;
    letter-spacing: 0px;
    color: #FFFFFF;
    opacity: 1;
    margin-top: 20px;
  }
  .m_price{
    text-align: left;
    font: normal normal normal 30px/40px Segoe UI;
    letter-spacing: 0px;
    color: #FFFFFF;
    opacity: 1;
    margin-bottom:20px;
    margin-top: 10px;;
  }
  .M_detail {
    background: #17181C 0% 0% no-repeat padding-box;
    border-radius: 5px;
    opacity: 1;
    padding: 20px 40px;
    color: #ffffff;
    margin-left: 120px;
    max-width: 400px;
    
  }
  .M_detail .M_detail_text{
    padding: 15px 0;
    text-align: left;
    font: normal normal bold 16px/21px Segoe UI;
    letter-spacing: 0px;
    color: #FFFFFF;
    opacity: 1;
    font-weight: 400;
  }
  .M_detail .M_detail_text span{
    float: right;
    text-align: left;
    font: normal normal normal 15px/20px Segoe UI;
    letter-spacing: 0px;
    color: #FFFFFF;
    opacity: 1;
  }
  .chart_view{
    background-color: #000000;
    height: 300px;
    color: #ffffff;
  }
</style>