<template>
  <div v-if="isLoading" class="loading-indicator">
    <p>Loading...</p>
  </div>
  <div class="team-page" v-else>
    <div class="team-header">
      <img :src="selectedTeam.crest" :alt="selectedTeam.name + ' Crest'" />
      <div class="team-info">
        <h1 class="team-name">{{ selectedTeam.name }}</h1>
        <p class="team-manager">
          Manager: {{ selectedTeam.coach.name }} ({{
            selectedTeam.coach.nationality
          }})
        </p>
        <p class="team-founded">Founded: {{ selectedTeam.founded }}</p>
        <p class="team-website">
          <a :href="selectedTeam.website" target="_blank">{{
            selectedTeam.website
          }}</a>
        </p>
      </div>
    </div>
    <div class="player-categories">
      <div v-for="(players, category) in categorizedPlayers" :key="category">
        <h3 class="category-title">{{ getCategoryTitle(category) }}</h3>
        <div class="player-cards">
          <div class="player-card" v-for="player in players" :key="player.id">
            <router-link :to="`/players/${player.id}`" class="player-link">
              <div class="player-card-header">
                <h4 class="player-name">{{ player.name }}</h4>
              </div>
              <p class="player-position">{{ player.position }}</p>
              <p class="player-nationality">{{ player.nationality }}</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selectedTeamId: this.$route.params.teamId,
      selectedTeam: {},
      isLoading: true,
    };
  },
  computed: {
    categorizedPlayers() {
      const categorizedPlayers = {
        Goalkeeper: [],
        Defender: [],
        Midfielder: [],
        Forward: [],
      };

      if (this.selectedTeam.squad) {
        this.selectedTeam.squad.forEach((player) => {
          const position = player.position ? player.position.toLowerCase() : "";
          if (position.includes("goalkeeper")) {
            categorizedPlayers.Goalkeeper.push(player);
          } else if (position.includes("defence")) {
            categorizedPlayers.Defender.push(player);
          } else if (position.includes("midfield")) {
            categorizedPlayers.Midfielder.push(player);
          } else if (position.includes("offence")) {
            categorizedPlayers.Forward.push(player);
          }
        });
      }

      return categorizedPlayers;
    },
  },

  methods: {
    getCategoryTitle(category) {
      switch (category) {
        case "Goalkeeper":
          return "Goalkeepers";
        case "Defender":
          return "Defenders";
        case "Midfielder":
          return "Midfielders";
        case "Forward":
          return "Forwards";
        default:
          return category;
      }
    },
    async fetchTeamDetails() {
      try {
        const response = await axios.get(`/api/teams/${this.selectedTeamId}`);
        this.selectedTeam = response.data;
        this.isLoading = false; // Data is loaded, set loading state to false
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
.team-page {
  font-family: "Arial", sans-serif;
  background-color: #f5f5f5;
  padding: 20px;
}

.team-header {
  background-color: #333;
  color: white;
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin: -20px -20px 20px -20px;
}

.team-logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.team-info {
  flex: 1;
}

.team-name {
  font-family: "Montserrat", sans-serif;
  font-size: 32px;
  font-weight: bold;
  margin: 0;
}

.team-manager,
.team-founded,
.team-club-colors,
.team-website {
  font-size: 16px;
  margin: 5px 0;
  color: #aaa;
}

.team-website a {
  color: #3498db;
  text-decoration: none;
  transition: color 0.3s;
}

.team-website a:hover {
  color: #1e87dc;
}

.category-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.player-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.player-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.player-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.player-name {
  font-size: 18px;
  margin: 10px 0;
  font-weight: bold;
}

.player-position,
.player-nationality {
  font-size: 14px;
  color: #666;
  margin: 5px 0;
}

.category-title,
.player-name,
.player-position,
.player-nationality {
  color: #333; /* Adjust the color as needed */
  /* Add any other desired styling here */
}

/* Style for link text */
.team-website a,
.player-link {
  color: #3498db;
  text-decoration: none;
  transition: color 0.3s;
}

.team-website a:hover,
.player-link:hover {
  color: #1e87dc;
}

/* Additional Media Queries for Ultra-small Devices */

@media (max-width: 360px) {
  .team-name {
    font-size: 28px;
  }

  .player-card {
    padding: 15px;
  }

  .player-name {
    font-size: 16px;
  }

  .player-position,
  .player-nationality {
    font-size: 12px;
  }
}
</style>
