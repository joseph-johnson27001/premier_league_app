<template>
  <div id="app">
    <NavigationBar />
    <div class="background">
      <div class="content-container">
        <router-view />
        <!-- This is where matched components will be rendered -->
      </div>
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
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Montserrat";
}

.background {
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
  min-height: 100vh;
}

.content-container {
  background-color: white;
  border: 1px solid #ccc;
  max-width: 1200px;
  width: 100%;
  padding: 20px;
}

.animation-container {
  height: 50vh;
  display: flex;
  place-items: center;
  margin: auto;
  justify-content: center;
}
</style>
