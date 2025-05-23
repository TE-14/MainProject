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
            <h1 class="main-title">Understanding Cyberbullying</h1>
            <div class="decorative-line"></div>
          </div>
          <p class="intro-text">
            <v-icon color="info" small class="mr-2">mdi-information</v-icon>
            Cyberbullying is when someone uses digital technology to harass, humiliate, threaten, or target another person. It can happen through texts, social media, emails, gaming platforms, or any online space. Unlike in-person bullying, cyberbullying can happen anytime, anywhere — and it often feels harder to escape.
          </p>
          <p class="quote-text">
            <v-icon color="primary" small class="mr-2">mdi-format-quote-open</v-icon>
            "Cyberbullying doesn't just happen — it spreads. Online posts, group chats, private messages — all of it can be used to hurt someone in ways that last far beyond a screen."
            <v-icon color="primary" small class="ml-2">mdi-format-quote-close</v-icon>
          </p>
        </div>

        <v-row justify="center" class="mt-8">
          <!-- Card 2 - Who gets cyberbullied the most? -->
          <v-col cols="12" md="4" class="d-flex justify-center mb-6">
            <div class="flip-card" @click="flipCard(2)" :class="{ 'is-flipped': activeCard === 2 }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="48" color="error" class="mb-4">mdi-account-group-outline</v-icon>
                  <h2>Who gets cyberbullied the most?</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <p>Teenagers aged 16 to 17 report the highest levels of online victimization in recent studies — especially those using many platforms.</p>
                </div>
              </div>
            </div>
          </v-col>

          <!-- Card 3 - Does gender affect cyberbullying? -->
          <v-col cols="12" md="4" class="d-flex justify-center mb-6">
            <div class="flip-card" @click="flipCard(3)" :class="{ 'is-flipped': activeCard === 3 }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="48" color="info" class="mb-4">mdi-gender-male-female</v-icon>
                  <h2>Does gender affect cyberbullying?</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <p>Cyberbullying affects everyone, but sometimes in different ways. Some data shows males report slightly higher victimization, but girls are more likely to experience emotional forms like exclusion or rumor spreading.</p>
                </div>
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="4" class="d-flex justify-center mb-6">
            <div class="flip-card" @click="flipCard(4)" :class="{ 'is-flipped': activeCard === 4 }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="48" color="warning" class="mb-4">mdi-message-alert-outline</v-icon>
                  <h2>What is trolling?</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <p>Trolling is when someone posts mean or offensive content just to get a reaction. It might look like a joke, but if it's meant to upset someone, it's not funny — it's bullying.</p>
                </div>
              </div>
            </div>
          </v-col>

          <!-- Card 5 - Mental Health Impact -->
          <v-col cols="12" md="4" class="d-flex justify-center mb-6">
            <div class="flip-card" @click="flipCard(5)" :class="{ 'is-flipped': activeCard === 5 }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="48" color="deep-purple" class="mb-4">mdi-brain</v-icon>
                  <h2>Mental Health Impact</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <p>Yes. Victims of cyberbullying often feel anxious, depressed, lonely, or angry. It can affect sleep, self-worth, and how safe you feel online — even offline, too.</p>
                </div>
              </div>
            </div>
          </v-col>

          <!-- Card 6 - Prevention Strategies -->
          <v-col cols="12" md="4" class="d-flex justify-center mb-6">
            <div class="flip-card" @click="flipCard(6)" :class="{ 'is-flipped': activeCard === 6 }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="48" color="success" class="mb-4">mdi-shield-check</v-icon>
                  <h2>Prevention Strategies</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <ul class="protection-list">
                    <li>Use privacy settings</li>
                    <li>Think before you post</li>
                    <li>Don't share passwords</li>
                    <li>Block or report bullies</li>
                    <li>Keep proof if something goes wrong</li>
                  </ul>
                </div>
              </div>
            </div>
          </v-col>

          <!-- Card 7 - Types of Cyberbullying -->
          <v-col cols="12" md="4" class="d-flex justify-center mb-6">
            <div class="flip-card" @click="flipCard(7)" :class="{ 'is-flipped': activeCard === 7 }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="48" color="orange" class="mb-4">mdi-chat-alert-outline</v-icon>
                  <h2>Types of Cyberbullying</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <p>Yes — in many places, things like online threats, harassment, and defamation break the law. Even if it feels like "just online stuff," cyberbullying can lead to serious consequences.</p>
                </div>
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="4" class="d-flex justify-center mb-6">
            <div class="flip-card" @click="flipCard(8)" :class="{ 'is-flipped': activeCard === 8 }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="48" color="red-darken-2" class="mb-4">mdi-hand-back-right</v-icon>
                  <h2>Can impulsive behavior lead to bullying?</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <p>Yes. Teens who act without thinking — especially when angry or bored — are more likely to lash out online. That impulsive post or comment? It can become cyberbullying.</p>
                </div>
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="4" class="d-flex justify-center mb-6">
            <div class="flip-card" @click="flipCard(10)" :class="{ 'is-flipped': activeCard === 10 }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="48" color="teal" class="mb-4">mdi-account-child-outline</v-icon>
                  <h2>Is ignoring the bully the best option?</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <p>Sometimes. Ignoring can stop the bully from getting attention, but it doesn't always work. If it keeps happening, block them, report the behavior, and talk to someone you trust.</p>
                </div>
              </div>
            </div>
          </v-col>

          <!-- Card 11 - Emotional Impact -->
          <v-col cols="12" md="4" class="d-flex justify-center mb-6">
            <div class="flip-card" @click="flipCard(11)" :class="{ 'is-flipped': activeCard === 11 }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="48" color="pink" class="mb-4">mdi-heart-broken-outline</v-icon>
                  <h2>Emotional Impact</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <p>Jokes can still hurt. If someone feels humiliated or targeted, it might be bullying. Intent doesn't matter as much as impact — be kind and think before posting.</p>
                </div>
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="4" class="d-flex justify-center mb-6">
            <div class="flip-card" @click="flipCard(12)" :class="{ 'is-flipped': activeCard === 12 }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="48" color="indigo" class="mb-4">mdi-gavel</v-icon>
                  <h2>How can I help a friend who's being bullied online?</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <ul class="protection-list">
                    <li>Listen without judgment</li>
                    <li>Encourage them to save proof</li>
                    <li>Help them report it</li>
                    <li>Remind them it's not their fault</li>
                    <li>Suggest talking to a trusted adult or school counselor</li>
                  </ul>
                </div>
              </div>
            </div>
          </v-col>

          <!-- Card 15 - Building Digital Citizenship -->
          <v-col cols="12" md="4" class="d-flex justify-center mb-6">
            <div class="flip-card" @click="flipCard(15)" :class="{ 'is-flipped': activeCard === 15 }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="48" color="green" class="mb-4">mdi-handshake</v-icon>
                  <h2>Building Digital Citizenship</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <p>Many teens stay silent due to shame, fear, or not wanting to get others in trouble. But speaking up helps protect you and others.</p>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>

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
  name: 'CyberbullyingView',
  data() {
    return {
      activeCard: null,
      cards: [
        {
          id: 2,
          title: 'Who gets cyberbullied the most?',
          content: 'Teenagers aged 16 to 17 report the highest levels of online victimization in recent studies — especially those using many platforms.',
          isFlipped: false
        },
        {
          id: 3,
          title: 'Does gender affect cyberbullying?',
          content: 'Cyberbullying affects everyone, but sometimes in different ways. Some data shows males report slightly higher victimization, but girls are more likely to experience emotional forms like exclusion or rumor spreading.',
          isFlipped: false
        },
        {
          id: 4,
          title: 'What is trolling?',
          content: 'Trolling is when someone posts mean or offensive content just to get a reaction. It might look like a joke, but if it\'s meant to upset someone, it\'s not funny — it\'s bullying.',
          isFlipped: false
        },
        {
          id: 5,
          title: 'Mental Health Impact',
          content: 'Yes. Victims of cyberbullying often feel anxious, depressed, lonely, or angry. It can affect sleep, self-worth, and how safe you feel online — even offline, too.',
          isFlipped: false
        },
        {
          id: 6,
          title: 'Prevention Strategies',
          content: 'Use privacy settings, think before you post, don\'t share passwords, block or report bullies, keep proof if something goes wrong.',
          isFlipped: false
        },
        {
          id: 7,
          title: 'Types of Cyberbullying',
          content: 'Yes — in many places, things like online threats, harassment, and defamation break the law. Even if it feels like "just online stuff," cyberbullying can lead to serious consequences.',
          isFlipped: false
        },
        {
          id: 8,
          title: 'Can impulsive behavior lead to bullying?',
          content: 'Yes. Teens who act without thinking — especially when angry or bored — are more likely to lash out online. That impulsive post or comment? It can become cyberbullying.',
          isFlipped: false
        },
        {
          id: 10,
          title: 'Is ignoring the bully the best option?',
          content: 'Sometimes. Ignoring can stop the bully from getting attention, but it doesn\'t always work. If it keeps happening, block them, report the behavior, and talk to someone you trust.',
          isFlipped: false
        },
        {
          id: 11,
          title: 'Emotional Impact',
          content: 'Jokes can still hurt. If someone feels humiliated or targeted, it might be bullying. Intent doesn\'t matter as much as impact — be kind and think before posting.',
          isFlipped: false
        },
        {
          id: 12,
          title: 'How can I help a friend who\'s being bullied online?',
          content: 'Listen without judgment, encourage them to save proof, help them report it, remind them it\'s not their fault, suggest talking to a trusted adult or school counselor.',
          isFlipped: false
        },
        {
          id: 15,
          title: 'Building Digital Citizenship',
          content: 'Many teens stay silent due to shame, fear, or not wanting to get others in trouble. But speaking up helps protect you and others.',
          isFlipped: false
        }
      ]
    }
  },
  methods: {
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
    },
    goToNextPage() {
      this.$router.push('/cyberbullyingscenario')
    }
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

.protection-list {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}

.protection-list li {
  margin: 0.5rem 0;
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
