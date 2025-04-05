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

        <div class="content-block light-purple">
          <h2 class="section-title">
            <div class="title-wrapper">
              <div class="icon-group"></div>
              <span class="highlight">What is Phishing?</span>
            </div>
            <small class="subtitle">— The "Invisible Trap" of the Digital Age</small>
          </h2>
          
          <div class="content-text">
            <p class="lead-text">
              Phishing is a type of online fraud where attackers impersonate trusted sources to trick users into providing sensitive information (such as passwords, credit card details, etc.). This attack method often uses social engineering principles to gain users' trust through carefully designed schemes.
            </p>

            <v-row class="mt-6">
              <v-col cols="12" md="6">
                <div class="feature-card">
                  <v-icon color="deep-purple" size="36" class="mb-4">mdi-account-multiple</v-icon>
                  <h3 class="feature-title">Impersonation</h3>
                  <p class="feature-text">Attackers typically pose as trusted institutions or individuals, such as banks, government agencies, or well-known companies. They may use similar domain names, logos, and design styles, making it difficult for victims to distinguish authenticity.</p>
                </div>
              </v-col>

              <v-col cols="12" md="6">
                <div class="feature-card">
                  <v-icon color="deep-purple" size="36" class="mb-4">mdi-clock-outline</v-icon>
                  <h3 class="feature-title">Urgency</h3>
                  <p class="feature-text">Phishing emails or messages often create a sense of urgency, such as "account about to be frozen" or "immediate verification required," forcing victims to make quick decisions under pressure.</p>
                </div>
              </v-col>

              <v-col cols="12" md="6">
                <div class="feature-card">
                  <v-icon color="deep-purple" size="36" class="mb-4">mdi-earth</v-icon>
                  <h3 class="feature-title">Wide Reach</h3>
                  <p class="feature-text">Phishing attacks can target many users simultaneously, using automated tools to send large volumes of phishing emails or messages to increase success rates.</p>
                </div>
              </v-col>

              <v-col cols="12" md="6">
                <div class="feature-card">
                  <v-icon color="deep-purple" size="36" class="mb-4">mdi-shield-alert</v-icon>
                  <h3 class="feature-title">Stealth</h3>
                  <p class="feature-text">Phishing websites and emails may contain malicious links or attachments that, when clicked or downloaded, can lead to personal information theft or device infection.</p>
                </div>
              </v-col>
            </v-row>
          </div>
        </div>

        <div class="content-block light-blue">
          <h2 class="section-title">
            <div class="title-wrapper">
              <div class="icon-group"></div>
              <span class="highlight">Common Types of Phishing</span>
            </div>
            <small class="subtitle">— Diverse Fraud Tactics</small>
          </h2>

          <v-row>
            <v-col cols="12" md="6">
              <div class="feature-card">
                <v-icon color="deep-purple" size="36" class="mb-4">mdi-email-alert</v-icon>
                <h3 class="feature-title">Email Phishing</h3>
                <p class="feature-text">Using emails that impersonate trusted sources to trick users into clicking malicious links or downloading attachments. Common forms include: bank account verification, delivery notifications, bill payments, etc.</p>
              </div>
            </v-col>

            <v-col cols="12" md="6">
              <div class="feature-card">
                <v-icon color="deep-purple" size="36" class="mb-4">mdi-web</v-icon>
                <h3 class="feature-title">Website Phishing</h3>
                <p class="feature-text">Creating fake websites that look similar to legitimate ones to trick users into entering sensitive information. Common targets include: online banking, payment platforms, social media, etc.</p>
              </div>
            </v-col>

            <v-col cols="12" md="6">
              <div class="feature-card">
                <v-icon color="deep-purple" size="36" class="mb-4">mdi-message-text</v-icon>
                <h3 class="feature-title">SMS Phishing</h3>
                <p class="feature-text">Sending phishing links or requesting sensitive information via text messages. Common forms include: prize notifications, delivery tracking, account alerts, etc.</p>
              </div>
            </v-col>

            <v-col cols="12" md="6">
              <div class="feature-card">
                <v-icon color="deep-purple" size="36" class="mb-4">mdi-phone-alert</v-icon>
                <h3 class="feature-title">Voice Phishing</h3>
                <p class="feature-text">Impersonating customer service or law enforcement to trick users into providing personal information or making transfers. Common forms include: account security, law enforcement investigations, prize notifications, etc.</p>
              </div>
            </v-col>
          </v-row>
        </div>

        <div class="content-block light-orange">
          <h2 class="section-title">
            <div class="title-wrapper">
              <div class="icon-group"></div>
              <span class="highlight">The Impact of Phishing</span>
            </div>
            <small class="subtitle">— A Serious Threat</small>
          </h2>

          <v-row>
            <v-col cols="12" md="4">
              <div class="impact-card">
                <div class="impact-icon-wrapper">
                  <v-icon size="40" color="error" class="impact-icon pulse">mdi-currency-usd</v-icon>
                </div>
                <h3 class="impact-title">Financial Loss</h3>
                <div class="impact-indicators">
                  <v-chip small color="deep-orange" text-color="white" class="ma-1">
                    <v-icon left small>mdi-wallet-remove</v-icon>
                    Funds Stolen
                  </v-chip>
                  <v-chip small color="deep-orange" text-color="white" class="ma-1">
                    <v-icon left small>mdi-credit-card-off</v-icon>
                    Credit Card Fraud
                  </v-chip>
                  <v-chip small color="deep-orange" text-color="white" class="ma-1">
                    <v-icon left small>mdi-bank-transfer</v-icon>
                    Account Hacked
                  </v-chip>
                </div>
                <p class="impact-desc mt-4">
                  Phishing attacks can lead to direct financial loss, including stolen bank accounts, credit card fraud, and virtual currency theft. These losses may be difficult to recover and can cause significant economic stress for victims.
                </p>
              </div>
            </v-col>

            <v-col cols="12" md="4">
              <div class="impact-card">
                <div class="impact-icon-wrapper">
                  <v-icon size="40" color="primary" class="impact-icon pulse">mdi-account-lock</v-icon>
                </div>
                <h3 class="impact-title">Information Leakage</h3>
                <div class="impact-indicators">
                  <v-chip small color="primary" text-color="white" class="ma-1">
                    <v-icon left small>mdi-account-key</v-icon>
                    Password Leakage
                  </v-chip>
                  <v-chip small color="primary" text-color="white" class="ma-1">
                    <v-icon left small>mdi-id-card</v-icon>
                    Identity Information Stolen
                  </v-chip>
                  <v-chip small color="primary" text-color="white" class="ma-1">
                    <v-icon left small>mdi-email-lock</v-icon>
                    Email Account Hacked
                  </v-chip>
                </div>
                <p class="impact-desc mt-4">
                  Phishing attacks can lead to the leakage of personal sensitive information, including passwords, identity information, and social security information. These information may be used for identity theft or other criminal activities.
                </p>
              </div>
            </v-col>

            <v-col cols="12" md="4">
              <div class="impact-card">
                <div class="impact-icon-wrapper">
                  <v-icon size="40" color="success" class="impact-icon pulse">mdi-shield-alert</v-icon>
                </div>
                <h3 class="impact-title">Security Risk</h3>
                <div class="impact-indicators">
                  <v-chip small color="success" text-color="white" class="ma-1">
                    <v-icon left small>mdi-virus</v-icon>
                    Device Infection
                  </v-chip>
                  <v-chip small color="success" text-color="white" class="ma-1">
                    <v-icon left small>mdi-network-off</v-icon>
                    Network Damage
                  </v-chip>
                  <v-chip small color="success" text-color="white" class="ma-1">
                    <v-icon left small>mdi-lock-alert</v-icon>
                    System Damage
                  </v-chip>
                </div>
                <p class="impact-desc mt-4">
                  Clicking on phishing links or downloading attachments can lead to device infection, system damage, and even threaten the entire network environment. These security issues may require professional technical support to resolve.
                </p>
              </div>
            </v-col>
          </v-row>
        </div>

        <div class="content-block light-green">
          <h2 class="section-title">
            <div class="title-wrapper">
              <div class="icon-group"></div>
              <span class="highlight">How to Prevent Phishing?</span>
            </div>
            <small class="subtitle">— Security Protection Guide</small>
          </h2>

          <p class="lead-text text-center mb-6">
            <v-icon color="success" class="mr-2">mdi-shield-check</v-icon>
            Be Aware, Learn to Identify! Let's learn these practical prevention methods together:
          </p>

          <v-row>
            <v-col cols="12" md="6">
              <div class="step-card">
                <div class="d-flex align-center mb-4">
                  <div class="step-number">1</div>
                  <h3 class="step-title ml-4">Email Security Prevention</h3>
                </div>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="deep-purple">mdi-email-check</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Carefully check the sender address and email content</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="deep-purple">mdi-link-variant-off</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Do not click suspicious links or download attachments</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="deep-purple">mdi-email-search</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Use email security filtering features</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </div>
            </v-col>

            <v-col cols="12" md="6">
              <div class="step-card">
                <div class="d-flex align-center mb-4">
                  <div class="step-number">2</div>
                  <h3 class="step-title ml-4">Website Security Prevention</h3>
                </div>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="blue">mdi-web-check</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Confirm the website address is correct</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="blue">mdi-lock-check</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Check if the website has a security certificate</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="blue">mdi-bookmark-check</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Use bookmarks to access important websites</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </div>
            </v-col>

            <v-col cols="12" md="6">
              <div class="step-card">
                <div class="d-flex align-center mb-4">
                  <div class="step-number">3</div>
                  <h3 class="step-title ml-4">Personal Information Protection</h3>
                </div>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="green">mdi-key-variant</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Use strong passwords and change them regularly</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="green">mdi-two-factor-authentication</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Enable two-factor authentication</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="green">mdi-shield-account</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Be cautious about sharing personal information</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </div>
            </v-col>

            <v-col cols="12" md="6">
              <div class="step-card">
                <div class="d-flex align-center mb-4">
                  <div class="step-number">4</div>
                  <h3 class="step-title ml-4">Device Security Protection</h3>
                </div>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="orange">mdi-shield-check</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Install and update security software</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="orange">mdi-update</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Keep systems and applications updated in time</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="orange">mdi-backup-restore</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Regularly back up important data</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </div>
            </v-col>
          </v-row>

          <v-card class="reminder-card mt-6" color="info" outlined>
            <v-card-text class="d-flex align-center">
              <v-icon large color="info" class="mr-4">mdi-lightbulb-on</v-icon>
              <div>
                <div class="text-h6 mb-2">Reminder</div>
                <p class="mb-0">Remember, preventing phishing requires constant vigilance! Do not easily believe information from unknown sources, and report suspicious situations to relevant departments. Protecting your personal information is protecting your property safety.</p>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PhishingView'
}
</script>

