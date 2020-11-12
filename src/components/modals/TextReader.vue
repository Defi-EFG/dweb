<template>
  <div class="upload-wrapper text-end mb-3">
    <small class="mr-2">{{ $t('views.modal.or_Upload') }}</small>
    <label class="text-reader">
      <v-icon class="upload-icon" color="white">$upload</v-icon>
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
}
.text-reader {
  position: relative;
  overflow: hidden;
  background-color: #44096b;
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
  font-size: 16px !important;
}
</style>
