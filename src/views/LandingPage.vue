<template>
  <div class="landing-page">
    <div v-if="isLoading" class="animation-container">
      <loadingAnimation />
    </div>
    <div v-else>
      <p>Please select your favorite team:</p>
      <div class="team-grid">
        <div
          v-for="team in teams"
          :key="team.id"
          class="team-square"
          @click="selectTeam(team)"
        >
          <img :src="team.crest" :alt="team.name" class="team-badge" />
          <div class="team-name">{{ team.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loadingAnimation from "@/components/LoadingAnimation.vue";
import axios from "axios";

export default {
  name: "LandingPage",
  components: {
    loadingAnimation,
  },
  data() {
    return {
      selectedTeam: null,
      teams: [],
      isLoading: true,
    };
  },
  created() {
    this.fetchTeams();
  },
  methods: {
    async fetchTeams() {
      try {
        const response = await axios.get("/api/competitions/PL/teams");
        this.teams = response.data.teams.map((team) => ({
          id: team.id,
          name: this.getTeamName(team.name),
          crest: team.crest,
        }));
        this.teams.sort((a, b) => (a.name > b.name ? 1 : -1));
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
      this.isLoading = false;
    },
    getTeamName(teamName) {
      return teamName.replace(/FC$/, "").trim();
    },
    selectTeam(team) {
      // THIS NEEDS TO BE CHANGED TO UPDATING THE USERS FAVOURITE TEAM AND ADJUSTING STATE ETC FOR CORRECT INFO
      this.$router.push({ name: "Team", params: { teamId: team.id } });
    },
  },
};
</script>

<style scoped>
.landing-page {
  text-align: center;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  justify-items: center;
}

.team-square {
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.1s linear, box-shadow 0.1s linear;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
}

.team-square:hover {
  border-color: #1f8dd6;
}

.team-badge {
  width: 75px;
  margin-bottom: 10px;
}

.team-name {
  font-size: 16px;
}
</style>
