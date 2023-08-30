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
  font-family: Arial, sans-serif;
}

.background {
  background-color: #f2f2f2; /* Change to your desired background color */
  display: flex;
  justify-content: center;
  min-height: 100vh;
}

.content-container {
  background-color: white; /* Change to your desired content background color */
  max-width: 1200px;
  width: 100%;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Add a subtle shadow for depth */
}
</style>
