<template>
  <v-dialog v-model="checkPrivatekeyDialog">
    <v-card>
      <v-card-title>fdsfdsf</v-card-title>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class PrivateKey extends Vue {
  checkPrivatekeyDialog = false
  @Prop() visible!: boolean
  checkPrivatekey = this.visible
}
</script>
