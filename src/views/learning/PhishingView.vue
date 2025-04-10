<template>
  <v-container class="py-8" fluid>
    <v-row>
      <v-col cols="12">
        <div class="page-header text-center">
          <div class="hero-section">
            <div class="hero-icons">
              <v-icon size="48" color="primary" class="floating-icon left">mdi-shield-account</v-icon>
              <v-icon size="32" color="error" class="floating-icon top">mdi-alert-circle</v-icon>
              <v-icon size="40" color="success" class="floating-icon right">mdi-hand-heart</v-icon>
            </div>
            <h1 class="main-title">Understanding Phishing</h1>
            <div class="decorative-line"></div>
          </div>
          <p class="intro-text">
            <v-icon color="info" small class="mr-2">mdi-information</v-icon>
            In today's digital age, phishing has become a significant security threat that cannot be ignored. Let's learn how to identify, prevent, and respond to phishing attempts, working together to create a safer and more secure online environment.
          </p>
        </div>

        <v-row justify="center" class="mt-8">
          <v-col cols="12" md="6" class="d-flex justify-center">
            <div class="flip-card" @click="card1Flipped = !card1Flipped" :class="{ 'is-flipped': card1Flipped }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="48" color="primary" class="mb-4">mdi-help-circle</v-icon>
                  <h2>What is Phishing?</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <p>Phishing is a type of cyber attack where criminals attempt to trick users into providing sensitive information by posing as legitimate entities. It has the following characteristics:</p>
                  <ul>
                    <li>Deceptive: Mimics trusted sources</li>
                    <li>Widespread: Targets many users</li>
                    <li>Sophisticated: Uses social engineering</li>
                    <li>Dangerous: Can cause significant harm</li>
                  </ul>
                </div>
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="6" class="d-flex justify-center">
            <div class="flip-card" @click="card2Flipped = !card2Flipped" :class="{ 'is-flipped': card2Flipped }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="48" color="error" class="mb-4">mdi-alert-circle</v-icon>
                  <h2>Impact of Phishing</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <p>Phishing attacks can have serious consequences in multiple aspects:</p>
                  <ul>
                    <li>Financial: Direct monetary losses</li>
                    <li>Security: Compromised accounts and data</li>
                    <li>Privacy: Identity theft risks</li>
                    <li>Trust: Damaged online confidence</li>
                  </ul>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>

        <!-- 添加新闻推荐模块 -->
        <v-card class="mt-8 news-module" elevation="2">
          <v-card-title class="headline d-flex align-center">
            <v-icon left color="primary">mdi-newspaper-variant</v-icon>
            Recommended News
            <v-spacer></v-spacer>
            <v-btn
              icon
              @click="fetchNews"
              :loading="loadingNews"
              :disabled="loadingNews"
            >
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col v-for="(article, index) in newsArticles" :key="index" cols="12" sm="6" md="3">
                <v-card outlined class="news-card" @click="openArticle(article.url)">
                  <v-img
                    v-if="article.urlToImage"
                    :src="article.urlToImage"
                    height="160"
                    class="news-image"
                  >
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="primary"></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                  <v-img
                    v-else
                    height="160"
                    src="@/assets/default-news.jpg"
                    class="news-image"
                  ></v-img>
                  <v-card-title class="subtitle-1 news-title">{{ article.title }}</v-card-title>
                  <v-card-subtitle class="pt-2">{{ formatDate(article.publishedAt) }}</v-card-subtitle>
                  <v-card-text class="news-description">
                    {{ article.description || 'No description available' }}
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click.stop="openArticle(article.url)"
                    >
                      Read More
                      <v-icon right>mdi-open-in-new</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
            <v-alert
              v-if="error"
              type="error"
              class="mt-4"
            >
              {{ error }}
            </v-alert>
          </v-card-text>
        </v-card>

        <div class="text-center mt-12">
          <v-btn
            x-large
            color="primary"
            elevation="2"
            class="next-page-btn mr-4"
            @click="goToNextPage"
          >
            <v-icon left>mdi-arrow-right-circle</v-icon>
            Learn More About Prevention and Response
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PhishingView',
  data() {
    return {
      card1Flipped: false,
      card2Flipped: false,
      newsArticles: [],
      loadingNews: false,
      error: null
    }
  },
  methods: {
    goToNextPage() {
      this.$router.push('/scenario')
    },
    async fetchNews() {
      this.loadingNews = true;
      try {
        const response = await fetch(
          'https://newsapi.org/v2/everything?' +
          'q=cybersecurity+teenagers+OR+online+safety+OR+grooming&' +
          'language=en&' +
          'sortBy=relevancy&' +
          'pageSize=4',
          {
            headers: {
              'X-Api-Key': 'aec3b79e79e8421cb917a227f6360e77'
            }
          }
        );
        const data = await response.json();
        if (data.status === 'ok') {
          this.newsArticles = data.articles;
        } else {
          throw new Error('Failed to fetch news');
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        this.error = 'Unable to load news. Please try again later.';
      } finally {
        this.loadingNews = false;
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    openArticle(url) {
      window.open(url, '_blank');
    }
  },
  mounted() {
    this.fetchNews();
  }
}
</script>

<style scoped>
.page-header {
  margin-bottom: 4rem;
}

.main-title {
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.intro-text {
  color: #2c3e50;
  font-size: 1.1rem;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto;
}

.hero-section {
  position: relative;
  padding: 2rem 0;
  margin-bottom: 2rem;
}

.hero-icons {
  position: relative;
  height: 120px;
  margin-bottom: 1rem;
}

.floating-icon {
  position: absolute;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.floating-icon.left {
  left: 50%;
  margin-left: -100px;
  animation-name: floatLeft;
}

.floating-icon.right {
  right: 50%;
  margin-right: -100px;
  animation-name: floatRight;
}

.floating-icon.top {
  top: 0;
  left: 50%;
  margin-left: -16px;
  animation-name: floatTop;
}

.decorative-line {
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #4CAF50, #2196F3);
  margin: 1rem auto;
  border-radius: 2px;
}

/* 翻转卡片样式 */
.flip-card {
  background-color: transparent;
  width: 100%;
  max-width: 600px;
  height: 500px;
  perspective: 1000px;
  cursor: pointer;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-card.is-flipped .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 15px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.flip-card-front {
  background: linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.flip-card-back {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  transform: rotateY(180deg);
}

.flip-card-back ul {
  text-align: left;
  margin-top: 1rem;
}

.flip-card-back li {
  margin: 0.5rem 0;
}

.next-page-btn {
  font-size: 1.1rem;
  padding: 1rem 2rem;
  text-transform: none;
}

@keyframes floatLeft {
  0%, 100% {
    transform: translateY(0) rotate(-15deg);
  }
  50% {
    transform: translateY(-20px) rotate(-15deg);
  }
}

@keyframes floatRight {
  0%, 100% {
    transform: translateY(0) rotate(15deg);
  }
  50% {
    transform: translateY(-20px) rotate(15deg);
  }
}

@keyframes floatTop {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

.news-module {
  background: linear-gradient(to right, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05));
  border-radius: 12px;
}

.news-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
}

.news-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}

.news-image {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
}

.news-title {
  font-size: 1rem !important;
  line-height: 1.4;
  height: 70px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.news-description {
  height: 80px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.875rem;
}

.v-card__actions {
  margin-top: auto;
}
</style> 