<template>
  <div id="app">
    <NavigationBar />
    <div class="content-container">
      <router-view />
      <!-- This is where matched components will be rendered -->
    </div>
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";

export default {
  name: "App",
  components: {
    NavigationBar,
  },
};
</script>

<style>
.content-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>
