<template >
    <div>

        <v-dialog v-model="loading" width="400" persistent>
      <v-card-content>
        <div class="generate-keydtore bg-white">
          <v-progress-circular
            :rotate="360"
            :size="120"
            :width="9"
            color="primary"
            indeterminate
          ></v-progress-circular>
          <p>Generating keystore file...</p>
        </div>
      </v-card-content>
    </v-dialog>
    </div>
</template>
<script>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
@Component({})
export default class Loading extends Vue { 

  onLoading() {
    this.$emit('onLoading')
  }
}

</script>
<style scoped>
.generate-keydtore {
  height: 506px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.generate-keydtore p {
  margin-top: 15px;
}

</style>

