<template>
  <div class="token-container">
    <v-btn color="success">Success</v-btn>
    <div class="token-card card-grad-border">
      <v-card-text class="token-text">
        <div class="red--text text--lighten-1">Word of the Day</div>
        <p>be•nev•o•lent</p>
        <p>adjective</p>
        <div>
          well meaning and kindly.
          <br />"a benevolent smile"
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="deep-purple accent-4">Learn More</v-btn>
      </v-card-actions>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class TokenList extends Vue {}
</script>

<style lang="scss" scoped>
.token-container {
  background-color: #363c50;
  color: white;
  border-radius: 6px;
  padding: 8px;
  height: 250px;
}

.token-card {
  background: transparent linear-gradient(233deg, #202639 0%, #313546 100%) 0% 0% no-repeat
    padding-box;
  box-shadow: 0px 3px 6px #00000029;

  .token-text {
    color: white;
  }
}

.card-grad-border {
  border-left-width: 10px;
  border-left-style: solid;
  background: transparent linear-gradient(183deg, #6212c9 0%, #9023bf 100%) 0% 0% no-repeat
    padding-box;
}
</style>
