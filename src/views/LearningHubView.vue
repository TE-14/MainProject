<template>
  <v-container class="resources-container py-16">
    <!-- 顶部装饰元素 -->
    <div class="decoration-circle circle-1"></div>
    <div class="decoration-circle circle-2"></div>
    
    <!-- 页面标题部分 -->
    <v-row>
      <v-col cols="12" class="text-center mb-12 position-relative">
        <div class="title-badge mb-4">
          <v-icon color="white" size="24">mdi-shield-check</v-icon>
        </div>
        <h1 class="text-h3 font-weight-bold mb-4 animate-title">
          <span class="gradient-text">Learning Resources</span>
        </h1>
        <p class="text-subtitle-1 max-width-md mx-auto description-text">
          Explore <span class="highlight-text">digital security</span> learning resources to enhance your <span class="highlight-text">cybersecurity awareness</span>.
          <br>Let's create a <span class="highlight-text-green">safer online environment</span> together!
          <span class="emoji-icon">🛡️</span>
        </p>
      </v-col>
    </v-row>

    <!-- 资源卡片部分 -->
    <v-row class="justify-center">
      <v-col cols="12" md="6" class="resource-col">
        <v-card class="resource-card h-100" :elevation="0">
          <v-card-text class="pa-6">
            <div class="resource-icon mb-6 cyberbullying-icon">
              <v-icon size="32" color="#673AB7">mdi-message-alert</v-icon>
            </div>
            <div class="card-badge">Popular</div>
            <h3 class="text-h5 font-weight-bold mb-4">
              <span class="title-text-purple">Cyberbullying</span> Prevention
            </h3>
            <p class="text-body-1 mb-4">
              Learn how to identify and respond to cyberbullying behavior, creating a positive online environment. Including:
            </p>
            <ul class="text-body-1 mb-6 feature-list">
              <li>
                <v-icon small color="#673AB7" class="mr-2">mdi-check-circle</v-icon>
                <span class="feature-text">Identify various forms of cyberbullying</span>
              </li>
              <li>
                <v-icon small color="#673AB7" class="mr-2">mdi-check-circle</v-icon>
                <span class="feature-text">Effective strategies to address cyberbullying</span>
              </li>
              <li>
                <v-icon small color="#673AB7" class="mr-2">mdi-check-circle</v-icon>
                <span class="feature-text">How to seek help and support</span>
              </li>
              <li>
                <v-icon small color="#673AB7" class="mr-2">mdi-check-circle</v-icon>
                <span class="feature-text">Build healthy online relationships</span>
              </li>
            </ul>
            <v-btn
              :to="'/learning/cyberbullying'"
              color="deep-purple"
              class="mt-4 learn-btn"
              elevation="0"
              block
            >
              Start Learning
              <v-icon end class="ml-2">mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" class="resource-col">
        <v-card class="resource-card h-100" :elevation="0">
          <v-card-text class="pa-6">
            <div class="resource-icon mb-6 catfishing-icon">
              <v-icon size="32" color="#3b82f6">mdi-account-multiple</v-icon>
            </div>
            <div class="card-badge new">New Course</div>
            <h3 class="text-h5 font-weight-bold mb-4">
              <span class="title-text-blue">Grooming</span> Protection
            </h3>
            <p class="text-body-1 mb-4">
              Learn how to recognize and prevent online grooming to stay safe during digital interactions. Including:
            </p>
            <ul class="text-body-1 mb-6 feature-list">
              <li>
                <v-icon small color="#3b82f6" class="mr-2">mdi-check-circle</v-icon>
                <span class="feature-text">Understand how online grooming begins and develops</span>
              </li>
              <li>
                <v-icon small color="#3b82f6" class="mr-2">mdi-check-circle</v-icon>
                <span class="feature-text">Spot suspicious behavior and manipulation tactics</span>
              </li>
              <li>
                <v-icon small color="#3b82f6" class="mr-2">mdi-check-circle</v-icon>
                <span class="feature-text">Learn how to protect personal boundaries online</span>
              </li>
              <li>
                <v-icon small color="#3b82f6" class="mr-2">mdi-check-circle</v-icon>
                <span class="feature-text"> Stay safe while using social media and messaging apps</span>
              </li>
            </ul>
            <v-btn
              :to="'/learning/grooming'"
              color="info"
              class="mt-4 learn-btn"
              elevation="0"
              block
            >
              Start Learning
              <v-icon end class="ml-2">mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 底部装饰元素 -->
    <div class="decoration-circle circle-3"></div>
    <div class="decoration-circle circle-4"></div>
  </v-container>
