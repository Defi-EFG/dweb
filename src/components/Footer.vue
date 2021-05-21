<template>
  <div id="footer">
    <div id="footer-list">
      <a href="https://t.me/EFGtoken" target="_blank" rel="noopener noreferrer"
        ><span>Telegram</span></a
      >
      <a href="https://github.com/Defi-EFG" target="_blank" rel="noopener noreferrer"
        ><span>Github</span></a
      >
      <a href="https://efg-defi.medium.com/" target="_blank" rel="noopener noreferrer"
        ><span>Medium</span></a
      >
      <a href="https://twitter.com/EFG_DeFi" target="_blank" rel="noopener noreferrer">
        <span>Twitter</span></a
      >
    </div>
    <div class="disclaim">
      {{ $t('disclaim') }}
      <a href="mailto:asupport@efg.finance"> support@efg.finance </a>
    </div>
  </div>
</template>

<script lang="ts">
export default {}
</script>

<style scoped>
#footer {
  text-align: center;
  padding: 20px;
  background: #090c1b 0% 0% no-repeat padding-box;
  position: relative;
  z-index: 1000;
  color: #ffffff;
}
#footer span {
  text-align: center;
  padding: 20px;
  color: #ffffff;
  transition: 0.3s;
}
#footer span:hover {
  color: #693987;
}
.disclaim {
  font-size: 12px;
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  text-align: start;
}
.disclaim > a {
  color: white !important;
}
@media only screen and (max-width: 670px) {
  #footer span {
    font-size: 14px;
    padding: 15px;
  }
  .disclaim {
    width: auto;
    padding: 20px;
  }
}
</style>
