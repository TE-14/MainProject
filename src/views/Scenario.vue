<template>
  <v-container class="py-16" fluid>
    <!-- Header Area -->
    <div class="scenario-header text-center mb-12">
      <span class="header-badge">INTERACTIVE TRAINING</span>
      <h1 class="scenario-title mt-3">Safety Training Scenarios</h1>
      <p class="scenario-subtitle">Enhance your ability to respond to cybersecurity challenges through simulated situations</p>
    </div>
    
    <!-- Main Content Area -->
    <v-row>
      <!-- Top Banner -->
      <v-col cols="12" class="px-6 mb-10">
        <div class="scenario-banner d-flex align-center">
          <div class="banner-content">
            <h2 class="banner-title">Choose Your Safety Training Scenario</h2>
            <p class="banner-text">These interactive scenarios will help you respond to real online challenges</p>
          </div>
          <div class="banner-decoration">
            <div class="banner-circle"></div>
            <div class="banner-circle-sm"></div>
          </div>
        </div>
      </v-col>
      
      <!-- Left Card - Cyberbullying -->
      <v-col cols="12" md="6" class="px-6">
        <div class="scenario-card cyberbullying-theme">
          <div class="card-header">
            <div class="card-theme-indicator"></div>
            <h3 class="card-title">Cyberbullying Prevention</h3>
          </div>
          
          <div class="card-media">
            <div class="media-overlay"></div>
            <img src="@/assets/images/cyberbullying.jpg" alt="Cyberbullying" class="card-image">
            <div class="media-tag">POPULAR TRAINING</div>
          </div>
          
          <div class="card-content">
            <p class="content-description">
              Learn how to identify cyberbullying situations, respond effectively, and support others who may be experiencing online harassment. This scenario-based training will help you develop strategies to create a positive digital environment.
            </p>
            
            <div class="content-divider"></div>
            
            <ul class="content-features">
              <li>
                <v-icon color="#FF5252" size="20" class="feature-icon">mdi-alert-circle</v-icon>
                <span>Recognize different forms of cyberbullying</span>
              </li>
              <li>
                <v-icon color="#FF5252" size="20" class="feature-icon">mdi-alert-circle</v-icon>
                <span>Learn appropriate responses to online harassment</span>
              </li>
              <li>
                <v-icon color="#FF5252" size="20" class="feature-icon">mdi-alert-circle</v-icon>
                <span>Understand the impact of digital actions</span>
              </li>
            </ul>
          </div>
          
          <div class="card-actions">
            <v-btn
              block
              color="#FF5252"
              elevation="0"
              height="56"
              class="action-button white--text"
              @click="navigateTo('/cyberbullyingscenario')"
            >
              Start Cyberbullying Prevention Training
              <v-icon right color="white">mdi-arrow-right</v-icon>
            </v-btn>
          </div>
        </div>
      </v-col>
      
      <!-- Right Card - Grooming -->
      <v-col cols="12" md="6" class="px-6">
        <div class="scenario-card grooming-theme">
          <div class="card-header">
            <div class="card-theme-indicator"></div>
            <h3 class="card-title">Online Grooming Protection</h3>
          </div>
          
          <div class="card-media">
            <div class="media-overlay"></div>
            <img src="@/assets/images/catfishing.jpg" alt="Online Grooming" class="card-image">
            <div class="media-tag grooming-tag">SAFETY AWARENESS</div>
          </div>
          
          <div class="card-content">
            <p class="content-description">
              Learn to identify and protect yourself from online grooming tactics. Understand how predators attempt to manipulate relationships online and develop skills to maintain your safety in digital interactions.
            </p>
            
            <div class="content-divider grooming-divider"></div>
            
            <ul class="content-features">
              <li>
                <v-icon color="#1E88E5" size="20" class="feature-icon">mdi-shield-check</v-icon>
                <span>Identify warning signs of online grooming</span>
              </li>
              <li>
                <v-icon color="#1E88E5" size="20" class="feature-icon">mdi-shield-check</v-icon>
                <span>Learn appropriate boundary-setting techniques</span>
              </li>
              <li>
                <v-icon color="#1E88E5" size="20" class="feature-icon">mdi-shield-check</v-icon>
                <span>Develop strategies for safe online interactions</span>
              </li>
            </ul>
          </div>
          
          <div class="card-actions">
            <v-btn
              block
              color="#1E88E5"
              elevation="0"
              height="56"
              class="action-button white--text"
              @click="navigateTo('/groomingscenario')"
            >
              Start Grooming Protection Training
              <v-icon right color="white">mdi-arrow-right</v-icon>
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
    
    <!-- Bottom Info Section -->
    <v-row class="mt-12">
      <v-col cols="12">
        <div class="info-section">
          <div class="info-content">
            <h3 class="info-title">Why Scenario-Based Learning?</h3>
            <div class="info-grid">
              <div class="info-item">
                <div class="item-icon">
                  <v-icon color="white" size="24">mdi-head-cog</v-icon>
                </div>
                <div class="item-text">
                  <h4>Decision Practice</h4>
                  <p>Practice responding to realistic situations in a simulated environment</p>
                </div>
              </div>
              
              <div class="info-item">
                <div class="item-icon">
                  <v-icon color="white" size="24">mdi-comment-check</v-icon>
                </div>
                <div class="item-text">
                  <h4>Immediate Feedback</h4>
                  <p>Get timely assessment on your choices</p>
                </div>
              </div>
              
              <div class="info-item">
                <div class="item-icon">
                  <v-icon color="white" size="24">mdi-shield-star</v-icon>
                </div>
                <div class="item-text">
                  <h4>Build Confidence</h4>
                  <p>Improve your ability to handle online safety challenges</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ScenarioView',
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    }
  }
}
</script>

