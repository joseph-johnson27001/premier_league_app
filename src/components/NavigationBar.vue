<template>
  <nav class="navigation-bar">
    <div class="navigation-container">
      <router-link to="/table" class="nav-link" active-class="active-link"
        >Table</router-link
      >
      <router-link to="/fixtures" class="nav-link" active-class="active-link"
        >Fixtures</router-link
      >
      <router-link to="/results" class="nav-link" active-class="active-link"
        >Results</router-link
      >
      <router-link to="/teams" class="nav-link" active-class="active-link"
        >Teams</router-link
      >
      <router-link to="/news" class="nav-link" active-class="active-link"
        >News</router-link
      >
    </div>
  </nav>
</template>

<style scoped>
.navigation-bar {
  background-color: #333;
  color: #fff;
  padding: 10px 0;
}

.navigation-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  padding: 8px 12px;
  transition: color 0.1s;
}

.nav-link:hover {
  color: lightgrey;
}

.active-link,
.router-link-active .nav-link {
  color: #ffd700;
}
</style>