<style scoped>
.content-block {
  padding: 3rem;
  margin-bottom: 2rem;
  border-radius: 24px;
}

.light-purple {
  background: #f3f0ff !important;
}

.light-blue {
  background: #e3f2fd !important;
}

.light-green {
  background: #e8f5e9 !important;
}

.light-orange {
  background: #fff3e0 !important;
}

.feature-card {
  height: 100%;
  padding: 2rem;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.impact-card {
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 24px !important;
  background: #fff !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
  padding: 2rem !important;
}

.impact-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08) !important;
}

.step-card {
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 24px !important;
  background: #fff !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
  padding: 2rem !important;
}

.step-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08) !important;
}

.step-number {
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
}

.reminder-card {
  border-radius: 24px !important;
  background: #e3f2fd !important;
  margin-top: 2rem !important;
}

.v-card {
  border-radius: 24px !important;
  background: #fff !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
}

.v-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08) !important;
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

.section-title {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title .highlight {
  background: linear-gradient(120deg, #7c4dff, #b388ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.8rem;
  font-weight: bold;
}

.section-title .subtitle {
  color: #666;
  font-size: 1rem;
  margin-top: 0.5rem;
  display: block;
}

.feature-title {
  color: #6366f1;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.feature-text {
  color: #4a5568;
  line-height: 1.6;
}

.impact-title {
  color: #2196f3;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.impact-desc {
  color: #4a5568;
  line-height: 1.6;
}

.step-title {
  color: #6366f1;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
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

.decorative-line {
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  margin: 1rem auto;
  border-radius: 2px;
}

.hero-section {
  margin-bottom: 3rem;
}

.intro-text {
  max-width: 800px;
  margin: 0 auto;
  color: #4a5568;
  line-height: 1.8;
  font-size: 1.1rem;
}
</style> 