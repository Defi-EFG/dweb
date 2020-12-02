<template>
  <div class="loading">
    <v-dialog v-model="show" width="400" persistent>
      <v-card>
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

.loading {
  overflow: hidden;
}
</style>
