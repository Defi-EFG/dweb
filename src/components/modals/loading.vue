<template>
  <div>
    <v-dialog v-model="show" width="400" persistent>
      <v-card class="blur-card">
        <v-card-title class="modal-header">
          <v-icon></v-icon>
          <v-btn @click="onClose" text><v-icon color="black">close</v-icon></v-btn>
        </v-card-title>
        <div class="generate-keydtore bg-white">
          <v-progress-circular
            class="mb-5"
            :rotate="360"
            :size="120"
            color="primary"
            :width="9"
            indeterminate
          ></v-progress-circular>
          <p>{{ $t(msg) }}</p>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class Loading extends Vue {
  @Prop({ default: 'Generating keystore file...' }) msg!: string
  @Prop({ default: false }) loading!: boolean

  get show() {
    return this.loading
  }

  onClose() {
    this.$emit('onClose')
  }
}
</script>

<style scoped>
.generate-keydtore {
  height: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.generate-keydtore p {
  margin-top: 15px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
}

.modal-header {
  padding: 9px !important;
  background-color: transparent;
  border-bottom: 1px solid rgba(211, 211, 211, 0.344);
  z-index: 999;
}

.v-card {
  position: relative;
}
</style>

<style>
.blur-card {
  background-color: transparent;
  position: relative;
  color: white;
}
.blur-card:before {
  background-color: transparent;
  content: '';
  max-width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: -16px;
  box-shadow: inset 0 0 2000px rgba(116, 116, 116, 0.356) !important;
  backdrop-filter: blur(20px);
  z-index: -1;
}
</style>
