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
}

.team-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.team-card {
  background-color: #f8f8f8;
  border: 1px solid #999;
  border-radius: 4px;
  padding: 20px;
  max-height: 250px;
  overflow: hidden;
  cursor: pointer;
  text-align: center;
  border: 1px solid #ccc;
  transition: border-color 0.1s, box-shadow 0.1s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.team-card:hover {
  border-color: #1f8dd6;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
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
  font-size: 18px;
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
