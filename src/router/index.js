// router/index.js
import Vue from "vue";
import VueRouter from "vue-router";

import HomePage from "@/views/HomePage.vue";
import TablePage from "@/views/TablePage.vue";
import FixturesPage from "@/views/FixturesPage.vue";
import ResultsPage from "@/views/ResultsPage.vue";
import PlayersPage from "@/views/PlayersPage.vue";
import PlayerProfilePage from "@/components/PlayerProfilePage.vue";
import NewsPage from "@/views/NewsPage.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: HomePage },
  { path: "/table", component: TablePage },
  { path: "/fixtures", component: FixturesPage },
  { path: "/results", component: ResultsPage },
  { path: "/players", component: PlayersPage },
  { path: "/news", component: NewsPage },
  { path: "/players/:id", component: PlayerProfilePage },
];

const router = new VueRouter({
  routes,
});

export default router;
