<template>
  <nav class="navigation-bar">
    <router-link
      to="/"
      class="nav-link"
      :class="{ 'active-link': isRouteActive('/') }"
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
  justify-content: center;
  background-color: #333;
  padding: 10px 0;
}

.nav-link {
  color: white;
  text-decoration: none;
  margin: 0 15px;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #ff9900;
}

.active-link {
  color: #ff9900;
}

/* Custom styles for classic black or dark gray */
.navigation-bar {
  background-color: #222; /* Dark gray background */
}

.nav-link {
  color: white;
  text-decoration: none;
  margin: 0 15px;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #ff9900;
}

.active-link {
  color: #ff9900;
}
</style>
