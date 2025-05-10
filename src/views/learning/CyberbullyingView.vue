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

        <!-- 新的轮播卡片系统 -->
        <div class="carousel-container">
          <div class="carousel-wrapper">
            <!-- 左右箭头控制 -->
            <div class="carousel-arrow carousel-prev" @click="rotateCarousel('left')">
              <v-icon>mdi-chevron-left</v-icon>
            </div>
            
            <!-- 轮播卡片 -->
            <div class="carousel-cards" ref="carouselRef">
              <div 
                v-for="(card, index) in cards" 
                :key="card.id"
                class="carousel-card"
                :class="{ 
                  'is-center': activeCardIndex === index,
                  'is-left': isLeftCard(index),
                  'is-right': isRightCard(index),
                  'is-far-left': isFarLeftCard(index),
                  'is-far-right': isFarRightCard(index),
                  'is-flipped': card.isFlipped
                }"
                :style="{
                  cursor: getCardCursor(index),
                  ...getCardStyle()
                }"
                @click="handleCardClick(index)"
              >
                <div class="carousel-card-inner">
                  <!-- 卡片正面 -->
                  <div class="carousel-card-front">
                    <v-icon :size="activeCardIndex === index ? 48 : 36" :color="getCardIconColor(card.id)" class="mb-4">{{ getCardIcon(card.id) }}</v-icon>
                    <h2>{{ card.title }}</h2>
                    <div v-if="activeCardIndex === index" class="card-action">
                      <span>Click to learn more</span>
                      <v-icon small class="pulse-icon">mdi-gesture-tap</v-icon>
                    </div>
                  </div>
                  
                  <!-- 卡片背面 -->
                  <div class="carousel-card-back">
                    <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                    <div v-if="card.id === 6 || card.id === 12" class="protection-list-container">
                      <ul class="protection-list">
                        <li v-for="(item, itemIndex) in getListItems(card.id)" :key="itemIndex">{{ item }}</li>
                      </ul>
                    </div>
                    <p v-else>{{ card.content }}</p>
                    <v-btn 
                      small 
                      text 
                      color="white" 
                      class="mt-4" 
                      @click.stop="flipCard(card.id)"
                    >
                      <v-icon small left>mdi-rotate-left</v-icon> Back
                    </v-btn>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 右箭头控制 -->
            <div class="carousel-arrow carousel-next" @click="rotateCarousel('right')">
              <v-icon>mdi-chevron-right</v-icon>
            </div>
          </div>
          
          <!-- 卡片指示器 -->
          <div class="carousel-indicators">
            <div 
              v-for="(card, index) in cards" 
              :key="card.id + '-indicator'"
              class="carousel-indicator-dot"
              :class="{ 'active': activeCardIndex === index }"
              @click="setActiveCard(index)"
            ></div>
          </div>
        </div>

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
      activeCardIndex: 0,
      cards: [
        {
          id: 2,
          title: 'Who gets cyberbullied the most?',
          content: 'Teenagers aged 16 to 17 report the highest levels of online victimization in recent studies — especially those using many platforms.',
          isFlipped: false,
          icon: 'mdi-account-group-outline',
          color: 'error'
        },
        {
          id: 3,
          title: 'Does gender affect cyberbullying?',
          content: 'Cyberbullying affects everyone, but sometimes in different ways. Some data shows males report slightly higher victimization, but girls are more likely to experience emotional forms like exclusion or rumor spreading.',
          isFlipped: false,
          icon: 'mdi-gender-male-female',
          color: 'info'
        },
        {
          id: 4,
          title: 'What is trolling?',
          content: 'Trolling is when someone posts mean or offensive content just to get a reaction. It might look like a joke, but if it\'s meant to upset someone, it\'s not funny — it\'s bullying.',
          isFlipped: false,
          icon: 'mdi-message-alert-outline',
          color: 'warning'
        },
        {
          id: 5,
          title: 'Mental Health Impact',
          content: 'Yes. Victims of cyberbullying often feel anxious, depressed, lonely, or angry. It can affect sleep, self-worth, and how safe you feel online — even offline, too.',
          isFlipped: false,
          icon: 'mdi-brain',
          color: 'deep-purple'
        },
        {
          id: 6,
          title: 'Prevention Strategies',
          content: 'Use privacy settings, think before you post, don\'t share passwords, block or report bullies, keep proof if something goes wrong.',
          isFlipped: false,
          icon: 'mdi-shield-check',
          color: 'success'
        },
        {
          id: 7,
          title: 'Types of Cyberbullying',
          content: 'Yes — in many places, things like online threats, harassment, and defamation break the law. Even if it feels like "just online stuff," cyberbullying can lead to serious consequences.',
          isFlipped: false,
          icon: 'mdi-chat-alert-outline',
          color: 'orange'
        },
        {
          id: 8,
          title: 'Can impulsive behavior lead to bullying?',
          content: 'Yes. Teens who act without thinking — especially when angry or bored — are more likely to lash out online. That impulsive post or comment? It can become cyberbullying.',
          isFlipped: false,
          icon: 'mdi-hand-back-right',
          color: 'red-darken-2'
        },
        {
          id: 10,
          title: 'Is ignoring the bully the best option?',
          content: 'Sometimes. Ignoring can stop the bully from getting attention, but it doesn\'t always work. If it keeps happening, block them, report the behavior, and talk to someone you trust.',
          isFlipped: false,
          icon: 'mdi-account-child-outline',
          color: 'teal'
        },
        {
          id: 11,
          title: 'Emotional Impact',
          content: 'Jokes can still hurt. If someone feels humiliated or targeted, it might be bullying. Intent doesn\'t matter as much as impact — be kind and think before posting.',
          isFlipped: false,
          icon: 'mdi-heart-broken-outline',
          color: 'pink'
        },
        {
          id: 12,
          title: 'How can I help a friend who\'s being bullied online?',
          content: 'Listen without judgment, encourage them to save proof, help them report it, remind them it\'s not their fault, suggest talking to a trusted adult or school counselor.',
          isFlipped: false,
          icon: 'mdi-gavel',
          color: 'indigo'
        },
        {
          id: 15,
          title: 'Building Digital Citizenship',
          content: 'Many teens stay silent due to shame, fear, or not wanting to get others in trouble. But speaking up helps protect you and others.',
          isFlipped: false,
          icon: 'mdi-handshake',
          color: 'green'
        }
      ],
      preventionItems: [
        'Use privacy settings',
        'Think before you post',
        'Don\'t share passwords',
        'Block or report bullies',
        'Keep proof if something goes wrong'
      ],
      helpFriendItems: [
        'Listen without judgment',
        'Encourage them to save proof',
        'Help them report it',
        'Remind them it\'s not their fault',
        'Suggest talking to a trusted adult or school counselor'
      ]
    }
  },
  methods: {
    rotateCarousel(direction) {
      const totalCards = this.cards.length;
      
      // 首先重置所有卡片翻转状态
      this.cards = this.cards.map(card => ({
        ...card,
        isFlipped: false
      }));
      
      if (direction === 'left') {
        this.activeCardIndex = (this.activeCardIndex - 1 + totalCards) % totalCards;
      } else {
        this.activeCardIndex = (this.activeCardIndex + 1) % totalCards;
      }
    },
    
    setActiveCard(index) {
      // 首先重置所有卡片翻转状态
      this.cards = this.cards.map(card => ({
        ...card,
        isFlipped: false
      }));
      this.activeCardIndex = index;
    },
    
    handleCardClick(index) {
      if (this.activeCardIndex === index) {
        // 如果点击的是中心卡片，则翻转
        const cardId = this.cards[index].id;
        this.flipCard(cardId);
      } else {
        // 如果点击的不是中心卡片，则将其设为中心
        this.setActiveCard(index);
      }
    },
    
    flipCard(cardId) {
      const cardIndex = this.cards.findIndex(card => card.id === cardId);
      if (cardIndex !== -1) {
        // 如果这个卡片不是当前激活的，先将其设为激活
        if (this.activeCardIndex !== cardIndex) {
          this.setActiveCard(cardIndex);
          // 短暂延迟后再翻转，让轮播动画先完成
          setTimeout(() => {
            this.performFlip(cardIndex);
          }, 300);
        } else {
          // 如果已经是激活卡片，直接翻转
          this.performFlip(cardIndex);
        }
      }
    },
    
    performFlip(cardIndex) {
      const updatedCards = [...this.cards];
      updatedCards[cardIndex].isFlipped = !updatedCards[cardIndex].isFlipped;
      this.cards = updatedCards;
    },
    
    isLeftCard(index) {
      const totalCards = this.cards.length;
      return (index === (this.activeCardIndex - 1 + totalCards) % totalCards);
    },
    
    isRightCard(index) {
      const totalCards = this.cards.length;
      return (index === (this.activeCardIndex + 1) % totalCards);
    },
    
    isFarLeftCard(index) {
      const totalCards = this.cards.length;
      return (index === (this.activeCardIndex - 2 + totalCards) % totalCards);
    },
    
    isFarRightCard(index) {
      const totalCards = this.cards.length;
      return (index === (this.activeCardIndex + 2) % totalCards);
    },
    
    getCardStyle() {
      // 基础样式，将在CSS类中定义
      return {};
    },
    
    getCardIconColor(cardId) {
      const card = this.cards.find(c => c.id === cardId);
      return card ? card.color : 'primary';
    },
    
    getCardIcon(cardId) {
      const card = this.cards.find(c => c.id === cardId);
      return card ? card.icon : 'mdi-help-circle';
    },
    
    getListItems(cardId) {
      if (cardId === 6) {
        return this.preventionItems;
      } else if (cardId === 12) {
        return this.helpFriendItems;
      }
      return [];
    },
    
    goToNextPage() {
      this.$router.push('/cyberbullyingscenario')
    },

    // 添加hover时改变光标样式
    getCardCursor(index) {
      return this.activeCardIndex === index ? 'pointer' : 'grab';
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
  margin: 1.5rem auto;
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

/* 新增轮播卡片样式 */
.carousel-container {
  position: relative;
  width: 100%;
  height: 500px;
  margin: 2rem auto;
  perspective: 2500px;
}

.carousel-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-cards {
  position: relative;
  width: 100%;
  max-width: 1000px;
  height: 100%;
  margin: 0 auto;
  transform-style: preserve-3d;
  perspective: 2000px;
}

.carousel-card {
  position: absolute;
  width: 300px;
  height: 380px;
  top: 50%;
  left: 50%;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), z-index 0.01s;
  transform-style: preserve-3d;
  cursor: pointer;
  z-index: 1;
  will-change: transform; /* 提高性能 */
  -webkit-font-smoothing: subpixel-antialiased; /* 更平滑的字体 */
  transform-origin: center center;
}

.carousel-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  backface-visibility: hidden;
}

