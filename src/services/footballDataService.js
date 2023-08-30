// Import the axios library or your API service
import axios from "axios";

// ...

export default {
  data() {
    return {
      premierLeagueStandings: [],
    };
  },
  created() {
    this.fetchPremierLeagueStandings();
  },
  methods: {
    async fetchPremierLeagueStandings() {
      try {
        const response = await axios.get(
          "http://api.football-data.org/v4/competitions/PL/standings"
        ); // Use the proxy route
        this.premierLeagueStandings = response.data.standings[0].table;
      } catch (error) {
        console.error("Error fetching Premier League standings:", error);
      }
    },
  },
};
