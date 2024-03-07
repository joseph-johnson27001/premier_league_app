<template>
  <div v-if="isLoading" class="animation-container">
    <loadingAnimation />
  </div>
  <div class="all-teams-page" v-else>
    <div class="team-list">
      <router-link
        v-for="team in teams"
        :key="team.id"
        :to="`/teams/${team.id}`"
        class="team-card-link"
      >
        <div class="team-card">
          <div class="team-logo-container">
            <img
              :src="team.crest"
              :alt="team.name + ' Crest'"
              class="team-logo"
            />
          </div>
          <h3 class="team-card-title">{{ team.name }}</h3>
          <p class="team-card-founded">Founded: {{ team.founded }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import loadingAnimation from "@/components/LoadingAnimation.vue";

export default {
  components: {
    loadingAnimation,
  },
  data() {
    return {
      teams: [],
      isLoading: true,
    };
  },
  async created() {
    try {
      const response = await axios.get("/api/competitions/PL/teams");
      console.log(response);
      this.teams = response.data.teams.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      this.isLoading = false;
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  },
};
</script>

<style scoped>
.all-teams-page {
  font-family: "Arial", sans-serif;
  background-color: #f5f5f5;
}

.teams-header {
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

.team-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.team-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-height: 250px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  text-align: center;
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.team-logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.team-logo {
  width: 80px;
  height: 80px;
}

.team-card-title {
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.team-card-founded {
  font-size: 16px;
  margin: 5px 0;
  color: #aaa;
}

.team-card-link {
  display: inline-block;
  font-size: 14px;
  margin-top: 10px;
  color: #3498db;
  text-decoration: none;
  transition: color 0.3s;
}

.team-card-link:hover {
  color: #1e87dc;
}

@media (max-width: 360px) {
  .team-name {
    font-size: 28px;
  }

  .team-card {
    padding: 15px;
  }

  .team-card-title {
    font-size: 20px;
  }

  .team-card-founded {
    font-size: 14px;
  }

  .team-card-link {
    font-size: 12px;
  }
}
</style>
