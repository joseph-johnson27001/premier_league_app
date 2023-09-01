<template>
  <div class="home-header">
    <h1 class="home-name">Home</h1>
  </div>
</template>
<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
.home-header {
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin: -20px -20px 20px -20px;
}
.page-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}
</style>
