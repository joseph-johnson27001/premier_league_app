<template>
  <nav class="navigation-bar">
    <div class="navigation-container">
      <router-link
        to="/"
        class="nav-link"
        :class="{ 'active-link': isRouteActive('/') }"
        id="home-button"
        >Home</router-link
      >
      <router-link
        to="/table"
        class="nav-link"
        :class="{ 'active-link': isRouteActive('/table') }"
        >Table</router-link
      >
      <router-link
        to="/fixtures"
        class="nav-link"
        :class="{ 'active-link': isRouteActive('/fixtures') }"
        >Fixtures</router-link
      >
      <router-link
        to="/results"
        class="nav-link"
        :class="{ 'active-link': isRouteActive('/results') }"
        >Results</router-link
      >
      <router-link
        to="/news"
        class="nav-link"
        :class="{ 'active-link': isRouteActive('/news') }"
        >News</router-link
      >
    </div>
  </nav>
</template>

<script>
export default {
  // ... other component options ...
  methods: {
    isRouteActive(route) {
      return this.$route.path === route;
    },
  },
};
</script>

<style scoped>
.navigation-bar {
  display: flex;
  background-color: #004080;
  padding: 10px 0;
  justify-content: center;
}

.navigation-container {
  width: 1200px;
}

.nav-link {
  color: white;
  text-decoration: none;
  margin: 0 15px;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #ffd700;
}

.active-link {
  color: #ffd700;
}
</style>
