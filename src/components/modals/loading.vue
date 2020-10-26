<template>
  <div>
    <v-dialog v-model="loading" width="400" persistent>
      <v-card-content>
        <div class="generate-keydtore bg-white">
          <v-progress-circular
            :rotate="360"
            :size="120"
            :width="9"
            indeterminate
          ></v-progress-circular>
          <p>{{ msg }}</p>
        </div>
      </v-card-content>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({})
export default class Loading extends Vue {
  @Prop({ default: 'Generating keystore file...' }) msg!: string
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