</template>

<script>
export default {
  name: 'ResourcesView'
}
</script>

<style scoped>
.resources-container {
  position: relative;
  overflow: hidden;
}

/* 装饰圆圈 */
.decoration-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  z-index: -1;
}

.circle-1 {
  width: 300px;
  height: 300px;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  top: -100px;
  left: -100px;
}

.circle-2 {
  width: 200px;
  height: 200px;
  background: linear-gradient(45deg, #3b82f6, #6366f1);
  top: 10%;
  right: -50px;
}

.circle-3 {
  width: 250px;
  height: 250px;
  background: linear-gradient(45deg, #8b5cf6, #6366f1);
  bottom: -100px;
  right: 10%;
}

.circle-4 {
  width: 150px;
  height: 150px;
  background: linear-gradient(45deg, #6366f1, #3b82f6);
  bottom: 20%;
  left: -50px;
}

/* 标题部分 */
.title-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  margin-bottom: 1rem;
}

.animate-title {
  animation: slideDown 0.6s ease-out;
}

.max-width-md {
  max-width: 600px;
}

/* 添加样式 */
.gradient-text {
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.description-text {
  color: #475569;
  line-height: 1.8;
  font-size: 1.1rem;
}

.highlight-text {
  color: #6366f1;
  font-weight: 600;
}

.highlight-text-green {
  color: #22c55e;
  font-weight: 600;
}

.emoji-icon {
  font-size: 1.2rem;
  margin-left: 0.5rem;
  vertical-align: middle;
}

/* 资源卡片 */
.resource-col {
  animation: slideUp 0.6s ease-out;
}

.resource-card {
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(99, 102, 241, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.resource-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #673AB7, #9575CD);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.resource-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 32px rgba(99, 102, 241, 0.15) !important;
}

.resource-card:hover::before {
  opacity: 1;
}

.card-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: rgba(103, 58, 183, 0.1);
  color: #673AB7;
}

.card-badge.new {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.resource-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: rgba(99, 102, 241, 0.1);
  position: relative;
  overflow: hidden;
}

.resource-icon::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transform: rotate(45deg);
  animation: shine 3s infinite;
}

.resource-icon.cyberbullying-icon {
  background: linear-gradient(135deg, rgba(103, 58, 183, 0.1), rgba(103, 58, 183, 0.2));
  border: 1px solid rgba(103, 58, 183, 0.2);
}

.resource-icon.cyberbullying-icon .v-icon {
  color: #673AB7 !important;
}

.resource-icon.cyberbullying-icon:hover {
  border-color: rgba(103, 58, 183, 0.4);
  box-shadow: 0 8px 16px rgba(103, 58, 183, 0.1);
}

.resource-icon.cyberbullying-icon .card-tag {
  background-color: rgba(103, 58, 183, 0.1);
  color: #673AB7;
}

.resource-icon.cyberbullying-icon .card-action {
  color: #673AB7;
}

.resource-icon.cyberbullying-icon .v-icon {
  color: #673AB7 !important;
}

.catfishing-icon {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.2));
}

/* 特性列表 */
.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding-left: 0;
}

.feature-list li::before {
  display: none;
}

/* 按钮样式 */
.learn-btn {
  border-radius: 12px;
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0;
  height: 48px;
}

.learn-btn:hover {
  transform: translateY(-2px);
}

/* 动画 */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shine {
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) rotate(45deg);
  }
}

@media (max-width: 600px) {
  .resource-card {
    margin-bottom: 1.5rem;
  }
}

.title-text-purple {
  color: #673AB7;
}

.title-text-blue {
  color: #3b82f6;
}

.feature-text {
  color: #475569;
  transition: color 0.3s ease;
}

.feature-list li:hover .feature-text {
  color: #1e293b;
}
</style> 