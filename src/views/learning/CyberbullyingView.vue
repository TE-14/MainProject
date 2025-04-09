<template>
  <v-container class="py-8 global-container" fluid>
    <v-row>
      <v-col cols="12">
        <div class="page-header text-center responsive-spacing">
          <div class="hero-section">
            <div class="hero-icons">
              <v-icon size="48" color="primary" class="floating-icon left">mdi-shield-account</v-icon>
              <v-icon size="32" color="error" class="floating-icon top">mdi-alert-circle</v-icon>
              <v-icon size="40" color="success" class="floating-icon right">mdi-hand-heart</v-icon>
            </div>
            <h1 class="main-title text-h1">Understanding Cyberbullying</h1>
            <div class="decorative-line"></div>
          </div>
          <p class="intro-text">
            <v-icon color="info" small class="mr-2">mdi-information</v-icon>
            Cyberbullying is when someone uses digital technology to harass, humiliate, threaten, or target another person. It can happen through texts, social media, emails, gaming platforms, or any online space. Unlike in-person bullying, cyberbullying can happen anytime, anywhere — and it often feels harder to escape.
          </p>
          <p class="intro-text mt-4">
            "Cyberbullying doesn't just happen — it spreads. Online posts, group chats, private messages — all of it can be used to hurt someone in ways that last far beyond a screen."
          </p>
        </div>

        <div class="cards-section">
          <div class="cards-grid">
            <!-- Card 1 -->
            <div class="flip-card" @click="card1Flipped = !card1Flipped" :class="{ 'is-flipped': card1Flipped }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="40" color="primary" class="mb-4">mdi-bullhorn-outline</v-icon>
                  <h2>What is Cyberbullying?</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <p>Cyberbullying is any type of bullying that happens online — through messages, posts, videos, or social media. It can include threats, rumors, exclusion, or posting embarrassing content.</p>
                </div>
              </div>
            </div>

            <!-- Card 2 -->
            <div class="flip-card" @click="card2Flipped = !card2Flipped" :class="{ 'is-flipped': card2Flipped }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="40" color="error" class="mb-4">mdi-account-group-outline</v-icon>
                  <h2>Who gets cyberbullied the most?</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <p>Teenagers aged 16 to 17 report the highest levels of online victimization in recent studies — especially those using many platforms.</p>
                </div>
              </div>
            </div>

            <!-- Card 3 -->
            <div class="flip-card" @click="card3Flipped = !card3Flipped" :class="{ 'is-flipped': card3Flipped }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="40" color="info" class="mb-4">mdi-gender-male-female</v-icon>
                  <h2>Does gender affect cyberbullying?</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <p>Cyberbullying affects everyone, but sometimes in different ways. Some data shows males report slightly higher victimization, but girls are more likely to experience emotional forms like exclusion or rumor spreading.</p>
                </div>
              </div>
            </div>

            <!-- Card 4 -->
            <div class="flip-card" @click="card4Flipped = !card4Flipped" :class="{ 'is-flipped': card4Flipped }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="40" color="warning" class="mb-4">mdi-message-alert-outline</v-icon>
                  <h2>What are the warning signs?</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <p>Trolling is when someone posts mean or offensive content just to get a reaction. It might look like a joke, but if it's meant to upset someone, it's not funny — it's bullying.</p>
                </div>
              </div>
            </div>

            <!-- Card 5 -->
            <div class="flip-card" @click="card5Flipped = !card5Flipped" :class="{ 'is-flipped': card5Flipped }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="40" color="deep-purple" class="mb-4">mdi-brain</v-icon>
                  <h2>Mental Health Impact</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <p>Yes. Victims of cyberbullying often feel anxious, depressed, lonely, or angry. It can affect sleep, self-worth, and how safe you feel online — even offline, too.</p>
                </div>
              </div>
            </div>

            <!-- Card 6 -->
            <div class="flip-card" @click="card6Flipped = !card6Flipped" :class="{ 'is-flipped': card6Flipped }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="40" color="success" class="mb-4">mdi-shield-check</v-icon>
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
            <!-- Card 7 -->
            <div class="flip-card" @click="card7Flipped = !card7Flipped" :class="{ 'is-flipped': card7Flipped }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="40" color="orange" class="mb-4">mdi-chat-alert-outline</v-icon>
                  <h2>Types of Cyberbullying</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <p>Yes — in many places, things like online threats, harassment, and defamation break the law. Even if it feels like "just online stuff," cyberbullying can lead to serious consequences.</p>
                </div>
              </div>
            </div>
            <!-- Card 8 -->
            <div class="flip-card" @click="card8Flipped = !card8Flipped" :class="{ 'is-flipped': card8Flipped }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="40" color="red-darken-2" class="mb-4">mdi-hand-back-right</v-icon>
                  <h2>How to Stop Cyberbullying</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <p>Yes. Teens who act without thinking — especially when angry or bored — are more likely to lash out online. That impulsive post or comment? It can become cyberbullying.</p>
                </div>
              </div>
            </div>
            <!-- Card 9 -->
            <div class="flip-card" @click="card9Flipped = !card9Flipped" :class="{ 'is-flipped': card9Flipped }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="40" color="blue-grey" class="mb-4">mdi-school-outline</v-icon>
                  <h2>School's Role</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <p>Blocking is a good first step. But also report abusive content and keep evidence (screenshots) if things escalate. You have a right to feel safe online.</p>
                </div>
              </div>
            </div>
            <!-- Card 10 -->
            <div class="flip-card" @click="card10Flipped = !card10Flipped" :class="{ 'is-flipped': card10Flipped }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="40" color="teal" class="mb-4">mdi-account-child-outline</v-icon>
                  <h2>Parent's Guide</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <p>Sometimes. Ignoring can stop the bully from getting attention, but it doesn't always work. If it keeps happening, block them, report the behavior, and talk to someone you trust.</p>
                </div>
              </div>
            </div>
            <!-- Card 11 -->
            <div class="flip-card" @click="card11Flipped = !card11Flipped" :class="{ 'is-flipped': card11Flipped }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="40" color="pink" class="mb-4">mdi-heart-broken-outline</v-icon>
                  <h2>Emotional Impact</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <p>Jokes can still hurt. If someone feels humiliated or targeted, it might be bullying. Intent doesn't matter as much as impact — be kind and think before posting.</p>
                </div>
              </div>
            </div>
            <!-- Card 12 -->
            <div class="flip-card" @click="card12Flipped = !card12Flipped" :class="{ 'is-flipped': card12Flipped }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="40" color="indigo" class="mb-4">mdi-gavel</v-icon>
                  <h2>Legal Consequences</h2>
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
            <!-- Card 13 -->
            <div class="flip-card" @click="card13Flipped = !card13Flipped" :class="{ 'is-flipped': card13Flipped }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="40" color="cyan" class="mb-4">mdi-lifebuoy</v-icon>
                  <h2>Support Resources</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <p>If it's repeated, targeted, and meant to hurt, it's bullying. One argument might be drama — but consistent teasing, threats, or humiliation online crosses the line.</p>
                </div>
              </div>
            </div>
            <!-- Card 14 -->
            <div class="flip-card" @click="card14Flipped = !card14Flipped" :class="{ 'is-flipped': card14Flipped }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="40" color="deep-orange" class="mb-4">mdi-account-voice</v-icon>
                  <h2>Speaking Up</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <p>Yes. Data shows many teens who are bullied online have also bullied others. It's often a cycle — and understanding this can help break it.</p>
                </div>
              </div>
            </div>
            <!-- Card 15 -->
            <div class="flip-card" @click="card15Flipped = !card15Flipped" :class="{ 'is-flipped': card15Flipped }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="40" color="green" class="mb-4">mdi-handshake</v-icon>
                  <h2>Building Digital Citizenship</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <p>Many teens stay silent due to shame, fear, or not wanting to get others in trouble. But speaking up helps protect you and others.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        

        <div class="text-center mt-12">
          <v-btn
            x-large
            color="primary"
            elevation="2"
            class="next-page-btn responsive-button"
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
      card1Flipped: false,
      card2Flipped: false,
      card3Flipped: false,
      card4Flipped: false,
      card5Flipped: false,
      card6Flipped: false,
      card7Flipped: false,
      card8Flipped: false,
      card9Flipped: false,
      card10Flipped: false,
      card11Flipped: false,
      card12Flipped: false,
      card13Flipped: false,
      card14Flipped: false,
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
  margin-bottom: clamp(2rem, 4vw, 4rem);
}