.carousel-card.is-flipped {
  z-index: 20 !important; /* 增加z-index确保翻转时卡片始终显示在最前面 */
  filter: brightness(1) !important; /* 翻转时确保亮度不受影响 */
}

.carousel-card.is-flipped .carousel-card-inner {
  transform: rotateY(180deg);
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.3); /* 增强翻转时的阴影 */
}

.carousel-card-front, .carousel-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  backface-visibility: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: box-shadow 0.6s ease;
}

.carousel-card.is-center .carousel-card-front,
.carousel-card.is-center .carousel-card-back {
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

.carousel-card-front {
  background: white;
  background: linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%);
}

.carousel-card-back {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  transform: rotateY(180deg);
  font-size: 0.95rem;
  overflow-y: auto;
}

.carousel-card h2 {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-align: center;
}

.carousel-card-back p {
  text-align: left;
  line-height: 1.6;
}

/* 中心卡片样式 */
.carousel-card.is-center {
  transform: translate(-50%, -50%) scale(1);
  z-index: 5;
  filter: brightness(1);
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), z-index 0.01s, filter 0.4s ease;
}

/* 左侧卡片样式 */
.carousel-card.is-left {
  transform: translate(-120%, -50%) scale(0.8) rotateY(10deg);
  z-index: 4;
  filter: blur(1px);
  opacity: 0.85;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), z-index 0.01s, filter 0.4s ease, opacity 0.4s ease;
}

