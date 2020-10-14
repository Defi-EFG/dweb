<template>
  <div class="upload-wrapper text-end mb-3">
    <small class="mr-2">or Upload keystore file</small>
    <label class="text-reader">
      <v-icon color="white">$upload</v-icon>
      <input type="file" @change="loadTextFromFile" accept="application/json" />
    </label>
  </div>
</template>

<script>
export default {
  methods: {
    loadTextFromFile(ev) {
      const file = ev.target.files[0]
      const reader = new FileReader()
      reader.onload = e => this.$emit('load', e.target.result)
      reader.readAsText(file)
    }
  }
}
</script>

<style>
.upload-wrapper small {
  font-size: 0.6em;
}
.text-reader {
  position: relative;
  overflow: hidden;
  background-color: #44096b;
  cursor: pointer;
    padding: 0px 5px;
 
  border-radius: 50%;
}
.text-reader .v-icon {
  font-size: 12px;
  padding-bottom: 4px;
}
.text-reader input {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0;
}
</style>
