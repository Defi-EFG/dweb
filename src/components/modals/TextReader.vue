<template>
  <div class="upload-wrapper text-end mb-3">
    <label class="text-reader">
      <small class="mr-2" @change="loadTextFromFile">{{ $t('views.modal.or_Upload') }}</small>
      <v-icon class="upload-icon" color="white">publish</v-icon>
      <input type="file" @change="loadTextFromFile" accept="application/json" />
    </label>
  </div>
</template>

<script>
export default {
  methods: {
    loadTextFromFile(e) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = e => this.$emit('load', e.target.result)
      if (file != null && file.size > 0) {
        reader.readAsText(file)
      }
    }
  }
}
</script>

<style>
.upload-wrapper small {
  font-size: 0.7em;
  text-decoration: underline;
  text-decoration-color: lightgray;
  text-align: start;
  padding: 6px 0px;
}
.text-reader {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  padding: 2px 5px;

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
  width: 35px;
}
.upload-icon {
  background-color: #44096b;
  border-radius: 50%;
  padding: 4px;
  font-size: 16px !important;
}
</style>
