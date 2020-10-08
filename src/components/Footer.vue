<template>
  <div id="footer">
    <a href="https://t.me/EFGtoken" target="_blank" rel="noopener noreferrer"
      ><span>Telegram</span></a
    >
    <a href="https://github.com/Defi-EFG" target="_blank" rel="noopener noreferrer"
      ><span>Github</span></a
    >
    <a href="https://medium.com/@ecoc.efg" target="_blank" rel="noopener noreferrer"
      ><span>Medium</span></a
    >
    <a href="https://twitter.com/EcocEfg" target="_blank" rel="noopener noreferrer">
      <span>Twitter</span></a
    >
  </div>
</template>
<script>
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
@media only screen and (max-width: 670px) {
  #footer span {
    font-size: 14px;
    padding: 15px;
  }
}
</style>
