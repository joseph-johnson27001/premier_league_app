import Vue from "vue";
import VueRouter from "vue-router";

import HomePage from "@/views/HomePage.vue";
import TablePage from "@/views/TablePage.vue";
import FixturesPage from "@/views/FixturesPage.vue";
import ResultsPage from "@/views/ResultsPage.vue";
import TeamsPage from "@/views/TeamsPage.vue";
import TeamPage from "@/views/TeamPage.vue"; // Import the TeamPage component
import PlayerProfilePage from "@/components/PlayerProfilePage.vue";
import NewsPage from "@/views/NewsPage.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: HomePage },
  { path: "/table", component: TablePage },
  { path: "/fixtures", component: FixturesPage },
  { path: "/results", component: ResultsPage },
  { path: "/teams", component: TeamsPage },
  { path: "/news", component: NewsPage },
  {
    path: "/players/:id",
    name: "player-profile",
    component: PlayerProfilePage,
  },
  {
    path: "/teams/:teamId",
    name: "Team",
    component: TeamPage,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  // Scroll to the top of the page
  window.scrollTo(0, 0);
  next();
});

export default router;
