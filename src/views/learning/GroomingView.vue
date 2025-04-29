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
            <h1 class="main-title">Understanding Grooming</h1>
            <div class="decorative-line"></div>
          </div>
          <p class="intro-text">
            <v-icon color="info" small class="mr-2">mdi-information</v-icon>
            Grooming is when someone builds a relationship, trust, and emotional connection with a young person online to manipulate, exploit, or abuse them. It can happen through social media, messaging apps, gaming platforms, or any online space where interaction occurs. Groomers often use flattery, attention, and gifts to earn trust — making it difficult for victims to recognize the danger until it's too late.
          </p>
          <p class="quote-text">
            <v-icon color="primary" small class="mr-2">mdi-format-quote-open</v-icon>
            "Grooming often starts as a friendly chat, but it can quickly become manipulation. The goal is to isolate, control, and ultimately exploit the child — all behind a screen."
            <v-icon color="primary" small class="ml-2">mdi-format-quote-close</v-icon>
          </p>
        </div>

        <v-row justify="center" class="mt-8">
          <!-- Card 1 -->
          <v-col cols="12" md="4" class="d-flex justify-center mb-6">
            <div class="flip-card" @click="flipCard(1)" :class="{ 'is-flipped': activeCard === 1 }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="48" color="primary" class="mb-4">mdi-help-circle</v-icon>
                  <h2>What is online grooming?</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <p>Online grooming is when someone (often an adult) tries to gain the trust of a child or teen online to exploit or abuse them later. They might act friendly, send gifts, or pretend to be someone else to build a relationship.</p>
                </div>
              </div>
            </div>
          </v-col>

          <!-- Card 2 -->
          <v-col cols="12" md="4" class="d-flex justify-center mb-6">
            <div class="flip-card" @click="flipCard(2)" :class="{ 'is-flipped': activeCard === 2 }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="48" color="error" class="mb-4">mdi-account-group</v-icon>
                  <h2>How do groomers contact teens?</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <p>Groomers use platforms like social media, gaming chats, forums, or direct messages. They may lie about their age or identity to get close to their targets and often move the conversation to private messaging quickly.</p>
                </div>
              </div>
            </div>
          </v-col>

          <!-- Card 3 -->
          <v-col cols="12" md="4" class="d-flex justify-center mb-6">
            <div class="flip-card" @click="flipCard(3)" :class="{ 'is-flipped': activeCard === 3 }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="48" color="warning" class="mb-4">mdi-gauge-low</v-icon>
                  <h2>What tactics do groomers use?</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <ul>
                    <li>Flattery and compliments</li>
                    <li>Gifting money or game credits</li>
                    <li>Asking to keep conversations secret</li>
                    <li>Pretending to share similar interests</li>
                    <li>Making the victim feel special or understood</li>
                  </ul>
                </div>
              </div>
            </div>
          </v-col>

          <!-- Card 4 -->
          <v-col cols="12" md="4" class="d-flex justify-center mb-6">
            <div class="flip-card" @click="flipCard(4)" :class="{ 'is-flipped': activeCard === 4 }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="48" color="success" class="mb-4">mdi-shield-check</v-icon>
                  <h2>How can I protect myself?</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <ul>
                    <li>Don't share personal info online</li>
                    <li>Keep social media private</li>
                    <li>Be cautious of online strangers</li>
                    <li>Never agree to meet someone you've only met online</li>
                    <li>Tell a trusted adult if something feels wrong</li>
                  </ul>
                </div>
              </div>
            </div>
          </v-col>

          <!-- Card 5 -->
          <v-col cols="12" md="4" class="d-flex justify-center mb-6">
            <div class="flip-card" @click="flipCard(5)" :class="{ 'is-flipped': activeCard === 5 }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="48" color="info" class="mb-4">mdi-school</v-icon>
                  <h2>How can parents and schools help?</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <ul>
                    <li>Teach safe online habits early</li>
                    <li>Monitor digital behavior and apps</li>
                    <li>Encourage open communication</li>
                    <li>Set boundaries for screen time and contacts</li>
                    <li>Stay informed about new online risks</li>
                  </ul>
                </div>
              </div>
            </div>
          </v-col>

          <!-- Card 6 -->
          <v-col cols="12" md="4" class="d-flex justify-center mb-6">
            <div class="flip-card" @click="flipCard(6)" :class="{ 'is-flipped': activeCard === 6 }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="48" color="deep-purple" class="mb-4">mdi-heart-pulse</v-icon>
                  <h2>What are the long-term effects of online grooming?</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <p>Online grooming can lead to serious emotional and psychological consequences, including anxiety, depression, trust issues, and trauma. Victims may feel ashamed or blame themselves. Early support and intervention are key to recovery.</p>
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
            @click="goToGroomingScenario"
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
  name: 'GroomingView',
  data() {
    return {
      activeCard: null,
      cards: [
        {
          id: 1,
          title: 'What is online grooming?',
          content: 'Online grooming is when someone (often an adult) tries to gain the trust of a child or teen online to exploit or abuse them later. They might act friendly, send gifts, or pretend to be someone else to build a relationship.',
          isFlipped: false
        },
        {
          id: 2,
          title: 'How do groomers contact teens?',
          content: 'Groomers use platforms like social media, gaming chats, forums, or direct messages. They may lie about their age or identity to get close to their targets and often move the conversation to private messaging quickly.',
          isFlipped: false
        },
        {
          id: 3,
          title: 'What tactics do groomers use?',
          content: 'Flattery and compliments, gifting money or game credits, asking to keep conversations secret, pretending to share similar interests, making the victim feel special or understood.',
          isFlipped: false
        },
        {
          id: 4,
          title: 'How can I protect myself?',
          content: 'Don\'t share personal info online, keep social media private, be cautious of online strangers, never agree to meet someone you\'ve only met online, tell a trusted adult if something feels wrong.',
          isFlipped: false
        },
        {
          id: 5,
          title: 'How can parents and schools help?',
          content: 'Teach safe online habits early, monitor digital behavior and apps, encourage open communication, set boundaries for screen time and contacts, stay informed about new online risks.',
          isFlipped: false
        },
        {
          id: 6,
          title: 'What are the long-term effects of online grooming?',
          content: 'Online grooming can lead to serious emotional and psychological consequences, including anxiety, depression, trust issues, and trauma. Victims may feel ashamed or blame themselves. Early support and intervention are key to recovery.',
          isFlipped: false
        }
      ],
      newsArticles: [],
      loadingNews: false,
      error: null
    }
  },
  methods: {
    goToGroomingScenario() {
      this.$router.push('/groomingscenario')
    },
    async fetchNews() {
      this.loadingNews = true;
      try {
        const response = await fetch('/api/news');
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
    },
    flipCard(cardId) {
      if (this.activeCard === cardId) {
        this.activeCard = null;
        this.cards = this.cards.map(card => ({
          ...card,
          isFlipped: false
        }));
        return;
      }

      this.cards = this.cards.map(card => ({
        ...card,
        isFlipped: false
      }));

      const cardIndex = this.cards.findIndex(card => card.id === cardId);
      if (cardIndex !== -1) {
        this.cards[cardIndex].isFlipped = true;
        this.activeCard = cardId;
      }
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
  max-width: 1000px;
  margin: 0 auto 1.5rem;
}

.quote-text {
  color: #4a5568;
  font-size: 1.2rem;
  font-style: italic;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem 2rem;
  background-color: rgba(99, 102, 241, 0.05);
  border-left: 4px solid #6366f1;
  border-radius: 4px;
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
  height: 320px;
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
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.flip-card-front {
  background: linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%);
}

.flip-card-back {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  transform: rotateY(180deg);
}

.flip-card-back ul {
  text-align: left;
  margin-top: 0.5rem;
  padding-left: 1.5rem;
}

.flip-card-back li {
  margin: 0.5rem 0;
  text-align: left;
}

.flip-card-back p {
  text-align: left;
  line-height: 1.6;
}

.flip-card h2 {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.next-page-btn {
  padding: 12px 24px !important;
  font-size: 1rem !important;
  font-weight: 500 !important;
  letter-spacing: 0.5px !important;
  text-transform: none !important;
  min-width: 300px !important;
  max-width: 400px !important;
  height: auto !important;
  margin: 0 auto !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
  border-radius: 8px !important;
  background: linear-gradient(135deg, #4682b4, #1a5fb4) !important;
  color: white !important;
  box-shadow: 0 2px 8px rgba(70, 130, 180, 0.25) !important;
  transition: all 0.3s ease !important;
}

.next-page-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 12px rgba(70, 130, 180, 0.35) !important;
  background: linear-gradient(135deg, #5190c4, #2069c4) !important;
}

.next-page-btn .v-icon {
  font-size: 1.2rem !important;
  margin-right: 8px !important;
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

@media (max-width: 960px) {
  .flip-card {
    height: 360px;
  }
}

@media (max-width: 600px) {
  .flip-card {
    margin-bottom: 1rem;
    height: 300px;
  }
  
  .flip-card-front, .flip-card-back {
    padding: 1.5rem;
  }
}
</style>