<style scoped>
/* Header Area Styles */
.scenario-header {
  position: relative;
  margin-bottom: 3rem;
}

.header-badge {
  display: inline-block;
  background: linear-gradient(135deg, #8E2DE2, #4A00E0);
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 8px 20px;
  border-radius: 30px;
  letter-spacing: 1px;
  box-shadow: 0 4px 10px rgba(142, 45, 226, 0.3);
}

.scenario-title {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #8E2DE2, #4A00E0);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 1rem 0;
}

.scenario-subtitle {
  font-size: 1.25rem;
  color: #555;
  max-width: 650px;
  margin: 0 auto;
}

/* Banner Area Styles */
.scenario-banner {
  background: linear-gradient(135deg, #43CBFF, #9708CC);
  border-radius: 16px;
  padding: 2.5rem 3rem;
  position: relative;
  overflow: hidden;
  height: 180px;
  margin-bottom: 1rem;
}

.banner-content {
  position: relative;
  z-index: 2;
  max-width: 70%;
}

.banner-title {
  color: white;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.banner-text {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  max-width: 500px;
}

.banner-decoration {
  position: absolute;
  right: 3rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}

.banner-circle {
  position: absolute;
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  right: -50px;
  top: -100px;
}

.banner-circle-sm {
  position: absolute;
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  right: 50px;
  top: 20px;
}

/* Card Styles */
.scenario-card {
  border-radius: 20px;
  overflow: hidden;
  background: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.cyberbullying-theme:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(255, 82, 82, 0.15);
}

.grooming-theme:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(30, 136, 229, 0.15);
}

.card-header {
  display: flex;
  align-items: center;
  padding: 1.5rem;
}

.card-theme-indicator {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 12px;
}

.cyberbullying-theme .card-theme-indicator {
  background: linear-gradient(135deg, #FF9A8B, #FF5252);
}

.grooming-theme .card-theme-indicator {
  background: linear-gradient(135deg, #56CCF2, #1E88E5);
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.cyberbullying-theme .card-title {
  color: #FF5252;
}

.grooming-theme .card-title {
  color: #1E88E5;
}

.card-media {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.media-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5));
  z-index: 1;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.media-tag {
  position: absolute;
  bottom: 16px;
  left: 16px;
  background: rgba(255, 82, 82, 0.9);
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  z-index: 2;
}

.grooming-tag {
  background: rgba(30, 136, 229, 0.9);
}

.card-content {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.content-description {
  color: #555;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.content-divider {
  height: 3px;
  width: 80px;
  background: #FF5252;
  margin-bottom: 1.5rem;
  border-radius: 3px;
}

.grooming-divider {
  background: #1E88E5;
}

.content-features {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
}

.content-features li {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.content-features li:last-child {
  margin-bottom: 0;
}

.feature-icon {
  margin-right: 12px;
  min-width: 20px;
}

.card-actions {
  padding: 1.5rem;
}

.action-button {
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: none;
}

/* Bottom Info Section Styles */
.info-section {
  background: linear-gradient(135deg, #8E2DE2, #4A00E0);
  border-radius: 20px;
  padding: 3rem;
  color: white;
}

.info-title {
  font-size: 1.75rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2.5rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.info-item {
  display: flex;
  align-items: flex-start;
}

.item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.15);
  margin-right: 1rem;
  margin-top: 0.25rem;
}

.item-text h4 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.item-text p {
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

/* Responsive Adjustments */
@media (max-width: 960px) {
  .scenario-title {
    font-size: 2.25rem;
  }
  
  .scenario-banner {
    padding: 2rem;
    height: auto;
  }
  
  .banner-content {
    max-width: 100%;
  }
  
  .banner-title {
    font-size: 1.5rem;
  }
  
  .banner-decoration {
    display: none;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 600px) {
  .scenario-card {
    margin-bottom: 2rem;
  }
}
</style>
