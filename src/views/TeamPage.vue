<template>
  <div class="team-page">
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
        <p class="team-club-colors">
          Club Colors: {{ selectedTeam.clubColors }}
        </p>
        <p class="team-website">
          Website:
          <a :href="selectedTeam.website" target="_blank">{{
            selectedTeam.website
          }}</a>
        </p>
      </div>
    </div>
    <h2 class="section-title">Players</h2>
    <div class="player-categories">
      <div v-for="(players, category) in categorizedPlayers" :key="category">
        <h3 class="category-title">{{ getCategoryTitle(category) }}</h3>
        <div class="player-cards">
          <div class="player-card" v-for="player in players" :key="player.id">
            <div class="player-card-header">
              <h4 class="player-name">{{ player.name }}</h4>
            </div>
            <p class="player-position">{{ player.position }}</p>
            <p class="player-nationality">{{ player.nationality }}</p>
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

.team-header {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.team-logo img {
  width: 150px;
  height: 150px;
}

.team-info {
  margin-left: 20px;
}

.team-info p {
  margin: 5px 0;
}

.section-title {
  font-size: 18px;
  margin-top: 20px;
  color: #333;
}

.player-categories {
  margin-top: 20px;
}

.category-title {
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
}

.player-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.player-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
  flex: 1;
  min-width: calc(25% - 20px);
  max-width: calc(25% - 20px);
}

.player-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.player-name {
  font-size: 16px;
  margin-top: 10px;
  text-align: center;
}

.player-position,
.player-nationality {
  font-size: 14px;
  color: #666;
}
</style>
