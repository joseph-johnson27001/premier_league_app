<template>
  <div>
    <h1 class="page-title">{{ selectedTeam.name }}</h1>
    <!-- Display the team information here -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selectedTeamId: this.$route.params.teamId,
      selectedTeam: {}, // Store the selected team's data
    };
  },
  methods: {
    async fetchTeamDetails() {
      try {
        const response = await axios.get(`/api/teams/${this.selectedTeamId}`);
        this.selectedTeam = response.data;
      } catch (error) {
        console.error("Error fetching team details:", error);
      }
    },
  },
  created() {
    this.fetchTeamDetails();
  },
};
</script>

<style scoped>
.page-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}
/* Add styles for displaying team information */
</style>
