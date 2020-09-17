<template>
  <v-row justify="center">
    <v-btn color="" dark @click.stop="dialog = true">Dashboard </v-btn>
    <v-dialog v-model="dialog" max-width="390">
      <v-card>
        <v-card-title class="headline modal-header">
          <v-icon></v-icon>
          <v-icon>$close</v-icon>
        </v-card-title>
        <v-card-text> </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    }
  },
  output: {
    name: 'ModalCreation',
    exports: 'named'
  }
}
</script>
<style lang="scss">
.modal-header {
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 1px 7px 0px #0000002e;
}
</style>
