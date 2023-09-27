<script setup lang="ts">
window.utools.onPluginEnter(({ code, type, payload }) => {
  console.log("onPluginEnter", code, type, payload);
});

// const getVersion = () => {
//   window.everything.version();
// };
// getVersion();
console.log("window", window.everything);
console.log(window.path);
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
</template>

<style scoped></style>
