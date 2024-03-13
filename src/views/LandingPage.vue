<template>
  <div>
    <p>Please select your favorite team:</p>
    <select v-model="selectedTeam">
      <option value="">Select a team...</option>
      <option v-for="team in teams" :key="team.id" :value="team.id">
        {{ team.name }}
      </option>
    </select>
    <button @click="next">Next</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTeam: "",
      teams: [
        { id: 1, name: "Team A" },
        { id: 2, name: "Team B" },
        { id: 3, name: "Team C" },
      ],
    };
  },
  methods: {
    next() {
      // Perform actions when the "Next" button is clicked
      console.log("Selected Team:", this.selectedTeam);
    },
  },
};
</script>

<style scoped></style>