.main-title {
  font-size: 2.5rem;
  font-weight: 600;
  color: #8b5cf6;
  margin-bottom: 1rem;
  text-align: center;
}

.intro-text {
  color: #2c3e50;
  font-size: 1.1rem;
  line-height: 1.8;
  max-width: min(800px, 90vw);
  margin: 0 auto;
}

.intro-text:last-of-type {
  font-style: italic;
  color: #6366f1;
  font-size: 1rem;
  line-height: 1.6;
}

.hero-section {
  position: relative;
  padding: clamp(1rem, 3vw, 2rem) 0;
  margin-bottom: clamp(1rem, 3vw, 2rem);
}

.hero-icons {
  position: relative;
  height: clamp(80px, 15vw, 120px);
  margin-bottom: clamp(0.5rem, 2vw, 1rem);
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

.cards-section {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  justify-items: center;
  align-items: start;
}

.flip-card {
  width: 100%;
  max-width: 320px;
  height: 280px;
  perspective: 1500px;
  margin: 0;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

.flip-card:hover .flip-card-inner {
  transform: translateY(-5px);
}

.flip-card.is-flipped .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.flip-card-front {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 1px solid rgba(99, 102, 241, 0.1);
}

.flip-card-front::before {
  content: '';
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 24px;
  height: 24px;
  background: rgba(99, 102, 241, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #6366f1;
  opacity: 0.7;
}

.flip-card-front::after {
  content: '↻';
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 16px;
  color: #6366f1;
  opacity: 0.7;
}

.flip-card-back {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  transform: rotateY(180deg);
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.2);
}

.flip-card-front h2 {
  color: #2c3e50;
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  margin-bottom: 0.6rem;
  padding: 0 0.5rem;
  font-weight: 600;
}

.flip-card-front p {
  color: #6366f1;
  font-size: clamp(0.75rem, 1.5vw, 0.85rem);
  opacity: 0.8;
  font-weight: 500;
}

.flip-card-front .v-icon {
  font-size: 28px !important;
  margin-bottom: 0.8rem !important;
  filter: drop-shadow(0 2px 4px rgba(99, 102, 241, 0.2));
}

.flip-card-back p {
  margin-bottom: 0.8rem;
  font-size: clamp(0.8rem, 1.8vw, 0.9rem);
  line-height: 1.4;
  max-width: 95%;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

@keyframes floatLeft {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-10px, -10px); }
}

@keyframes floatRight {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(10px, -10px); }
}

@keyframes floatTop {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.next-page-btn {
  font-size: clamp(1rem, 2vw, 1.2rem);
  padding: clamp(0.6rem, 1.5vw, 0.8rem) clamp(1.2rem, 3vw, 2rem);
  border-radius: 50px;
  text-transform: none;
  letter-spacing: 0.5px;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  color: white;
  transition: all 0.3s ease;
}

.next-page-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(99, 102, 241, 0.4);
}

.next-page-btn .v-icon {
  margin-right: 8px;
  font-size: 1.4rem;
}

.protection-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  text-align: left;
  width: 100%;
}

.protection-list li {
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
}

.protection-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: white;
}

@media (max-width: 1200px) {
  .cards-grid {
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .cards-section {
    padding: 1rem 0.5rem;
  }
  
  .cards-grid {
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
  
  .flip-card {
    max-width: 100%;
    height: 260px;
  }
}

@media (max-width: 480px) {
  .cards-section {
    padding: 0.5rem;
  }
  
  .cards-grid {
    grid-template-columns: 1fr;
  }
  
  .flip-card {
    height: 240px;
  }
}
</style> 
