<template>
  <div class="table-page">
    <h1 class="page-title">TABLE</h1>
    <table class="team-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Team</th>
          <th>Pl</th>
          <th>W</th>
          <th>D</th>
          <th>L</th>
          <th>F</th>
          <th>A</th>
          <th>GF</th>
          <th>Pts</th>
          <th>Last 6</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(team, index) in teams" :key="team.name">
          <td>{{ index + 1 }}</td>
          <td>{{ team.name }}</td>
          <td>{{ team.pl }}</td>
          <td>{{ team.w }}</td>
          <td>{{ team.d }}</td>
          <td>{{ team.l }}</td>
          <td>{{ team.f }}</td>
          <td>{{ team.a }}</td>
          <td>{{ team.gf }}</td>
          <td>{{ team.pts }}</td>
          <td>{{ team.last6 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TablePage",
  data() {
    return {
      teams: [
        {
          name: "Team A",
          pl: 4,
          w: 2,
          d: 1,
          l: 1,
          f: 6,
          a: 4,
          gf: 2,
          pts: 7,
          last6: "WDLWWL",
        },
        {
          name: "Team B",
          pl: 4,
          w: 3,
          d: 0,
          l: 1,
          f: 8,
          a: 5,
          gf: 3,
          pts: 9,
          last6: "WWLWLW",
        },
        {
          name: "Team C",
          pl: 4,
          w: 1,
          d: 2,
          l: 1,
          f: 4,
          a: 3,
          gf: 1,
          pts: 5,
          last6: "DWWLDL",
        },
        {
          name: "Team D",
          pl: 4,
          w: 0,
          d: 1,
          l: 3,
          f: 3,
          a: 9,
          gf: -6,
          pts: 1,
          last6: "LLLDLL",
        },
      ],
    };
  },
};
</script>

<style scoped>
.page-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.team-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.team-table th,
.team-table td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

.team-table th {
  background-color: #f8f8f8;
  color: #333;
  font-weight: bold;
}

.team-table tr:hover {
  background-color: #f2f2f2;
}

/* Additional styles for table cells */
.team-name {
  font-weight: bold;
}

.negative {
  color: #d9534f;
}

.positive {
  color: #5cb85c;
}
</style>
