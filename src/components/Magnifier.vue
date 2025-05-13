<template>
  <div 
    v-if="isEnabled"
    ref="magnifierRef"
    class="magnifier"
    :style="magnifierStyle"
  >
    <div class="magnifier-border">
      <div 
        class="magnifier-content"
        :style="contentStyle"
      >
        <div 
          class="page-clone"
          :style="cloneStyle"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

export default {
  name: 'Magnifier',
  props: {
    isEnabled: {
      type: Boolean,
      default: false
    },
    zoomLevel: {
      type: Number,
      default: 1.5
    }
  },
  setup(props) {
    const magnifierRef = ref(null)
    const mousePos = ref({ x: 0, y: 0 })
    const scrollPos = ref({ x: 0, y: 0 })
    const isActive = ref(false)
    let rafId = null

    const magnifierStyle = computed(() => ({
      left: `${mousePos.value.x}px`,
      top: `${mousePos.value.y}px`,
      transform: `translate(-50%, -50%) scale(${isActive.value ? 1 : 0})`
    }))

    const contentStyle = computed(() => ({
      transform: `scale(${props.zoomLevel})`,
      transformOrigin: 'center'
    }))

    const cloneStyle = computed(() => {
      const x = -(mousePos.value.x + scrollPos.value.x) * props.zoomLevel + 100
      const y = -(mousePos.value.y + scrollPos.value.y) * props.zoomLevel + 100
      return {
        transform: `translate(${x}px, ${y}px) scale(${props.zoomLevel})`
      }
    })

    const updatePageClone = () => {
      if (!magnifierRef.value || !props.isEnabled) return

      const pageClone = magnifierRef.value.querySelector('.page-clone')
      if (!pageClone) return

      // 克隆文档内容
      const originalContent = document.documentElement.cloneNode(true)
      
      // 移除放大镜元素
      const magnifiers = originalContent.querySelectorAll('.magnifier')
      magnifiers.forEach(m => m.remove())

      // 清空并添加克隆的内容
      pageClone.innerHTML = ''
      pageClone.appendChild(originalContent)
    }

    const handleMouseMove = (e) => {
      if (!props.isEnabled) return

      if (rafId) {
        cancelAnimationFrame(rafId)
      }

      rafId = requestAnimationFrame(() => {
        mousePos.value = {
          x: e.clientX,
          y: e.clientY
        }

        scrollPos.value = {
          x: window.pageXOffset,
          y: window.pageYOffset
        }

        // 确保放大镜不会超出视口边界
        const magnifierSize = 200 // 放大镜尺寸
        const boundary = 20 // 边界距离
        
        mousePos.value.x = Math.max(magnifierSize/2 + boundary, 
          Math.min(mousePos.value.x, window.innerWidth - magnifierSize/2 - boundary))
        mousePos.value.y = Math.max(magnifierSize/2 + boundary, 
          Math.min(mousePos.value.y, window.innerHeight - magnifierSize/2 - boundary))

        if (!isActive.value) {
          isActive.value = true
        }
        updatePageClone()

        rafId = null
      })
    }

    const handleScroll = () => {
      if (!props.isEnabled) return
      
      scrollPos.value = {
        x: window.pageXOffset,
        y: window.pageYOffset
      }
      updatePageClone()
    }

    onMounted(async () => {
      await nextTick()

      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('scroll', handleScroll, { passive: true })

      // 初始化位置为视口中心
      mousePos.value = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      }
      scrollPos.value = {
        x: window.pageXOffset,
        y: window.pageYOffset
      }

      updatePageClone()
    })

    onUnmounted(() => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)

      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    })

    return {
      magnifierRef,
      magnifierStyle,
      contentStyle,
      cloneStyle
    }
  }
}
</script>

<style scoped>
.magnifier {
  position: fixed;
  width: 200px;
  height: 200px;
  pointer-events: none;
  z-index: 99999;
  transition: transform 0.15s ease-out;
  will-change: transform;
}

.magnifier-border {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: white;
  overflow: hidden;
  border: 2px solid rgba(0, 0, 0, 0.3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.magnifier-content {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  will-change: transform;
  border-radius: 50%;
  background-color: white;
}

.page-clone {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  transform-origin: top left;
  will-change: transform;
  pointer-events: none;
}

.page-clone :deep(*) {
  transition: none !important;
  animation: none !important;
}

:deep(.dark-mode) .magnifier-border {
  background: #1a1a1a;
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

:deep(.dark-mode) .magnifier-content {
  background-color: #1a1a1a;
}
</style> 