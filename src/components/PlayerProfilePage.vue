<template>
  <div class="player-profile">
    <div v-if="loading">
      <p>Loading player data...</p>
    </div>
    <div v-else>
      <div class="hero" :style="{ backgroundColor: 'red' }">
        <div class="hero-overlay">
          <h1 class="hero-title">{{ player.name }}</h1>
        </div>
      </div>
      <div class="player-details">
        <img
          :src="player.currentTeam.crest"
          :alt="player.currentTeam.name"
          class="player-image"
        />
        <div class="player-info">
          <p class="player-position">{{ player.position }}</p>
          <p class="player-birth">{{ player.dateOfBirth }}</p>
          <p class="player-nationality">{{ player.nationality }}</p>
        </div>
      </div>
      <h2 class="section-title">Current Team</h2>
      <div class="team-details">
        <div class="team-info">
          <img
            :src="player.currentTeam.crest"
            :alt="player.currentTeam.name"
            class="team-crest"
          />
          <div class="team-text">
            <p class="team-name">{{ player.currentTeam.name }}</p>
            <p class="team-address">{{ player.currentTeam.address }}</p>
            <p class="team-website">
              <a :href="player.currentTeam.website" target="_blank">{{
                player.currentTeam.website
              }}</a>
            </p>
          </div>
        </div>
        <div class="team-extra">
          <p class="team-founded">{{ player.currentTeam.founded }}</p>
          <p class="team-colors">{{ player.currentTeam.clubColors }}</p>
          <p class="team-venue">{{ player.currentTeam.venue }}</p>
        </div>
      </div>
      <h2 class="section-title">Running Competitions</h2>
      <ul class="competition-list">
        <li
          v-for="competition in player.currentTeam.runningCompetitions"
          :key="competition.id"
        >
          <img
            :src="competition.emblem"
            :alt="competition.name"
            class="competition-emblem"
          />
          <p class="competition-name">{{ competition.name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PlayerProfilePage",
  data() {
    return {
      player: {},
      loading: true, // Add loading state
    };
  },
  async created() {
    await this.fetchPlayerProfile(); // Await the data fetch
    this.loading = false; // Set loading state to false after fetching data
  },
  methods: {
    async fetchPlayerProfile() {
      const playerId = this.$route.params.id;
      try {
        const response = await axios.get(`/api/persons/${playerId}`);
        this.player = response.data;
      } catch (error) {
        console.error("Error fetching player profile:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
.player-profile {
  padding: 20px;
}

.hero {
  position: relative;
  overflow: hidden;
  height: 300px;
}

.hero-background {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
}

.hero-title {
  font-family: "Montserrat", sans-serif;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 10px;
}

.player-details {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.player-image {
  width: 120px;
  height: auto;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.player-info {
  margin-left: 20px;
}

.player-position {
  font-size: 18px;
  font-weight: bold;
}

.player-birth,
.player-nationality {
  font-size: 14px;
  color: #777;
}

.section-title {
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
  font-weight: bold;
  margin-top: 30px;
}

.team-details {
  display: flex;
  margin-top: 20px;
}

.team-info {
  display: flex;
  align-items: center;
}

.team-crest {
  width: 80px;
  height: auto;
  margin-right: 20px;
}

.team-text {
  margin-left: 20px;
}

.team-name {
  font-size: 18px;
  font-weight: bold;
}

.team-address,
.team-website {
  font-size: 14px;
  color: #777;
}

.team-extra {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
}

.team-founded,
.team-colors,
.team-venue {
  font-size: 14px;
  color: #777;
}

.competition-list {
  display: flex;
  list-style: none;
  margin-top: 20px;
  padding: 0;
}

.competition-emblem {
  width: 30px;
  height: auto;
  margin-right: 10px;
}

.competition-name {
  font-size: 14px;
}
</style>
