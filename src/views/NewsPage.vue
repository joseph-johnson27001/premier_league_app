<template>
  <div class="news-page">
    <div class="news-header">
      <h1 class="news-name">Premier League News</h1>
    </div>
    <!-- Apply the shared class here -->
    <div class="news-list">
      <div v-for="story in sportsNews" :key="story.id" class="news-item">
        <img :src="story.image" alt="News Image" class="news-image" />
        <h2 class="news-title">{{ story.title }}</h2>
        <p class="news-summary">{{ story.summary }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsPage",
  data() {
    return {
      sportsNews: [
        {
          id: 1,
          title: "Exciting Match Coming Up",
          image: "https://via.placeholder.com/300x200",
          summary: "The upcoming match promises to be a thrilling showdown.",
        },
        {
          id: 2,
          title: "Player Interview: Behind the Scenes",
          image: "https://via.placeholder.com/300x200",
          summary: "Get an exclusive look into the life of a star player.",
        },
        {
          id: 3,
          title: "Team Training for Championship",
          image: "https://via.placeholder.com/300x200",
          summary:
            "The team is intensively training for the upcoming championship.",
        },
      ],
    };
  },
};
</script>

<style scoped>
.news-header {
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin: -20px -20px 20px -20px;
}
.page-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}
.news-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.news-item {
  border: 1px solid #ddd;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.news-image {
  width: 100%;
  height: auto;
}

.news-title {
  margin-top: 10px;
}

.news-summary {
  margin-top: 5px;
  color: #555;
}
</style>
