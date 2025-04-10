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
            <div class="flip-card" @click="card2Flipped = !card2Flipped" :class="{ 'is-flipped': card2Flipped }">
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
            <div class="flip-card" @click="card3Flipped = !card3Flipped" :class="{ 'is-flipped': card3Flipped }">
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
            <div class="flip-card" @click="card4Flipped = !card4Flipped" :class="{ 'is-flipped': card4Flipped }">
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
            <div class="flip-card" @click="card5Flipped = !card5Flipped" :class="{ 'is-flipped': card5Flipped }">
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
            <div class="flip-card" @click="card6Flipped = !card6Flipped" :class="{ 'is-flipped': card6Flipped }">
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
            <div class="flip-card" @click="card7Flipped = !card7Flipped" :class="{ 'is-flipped': card7Flipped }">
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
            <div class="flip-card" @click="card8Flipped = !card8Flipped" :class="{ 'is-flipped': card8Flipped }">
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
            <div class="flip-card" @click="card10Flipped = !card10Flipped" :class="{ 'is-flipped': card10Flipped }">
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
            <div class="flip-card" @click="card11Flipped = !card11Flipped" :class="{ 'is-flipped': card11Flipped }">
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
            <div class="flip-card" @click="card12Flipped = !card12Flipped" :class="{ 'is-flipped': card12Flipped }">
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
            <div class="flip-card" @click="card15Flipped = !card15Flipped" :class="{ 'is-flipped': card15Flipped }">
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
      card2Flipped: false,
      card3Flipped: false,
      card4Flipped: false,
      card5Flipped: false,
      card6Flipped: false,
      card7Flipped: false,
      card8Flipped: false,
      card10Flipped: false,
      card11Flipped: false,
      card12Flipped: false,
      card15Flipped: false,     
    }
  },
  methods: {
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
