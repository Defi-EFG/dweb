<template>
  <div class="markets">
    <section class="sec_1">
      <v-container>
        <v-row>
          <v-col cols="6">
            <div class="total_supply">
              <div class="head_text">Total Supply</div>
              <div class="price_text" style="color: #C074F9;">$8,205,610.41</div>
            </div>
          </v-col>
          <v-col cols="6">
            <div class="total_supply">
              <div class="head_text">Total Borrowed</div>
              <div class="price_text" style="color: #3FC0DB;">$4,189,402.65</div>
            </div>
          </v-col>
        </v-row>
        <v-row class="text_table" style="margin-top:50px;">
          <v-col cols="8" class="text_table_Assets">Supply</v-col>
          <v-col cols="2">Total Deposited</v-col>
          <v-col cols="2">Deposit APY</v-col>
        </v-row>
        <v-row class="text_table_sub">
          <v-col cols="1" class="text_table_Assetsimg"><img src="../../assets/bitcoin2.png" alt=""></v-col>
          <v-col cols="7" class="text_table_Assets"><span>ECOC</span></v-col>
          <v-col cols="2">$5.3 M</v-col>
          <v-col cols="2">$2.5 M</v-col>
        </v-row>
        <v-row class="text_table_sub">
          <v-col cols="1" class="text_table_Assetsimg"><img src="../../assets/usd.png" alt=""></v-col>
          <v-col cols="7" class="text_table_Assets"><span>USD</span></v-col>
          <v-col cols="2">$5.3 M</v-col>
          <v-col cols="2">$2.5 M</v-col>
        </v-row>
        <v-row class="text_table_sub">
          <v-col cols="1" class="text_table_Assetsimg"><img src="../../assets/eth.png" alt=""></v-col>
          <v-col cols="7" class="text_table_Assets"><span>ETH</span></v-col>
          <v-col cols="2">$5.3 M</v-col>
          <v-col cols="2">$2.5 M</v-col>
        </v-row>
      </v-container>
    </section>
    <section class="sec_3">
      <v-container>
        <v-row class="text_table" style="margin-top:0px;">
          <v-col cols="8" class="text_table_Assets">Borrow</v-col>
          <v-col cols="2">Total borrowed</v-col>
          <v-col cols="2">Borrow APY</v-col>
        </v-row>
        <v-row class="text_table_sub">
          <v-col cols="1" class="text_table_Assetsimg"><img src="../../assets/bitcoin2.png" alt=""></v-col>
          <v-col cols="7" class="text_table_Assets"><span>EFG</span></v-col>
          <v-col cols="2">$2.9 M</v-col>
          <v-col cols="2">3.5%</v-col>
        </v-row>
      </v-container>
    </section>
    <section class="sec_2">
      <v-container>
        <v-row>
          <v-col cols="12">
              <div class="Lorem_head">Lorem ipsum dolor sit amet</div>
              <div class="Lorem_sub">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. 
              <br><br>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-carousel hide-delimiters>
                <v-carousel-item
                  v-for="(item,i) in items"
                  :key="i"
                
                >
                  <v-row
                    class="fill-height"
                    align="center"
                    justify="center"
                  >
                    <v-col cols="4">
                      <div class="img_footer"><img :src="item.src" alt="" ></div>
                    </v-col>
                    <v-col cols="8">
                      <div class="text_head_footer">{{ item.title}}</div>
                      <div class="subtext_head_footer">{{ item.subtitle}}</div>
                    </v-col>
                  </v-row>
                </v-carousel-item>
              </v-carousel>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script lang="ts">

 export default  {
     data () {
      return {
        items: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
            title:"Lorem ipsum dolor sit amet 1",
            subtitle:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi."
          
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
            title:"Lorem ipsum dolor sit amet 2",
            subtitle:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi."
          
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
            title:"Lorem ipsum dolor sit amet 3",
            subtitle:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi."
          
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
            title:"Lorem ipsum dolor sit amet 4",
            subtitle:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi."
        
          },
        ],
      }
    },
  }