/* 右侧卡片样式 */
.carousel-card.is-right {
  transform: translate(20%, -50%) scale(0.8) rotateY(-10deg);
  z-index: 4;
  filter: blur(1px);
  opacity: 0.85;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), z-index 0.01s, filter 0.4s ease, opacity 0.4s ease;
}

/* 更远左侧卡片样式 */
.carousel-card.is-far-left {
  transform: translate(-150%, -50%) scale(0.6) rotateY(20deg);
  z-index: 3;
  filter: blur(2px);
  opacity: 0.7;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), z-index 0.01s, filter 0.4s ease, opacity 0.4s ease;
}

/* 更远右侧卡片样式 */
.carousel-card.is-far-right {
  transform: translate(50%, -50%) scale(0.6) rotateY(-20deg);
  z-index: 3;
  filter: blur(2px);
  opacity: 0.7;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), z-index 0.01s, filter 0.4s ease, opacity 0.4s ease;
}

/* 其他卡片隐藏 */
.carousel-card:not(.is-center):not(.is-left):not(.is-right):not(.is-far-left):not(.is-far-right) {
  transform: translate(-50%, -50%) scale(0) rotateY(0);
  opacity: 0;
  pointer-events: none;
}

/* 轮播指示器 */
.carousel-indicators {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.carousel-indicator-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(99, 102, 241, 0.3);
  margin: 0 4px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.carousel-indicator-dot.active {
  width: 12px;
  height: 12px;
  background-color: rgba(99, 102, 241, 1);
}

/* 轮播箭头 */
.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  transition: all 0.3s ease;
}

.carousel-arrow:hover {
  background-color: rgba(99, 102, 241, 0.9);
  color: white;
}

.carousel-prev {
  left: 20px;
}

.carousel-next {
  right: 20px;
}

/* 卡片动作提示 */
.card-action {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 0.9rem;
  color: rgba(99, 102, 241, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}

.pulse-icon {
  margin-left: 8px;
  animation: pulse 1.5s infinite;
}

/* 列表样式 */
.protection-list-container {
  width: 100%;
  text-align: left;
}

.protection-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.protection-list li {
  margin: 0.5rem 0;
  display: flex;
  align-items: flex-start;
}

.protection-list li:before {
  content: "•";
  margin-right: 0.5rem;
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

/* 动画 */
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

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* 响应式调整 */
@media (max-width: 960px) {
  .carousel-container {
    height: 450px;
  }
  
  .carousel-card {
    width: 280px;
    height: 360px;
  }
  
  .carousel-arrow {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 600px) {
  .carousel-container {
    height: 400px;
  }
  
  .carousel-card {
    width: 250px;
    height: 320px;
  }
  
  .carousel-arrow {
    width: 36px;
    height: 36px;
  }
  
  .carousel-card h2 {
    font-size: 1.2rem;
  }
  
  .carousel-card-front, .carousel-card-back {
    padding: 1.5rem;
  }
}

/* 已移除不必要的动画样式 */
</style> 
