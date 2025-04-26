<template>
  <div class="resource-container">
    <!-- 全屏分屏容器 - 只在主页面显示 -->
    <div class="split-screen-container" v-if="$route.name === 'resources'">
      <!-- Cyberbullying Side -->
      <div class="split-panel cyberbullying-panel" @click="navigateTo('cyberbullying-help')">
        <div class="panel-content">
          <h3 class="panel-title">Are you being cyberbullied?</h3>
          <div class="circular-arrow">
            <v-icon size="36" color="white">mdi-arrow-right-circle</v-icon>
          </div>
        </div>
        <div class="panel-overlay"></div>
      </div>

      <!-- Grooming Side -->
      <div class="split-panel grooming-panel" @click="navigateTo('grooming-help')">
        <div class="panel-content">
          <h3 class="panel-title">Are you being groomed online?</h3>
          <div class="circular-arrow">
            <v-icon size="36" color="white">mdi-arrow-right-circle</v-icon>
          </div>
        </div>
        <div class="panel-overlay"></div>
      </div>
    </div>
    
    <!-- 显示子路由内容 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'ResourceView',
  methods: {
    navigateTo(routeName) {
      this.$router.push({ name: routeName })
    }
  }
}
</script>

<style scoped>
.resource-container {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.split-screen-container {
  display: flex;
  width: 100%;
  height: 100vh;
}

.split-panel {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.5s ease;
}

.split-panel:hover {
  flex: 1.2;
}

.split-panel:hover .circular-arrow {
  transform: scale(1.2);
}

.cyberbullying-panel {
  background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('@/assets/cyberbullying-background.jpg');
  background-size: cover;
  background-position: center;
}

.grooming-panel {
  background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('@/assets/grooming-background.jpg');
  background-size: cover;
  background-position: center;
}

.panel-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.panel-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  padding: 20px;
}

.panel-title {
  font-size: 2.5rem;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.circular-arrow {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
}
</style> 