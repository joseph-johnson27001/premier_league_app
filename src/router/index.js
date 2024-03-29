import Vue from "vue";
import VueRouter from "vue-router";
import TablePage from "@/views/TablePage.vue";
import FixturesPage from "@/views/FixturesPage.vue";
import ResultsPage from "@/views/ResultsPage.vue";
import TeamsPage from "@/views/TeamsPage.vue";
import TeamPage from "@/views/TeamPage.vue";
import PlayerProfilePage from "@/components/PlayerProfilePage.vue";
import NewsPage from "@/views/NewsPage.vue";
import LandingPage from "@/views/LandingPage.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/landing-page" },
  { path: "/table", component: TablePage },
  { path: "/landing-page", component: LandingPage },
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
  window.scrollTo(0, 0);
  next();
});

export default router;
