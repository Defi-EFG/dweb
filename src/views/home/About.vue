
<template>
 <div>
    <v-sheet
      class="mx-auto"
      max-width="700"
    >
      <v-slide-group multiple show-arrows>
        <v-slide-item
          v-for="n in 32"
          :key="n"
          v-slot:default="{ active, toggle }"
        >
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
 </div>
</template>
<script>
  export default {
    data: () => ({
      model: null,
    }),
  }
</script>