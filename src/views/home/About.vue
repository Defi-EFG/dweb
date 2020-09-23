<template>
  <div>
    <v-sheet class="mx-auto" max-width="700">
      <v-slide-group multiple show-arrows>
        <v-slide-item v-for="n in 32" :key="n" v-slot:default="{ active, toggle }">
          <v-btn
            class="mx-12"
            :input-value="active"
            active-class="purple white--text"
            depressed
            rounded
            @click="toggle"
          >
            Options {{ n }}
          </v-btn>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  <ModalCreate/>
  </div>
</template>
<script>
import ModalCreate from '../modal/Modal-Create-Account';
export default {
  data: () => ({
    model: null,
  
  }),
     components: {
    ModalCreate,
  },
}
</script>
