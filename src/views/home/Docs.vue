<template>
  <div class="docs">
    <v-container>
      <v-row>
        <v-col cols="4" style="padding:0px;">
          <section class="sec_doc1" name="doc">
            <div class="siber_me">
              <a
                @click="onClickActive(active == 'Introduction')"
                :class="active == 'Introduction' ? 'active' : undefined"
                href="#Introduction"
                >Introduction</a
              >
            </div>
            <div class="siber_me">
              <a
                @click="onClickActive2"
                :class="active == 'Guides' ? 'active' : undefined"
                href="#guides"
                >Guides</a
              >
            </div>
            <div>{{ $store.state.coune }}</div>
          </section>
        </v-col>
        <v-col cols="8" style="padding:0px;">
          <section id="Introduction" class="sec_doc2">
            <div class="head_Introduction">Introduction</div>
            <div class="sun_Introduction">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
              euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim
              veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
              commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit
              esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et
              accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue
              duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer
              adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
              aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel
              eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum
              dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui
              blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
            </div>
            <div class="sun_Introduction">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
              euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim
              veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
              commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit
              esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et
              accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue
              duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer
              adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
              aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel
              eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum
              dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui
              blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
            </div>

            <div class="sun_Introduction">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
              euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim
              veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
              commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit
              esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et
              accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue
              duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer
              adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
              aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel
              eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum
              dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui
              blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
            </div>

            <div class="sun_Introduction">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
              euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim
              veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
              commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit
              esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et
              accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue
              duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer
              adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
              aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel
              eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum
              dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui
              blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
            </div>

            <div class="sun_Introduction">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
              euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim
              veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
              commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit
              esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et
              accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue
              duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer
              adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
              aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel
              eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum
              dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui
              blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
            </div>

            <div class="sun_Introduction">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
              euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim
              veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
              commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit
              esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et
              accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue
              duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer
              adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
              aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel
              eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum
              dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui
              blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
            </div>

            <div id="guides" class="sun_Introduction">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
              euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim
              veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
              commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit
              esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et
              accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue
              duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer
              adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
              aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel
              eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum
              dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui
              blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
            </div>
            <div class="head_Introduction">Guides</div>
            <div class="sun_Introduction">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
              euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim
              veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
              commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit
              esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et
              accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue
              duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer
              adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
              aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel
              eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum
              dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui
              blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
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
.active {
  color: #c074f9 !important;
  transition: 0.5s;
}
.siber_me {
  margin-bottom: 10px;
}
.siber_me a {
  color: #000000;
  text-align: left;
  font: normal normal bold 18px/24px Segoe UI;
  letter-spacing: 0px;
  color: #000000;
  opacity: 1;
}
.siber_me a:hover {
  color: #c074f9;
  transition: 0.5s;
}
.sec_doc1 {
  padding: 150px 50px 100px 50px;
  background: #e4e4e4;
  text-align: right;
  height: 100%;
  position: fixed;
  width: 35%;
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
  padding: 150px 150px 1200px 150px;
  height: 100%;
}
.sec_doc2 .head_Introduction {
  font: normal normal bold 25px/33px Segoe UI;
  letter-spacing: 0px;
  color: #000000;
  opacity: 1;
  margin-bottom: 20px;
}
.sec_doc2 .sun_Introduction {
  font: normal normal normal 16px/21px Segoe UI;
  letter-spacing: 0px;
  color: #929292;
  opacity: 1;
  text-indent: 5em;
  margin-bottom: 20px;
}
.container {
  max-width: 100%;
  padding: 0;
}
.efg-header {
  background-color: #000000 !important;
}
</style>