</script>


<style scoped>
  .markets {
    background: #202020 0% 0% no-repeat padding-box;
  }
  .container{
    max-width :1088px;
    margin:  0 auto;
  }
  .sec_1{
    background: transparent linear-gradient(180deg, #2C1635 0%, #070C1A 100%) 0% 0% no-repeat padding-box;
    padding-top: 150px;
    z-index: 200;
  }
  .sec_2{
    background: #202020 0% 0% no-repeat padding-box;
    padding-top:150px;
   
  }
  .sec_3{
    background:#090c1b;
    height:300px;
    border-bottom-left-radius:50%;
    border-bottom-right-radius: 50%;
  }
  .total_supply{
    background: transparent linear-gradient(245deg, #202639 0%, #373A4B 100%) 0% 0% no-repeat padding-box;
    border-radius: 5px;
  }
  .total_supply .head_text {
    text-align: left;
    font: normal normal normal 16px/21px Segoe UI;
    letter-spacing: 0px;
    color: #FFFFFF;
    opacity: 1;
    padding: 40px 40px;
  }
  .total_supply .price_text {
    text-align: right;
    font: normal normal 400 41px/54px Segoe UI;
    letter-spacing: 0px;
    color: #FFFFFF;
    opacity: 1;
    padding: 20px 40px 30px 40px;
  }
  .market{
    text-align: left;
    font: normal normal normal 16px/21px Segoe UI;
    letter-spacing: 0px;
    color: #000000;
    opacity: 1;
    padding: 30px 0;
  }
  .text_table{
    text-align: left;
    font: normal normal normal 16px/21px Segoe UI;
    letter-spacing: 0px;
    color: #ffffff;
    opacity: 1;
  }
  .text_table .text_table_Assets {
    padding-left: 60px;
    text-align: left;
  }
  .text_table div{
    text-align: center;
  }
  .text_table_sub {
    padding:5px 0;
    margin:10px 0;
    border-radius: 5px;
    background: #242934 0% 0% no-repeat padding-box;
  }
  .text_table_sub .text_table_Assets {
    text-align: left;
    color: #ffffff;
  }
  .text_table_sub .text_table_Assetsimg {
    text-align: left;
    color: #ffffff;
    padding: 0px;
  }
  .text_table_sub div {
    text-align: center;
    color: #ffffff;
  }
  .text_table_sub .text_table_Assetsimg img{
    background-color: #929292;
    border-radius: 50px;
    margin-left: 50px;
    margin-right: 20px;
    margin-top: 5px;
    width: 31px;
    height: 31px;
  }
  .text_table_sub .text_table_Assets img{
    background-color: #cccccc;
    border-radius: 50px;
    margin-left: 50px;
    margin-right: 20px;
  }
  .text_table_sub .text_table_Assets span{
    padding-left: 30px;
  }
  .Lorem_head {
    text-align: left;
    font: normal normal bold 40px/68px Segoe UI;
    letter-spacing: 0px;
    color: #ffffff;
    opacity: 1;
  }
  .Lorem_sub{
    text-indent: 5em;
    text-align: left;
    font: normal normal normal 16px/21px Segoe UI;
    letter-spacing: 0px;
    color: #929292;
    opacity: 1;

  }
  
  .img_footer {
    width: 250px;
    height: 250px;
   border-radius: 50%;
   overflow:hidden;
  }
  .img_footer img {
    width: 100%;
  height: 100%;
  object-fit: cover;
  }
  .text_head_footer{
    text-align: left;
    font: normal normal bold 25px/33px Segoe UI;
    letter-spacing: 0px;
    color: #707070;
    opacity: 1;
    padding-top: 30px;
  }
  .subtext_head_footer {
    text-align: left;
    font: normal normal normal 16px/21px Segoe UI;
    letter-spacing: 0px;
    color: #707070;
    opacity: 1;
  }
 
  
</style>