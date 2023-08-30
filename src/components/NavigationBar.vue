<template>
  <nav class="navigation">
    <router-link to="/">Home</router-link>
    <router-link to="/table">Table</router-link>
    <router-link to="/fixtures">Fixtures</router-link>
    <router-link to="/results">Results</router-link>
    <router-link to="/news">News</router-link>
  </nav>
</template>

<style scoped>
.navigation {
  display: flex;
  justify-content: center;
  background-color: #333;
  padding: 10px 0;
}

.navigation a {
  color: white;
  text-decoration: none;
  margin: 0 15px;
  transition: color 0.3s;
}

.navigation a:hover {
  color: #ff9900;
}
</style>
