<template>
  <div v-if="isLoading" class="animation-container">
    <loadingAnimation />
  </div>
  <div class="all-teams-page" v-else>
    <div class="team-list">
      <div
        class="team-card"
        v-for="team in teams"
        :key="team.id"
        :to="`/teams/${team.id}`"
      >
        <div class="team-logo-container">
          <img
            :src="team.crest"
            :alt="team.name + ' Crest'"
            class="team-logo"
          />
        </div>
        <p class="team-card-title">{{ team.name }}</p>
      </div>
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
}

.team-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  justify-items: center;
}

.team-card {
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

.team-card:hover {
  border-color: #1f8dd6;
}

.team-card p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.team-logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.team-logo {
  width: 75px;
  margin-bottom: 10px;
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
