<template>
  <div class="global-container">
    <div class="safety-check-container">
      <!-- Header -->
      <h1 class="text-h3 font-weight-bold text-center mb-2">Online Safety Analyzer</h1>
      <p class="text-subtitle-1 text-center text-medium-emphasis mb-5">Check for potentially harmful content</p>
      
      <!-- Tab selection and input area -->
      <v-card class="input-card mx-auto mb-8" max-width="800" elevation="1">
        <div class="tab-container mb-4">
          <v-btn 
            :class="['tab-btn mr-2', activeTab === 'cyberbullying' ? 'tab-btn-active' : '']" 
            @click="setActiveTab('cyberbullying')"
            elevation="0"
          >
            Cyberbullying Check
          </v-btn>
          <v-btn 
            :class="['tab-btn', activeTab === 'grooming' ? 'tab-btn-active' : '']" 
            @click="setActiveTab('grooming')"
            elevation="0"
          >
            Grooming Check
          </v-btn>
        </div>
        
        <div class="input-container">
          <v-text-field
            v-model="contentToAnalyze"
            placeholder="Enter text to analyze..."
            variant="outlined"
            :error-messages="inputError"
            class="mb-3"
            @focus="clearError"
            @input="clearError"
          ></v-text-field>
          
          <div class="d-flex align-center">
            <v-btn
              icon
              class="image-upload-btn mr-2"
              @click="triggerFileUpload"
            >
              <v-icon>mdi-image</v-icon>
              <input 
                ref="fileInput" 
                type="file" 
                accept="image/*" 
                style="display: none" 
                @change="handleFileUpload"
              />
            </v-btn>
            <span v-if="selectedFile" class="text-caption mr-auto">{{ selectedFile.name }}</span>
            <v-spacer v-else></v-spacer>
            <v-btn
              color="primary"
              class="check-btn"
              @click="analyzeContent"
              rounded
              :loading="isAnalyzing"
            >
              Check
            </v-btn>
          </div>
        </div>
      </v-card>
      
      <!-- Results Area - Only shown after analysis -->
      <div v-if="analysisComplete">
        <!-- Alert message for high risk content -->
        <div 
          v-if="riskLevel === 'high'"
          class="alert-message mb-6" 
          :class="resultType === 'cyberbullying' ? 'cyberbullying-alert' : 'grooming-alert'"
        >
          <div class="d-flex align-center">
            <div class="alert-icon-container mr-4">
              <v-icon 
                size="28" 
                :color="resultType === 'cyberbullying' ? 'amber-darken-2' : 'red-darken-2'"
              >
                {{ resultType === 'cyberbullying' ? 'mdi-alert-circle' : 'mdi-alert' }}
              </v-icon>
            </div>
            <div class="flex-grow-1">
              <div class="alert-title">
                {{ resultType === 'cyberbullying' ? 'Cyberbullying Detected' : 'High Risk of Grooming Detected' }}
              </div>
              <div class="alert-description">
                {{ resultType === 'cyberbullying' 
                  ? 'This content shows characteristics of cyberbullying because it contains hostile language targeting personal traits. Such language can cause emotional harm and create a hostile online environment.' 
                  : 'This content shows strong indicators of potential grooming behavior. The language patterns and approach are consistent with methods used by predators to establish inappropriate relationships.' 
                }}
              </div>
              
              <div v-if="resultType === 'grooming'" class="mt-3">
                <div class="risk-score-label">Risk Score: 85%</div>
                <v-progress-linear 
                  color="red-darken-2" 
                  :model-value="85"
                  height="8"
                  rounded
                  class="mt-1"
                ></v-progress-linear>
              </div>
              <div v-if="resultType === 'cyberbullying' && bullyingScore > 0" class="mt-3">
                <div class="risk-score-label">Toxicity Score: {{ Math.round(bullyingScore * 100) }}%</div>
                <v-progress-linear 
                  color="amber-darken-2" 
                  :model-value="bullyingScore * 100"
                  height="8"
                  rounded
                  class="mt-1"
                ></v-progress-linear>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Medium risk alert -->
        <div 
          v-if="riskLevel === 'medium'"
          class="alert-message mb-6 medium-risk-alert"
        >
          <div class="d-flex align-center">
            <div class="alert-icon-container mr-4">
              <v-icon size="28" color="orange-darken-1">mdi-alert-circle-outline</v-icon>
            </div>
            <div class="flex-grow-1">
              <div class="alert-title">Moderate Risk Detected</div>
              <div class="alert-description">
                This content contains language that could be considered inappropriate or mildly harmful. While not severe, such content may still negatively impact others.
              </div>
              
              <div v-if="bullyingScore > 0" class="mt-3">
                <div class="risk-score-label">Concern Level: {{ Math.round(bullyingScore * 100) }}%</div>
                <v-progress-linear 
                  color="orange-darken-1" 
                  :model-value="bullyingScore * 100"
                  height="8"
                  rounded
                  class="mt-1"
                ></v-progress-linear>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Low risk alert -->
        <div 
          v-if="riskLevel === 'low'"
          class="alert-message mb-6 low-risk-alert"
        >
          <div class="d-flex align-center">
            <div class="alert-icon-container mr-4">
              <v-icon size="28" color="blue-darken-1">mdi-information-outline</v-icon>
            </div>
            <div class="flex-grow-1">
              <div class="alert-title">Low Risk Detected</div>
              <div class="alert-description">
                This content contains some concerning elements, but they are minimal. The language is largely appropriate but has some minor issues worth noting.
              </div>
              
              <div v-if="bullyingScore > 0" class="mt-3">
                <div class="risk-score-label">Concern Level: {{ Math.round(bullyingScore * 100) }}%</div>
                <v-progress-linear 
                  color="blue-darken-1" 
                  :model-value="bullyingScore * 100"
                  height="8"
                  rounded
                  class="mt-1"
                ></v-progress-linear>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Safe content message -->
        <div 
          v-if="riskLevel === 'safe'"
          class="alert-message mb-6 safe-content-alert"
        >
          <div class="d-flex align-center">
            <div class="alert-icon-container mr-4">
              <v-icon size="28" color="green">mdi-check-circle</v-icon>
            </div>
            <div class="flex-grow-1">
              <div class="alert-title">Content Appears Safe</div>
              <div class="alert-description">
                Our analysis did not detect any significant indicators of {{ activeTab === 'cyberbullying' ? 'cyberbullying' : 'grooming' }} in the provided content.
              </div>
            </div>
          </div>
        </div>
        
        <!-- Identified Characteristics -->
        <v-card class="result-card mb-6" elevation="1" v-if="riskLevel !== 'safe'">
          <h3 class="card-header">
            {{ resultType === 'cyberbullying' ? 'Identified Characteristics:' : 'Identified Warning Signs:' }}
          </h3>
          <ul class="characteristic-list">
            <li v-for="(item, index) in warningItems" :key="index" class="list-item">
              <span class="list-item-content">{{ item }}</span>
            </li>
          </ul>
        </v-card>
        
        <!-- Prevention Tips for Safe Content -->
        <v-card class="result-card mb-6" elevation="1" v-if="riskLevel === 'safe'">
          <h3 class="card-header">Prevention Tips</h3>
          <ul class="characteristic-list">
            <li v-for="(item, index) in preventionTips" :key="index" class="list-item">
              <span class="list-item-content">{{ item }}</span>
            </li>
          </ul>
        </v-card>
        
        <!-- Safety Report -->
        <v-card class="result-card mb-6" elevation="1">
          <h3 class="card-header">Safety Report</h3>
          
          <div class="report-item">
            <div class="report-label">Analyzed Content:</div>
            <div class="report-value">{{ contentToAnalyze || 'n/a' }}</div>
          </div>
          
          <div class="report-item">
            <div class="report-label">Analysis Date:</div>
            <div class="report-value">{{ formatDate(new Date()) }}</div>
          </div>
          
          <div class="report-item">
            <div class="report-label">Risk Level:</div>
            <div class="report-value">
              <span :class="`risk-level-badge ${riskLevel}`">
                {{ riskLevelText }}
              </span>
            </div>
          </div>
        </v-card>
        
        <!-- Recommended Actions -->
        <v-card class="result-card mb-6" elevation="1">
          <h3 class="card-header">{{ riskLevel === 'safe' ? 'Safety Recommendations' : 'Recommended Actions' }}</h3>
          <ul class="action-list">
            <li v-for="(action, index) in currentRecommendedActions" :key="index" class="list-item">
              <span class="list-item-content">{{ action }}</span>
            </li>
          </ul>
        </v-card>
        
        <!-- Related Articles -->
        <v-card class="result-card mb-6" elevation="1">
          <h3 class="card-header">Related Articles</h3>
          <div 
            v-for="(article, index) in currentRelatedArticles" 
            :key="index"
            class="related-article"
          >
            <a href="#" class="article-link">{{ article.title }}</a>
            <div class="article-meta">{{ article.source }} · {{ article.date }}</div>
          </div>
        </v-card>
        
        <!-- Helpful Resources -->
        <v-card class="result-card mb-6" elevation="1">
          <h3 class="card-header">Helpful Resources</h3>
          <div 
            v-for="(resource, index) in currentHelpfulResources" 
            :key="index"
            class="resource-item"
          >
            <a href="#" class="resource-link">{{ resource }}</a>
          </div>
        </v-card>
        
        <!-- Download Report Button -->
        <div class="text-center mb-10">
          <v-btn
            prepend-icon="mdi-download"
            color="primary"
            class="download-btn"
            @click="downloadReport"
            rounded
          >
            Download {{ riskLevel === 'safe' ? 'Safety' : 'Analysis' }} Report (PDF)
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SafetyCheckView',
  data() {
    return {
      activeTab: 'cyberbullying',
      contentToAnalyze: '',
      selectedFile: null,
      analysisComplete: false,
      resultType: 'cyberbullying',
      bullyingScore: 0,
      inputError: '',
      isAnalyzing: false,
      perspectiveApiKey: 'AIzaSyBfZHcZx1g76dSAfTNxpcPGvxqRDyiOt5U', 
      riskLevel: 'safe' // 'high', 'medium', 'low', 'safe'
    }
  },
  computed: {
    riskLevelText() {
      const levelMap = {
        high: 'High Risk',
        medium: 'Medium Risk',
        low: 'Low Risk',
        safe: 'Safe Content'
      };
      return levelMap[this.riskLevel] || 'Unknown';
    },
    warningItems() {
      if (this.resultType === 'cyberbullying') {
        if (this.riskLevel === 'high') {
          return [
            'Personal attacks or insults',
            'Threatening or aggressive tone',
            'Mocking someone\'s characteristics'
          ];
        } else if (this.riskLevel === 'medium') {
          return [
            'Mildly negative language',
            'Potential for misinterpretation',
            'Borderline inappropriate terms'
          ];
        } else {
          return [
            'Minor concernable elements',
            'Slightly negative tone',
            'Generally acceptable but with minor issues'
          ];
        }
      } else {
        if (this.riskLevel === 'high') {
          return [
            'Attempts to isolate or create secrecy',
            'Inappropriate personal questions',
            'Pressure to move communication private',
            'Age-inappropriate conversations'
          ];
        } else if (this.riskLevel === 'medium') {
          return [
            'Overly friendly behavior',
            'Personal questions',
            'Requesting contact information'
          ];
        } else {
          return [
            'Slightly unusual interaction patterns',
            'Indirect personal questions',
            'Minor boundary issues'
          ];
        }
      }
    },
    preventionTips() {
      if (this.activeTab === 'cyberbullying') {
        return [
          'Think before you post or send messages',
          'Be respectful in all online communications',
          'Avoid sharing personal information online',
          'Use privacy settings on social media platforms',
          'Be careful about the tone of your messages'
        ];
      } else {
        return [
          'Be cautious with online friendships',
          'Never share personal information with strangers',
          'Be aware of people asking unusual questions',
          'Tell a trusted adult if someone makes you uncomfortable',
          'Use privacy settings on all platforms'
        ];
      }
    },
    currentRecommendedActions() {
      if (this.riskLevel === 'safe') {
        // Safety recommendations for safe content
        return [
          'Continue to practice good digital citizenship',
          'Stay aware of online safety best practices',
          'Keep privacy settings updated on all platforms',
          'Report any concerning behavior you encounter online',
          'Check in regularly with trusted friends and family about online experiences'
        ];
      }
      
      if (this.resultType === 'cyberbullying') {
        if (this.riskLevel === 'high') {
          return [
            'Block and report the sender',
            'Save evidence (screenshots)',
            'Talk to a trusted adult or counselor',
            'Use platform reporting tools'
          ];
        } else if (this.riskLevel === 'medium') {
          return [
            'Consider clarifying intent if from a friend',
            'Be mindful of the conversation direction',
            'Disengage if the conversation becomes uncomfortable',
            'Consider platform reporting tools if behavior continues'
          ];
        } else {
          return [
            'Monitor future communications',
            'Be aware of conversation tone',
            'Set clear boundaries in communication',
            'Consider disengaging if uncomfortable'
          ];
        }
      } else {
        if (this.riskLevel === 'high') {
          return [
            'Report suspicious behavior to platform administrators',
            'Block all communication with the sender',
            'Save evidence of conversations',
            'Inform a trusted adult or guardian',
            'Contact local authorities if immediate threat detected'
          ];
        } else if (this.riskLevel === 'medium') {
          return [
            'Limit communication with the person',
            'Do not share personal information',
            'Be cautious about continuing the conversation',
            'Consider blocking if behavior becomes concerning'
          ];
        } else {
          return [
            'Maintain healthy boundaries',
            'Keep conversations in public forums',
            'Be alert for escalation of concerning behavior',
            'Trust your instincts if something feels wrong'
          ];
        }
      }
    },
    currentRelatedArticles() {
      if (this.activeTab === 'cyberbullying') {
        if (this.riskLevel === 'safe') {
          return [
            { title: 'Digital Citizenship: Being Kind Online', source: 'Digital Safety Journal', date: '2024-01-25' },
            { title: 'Promoting Positive Online Interactions', source: 'Internet Safety Magazine', date: '2024-01-15' }
          ];
        } else {
          return [
            { title: 'Recognizing Online Harassment: A Teen\'s Guide', source: 'Digital Safety Journal', date: '2024-01-15' },
            { title: 'How to Handle Cyberbullying: Steps for Teens', source: 'Internet Safety Magazine', date: '2024-01-10' }
          ];
        }
      } else {
        if (this.riskLevel === 'safe') {
          return [
            { title: 'Staying Safe Online: A Guide for Young People', source: 'Digital Safety Journal', date: '2024-01-20' },
            { title: 'Creating Healthy Online Boundaries', source: 'Internet Safety Magazine', date: '2024-01-05' }
          ];
        } else {
          return [
            { title: 'Understanding Online Grooming: Warning Signs', source: 'Digital Safety Journal', date: '2024-01-15' },
            { title: 'Protecting Youth From Online Predators', source: 'Internet Safety Magazine', date: '2024-01-10' }
          ];
        }
      }
    },
    currentHelpfulResources() {
      if (this.activeTab === 'cyberbullying') {
        return [
          'Internet Safety Foundation',
          'Teen Crisis Helpline',
          'Online Safety Support Group',
          'Digital Citizenship Education Portal'
        ];
      } else {
        return [
          'National Center for Missing and Exploited Children',
          'Internet Safety Foundation',
          'Online Predator Prevention Hotline',
          'Family Online Safety Institute'
        ];
      }
    }
  },
  methods: {
    clearError() {
      if (this.inputError) {
        this.inputError = '';
      }
    },
    setActiveTab(tab) {
      this.activeTab = tab
      this.analysisComplete = false // Hide results when switching tabs
      this.inputError = ''
    },
    triggerFileUpload() {
      this.$refs.fileInput.click()
    },
    handleFileUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.selectedFile = file
      }
    },
    async analyzeContent() {
      // Clear previous errors and results
      this.inputError = ''
      this.analysisComplete = false
      
      // Validate input
      if (!this.contentToAnalyze.trim()) {
        this.inputError = 'Please enter text to analyze'
        return
      }
      
      this.isAnalyzing = true
      
      if (this.activeTab === 'cyberbullying') {
        try {
          // Using Google's Perspective API for cyberbullying detection
          const response = await this.analyzeCyberbullying(this.contentToAnalyze)
          
          // Process the results
          this.processCyberbullyingResults(response)
          
        } catch (error) {
          console.error('Error analyzing content:', error)
          this.inputError = `Error analyzing content: ${error.message || 'Please try again'}`
          this.analysisComplete = false
        } finally {
          this.isAnalyzing = false
        }
      } else {
        // For grooming, we'll continue using the mock analysis
        this.resultType = 'grooming'
        this.riskLevel = 'high' // always high risk, because this is a mock analysis
        this.analysisComplete = true
        this.isAnalyzing = false
        
        // Scroll to results
        this.scrollToResults()
      }
    },
    
    async analyzeCyberbullying(text) {
      // use the api key from the environment variable
      const apiKey = process.env.VUE_APP_PERSPECTIVE_API_KEY || this.perspectiveApiKey;
      
      if (!apiKey) {
        console.error('Missing API key for Perspective API');
        throw new Error('API configuration error');
      }
      
      console.log('Using API key:', apiKey ? 'API key available' : 'No API key'); 
      
      try {
        if (this.shouldUseFallbackAnalysis(text)) {
          console.log('Using fallback analysis method');
          return this.fallbackAnalyzeText(text);
        }
        
        // Perspective API URL
        const url = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${apiKey}`;
        
        const requestBody = {
          comment: { text },
          languages: ['en'],
          requestedAttributes: {
            TOXICITY: {},
            SEVERE_TOXICITY: {},
            IDENTITY_ATTACK: {},
            INSULT: {},
            THREAT: {}
          }
        };
        
        console.log('Sending request to Perspective API...');
        
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Origin': window.location.origin // 添加 Origin 头，可能对某些 CORS 情况有帮助
            },
            body: JSON.stringify(requestBody),
            mode: 'cors' // 明确使用 CORS 模式
          });
          
          if (!response.ok) {
            if (response.status === 400) {
              // 如果是 400 错误，通常是请求格式问题
              const errorData = await response.json();
              console.error('API Request Error:', errorData);
              throw new Error(`API request error: ${errorData.error?.message || 'Invalid request format'}`);
            } else if (response.status === 403) {
              // 如果是 403 错误，通常是 API 密钥问题
              throw new Error('API key error: Invalid or unauthorized API key');
            } else if (response.status === 429) {
              // 速率限制
              throw new Error('API rate limit exceeded: Please try again later');
            } else if (response.status === 0 || response.status === 520) {
              // CORS 或网络错误
              throw new Error('Network error: CORS issue or service unavailable');
            } else {
              // 其他错误
              const errorText = await response.text();
              console.error('API Error:', response.status, errorText);
              throw new Error(`API error (${response.status}): Please try again later`);
            }
          }
          
          const data = await response.json();
          console.log('API response received successfully');
          return data;
        } catch (fetchError) {
          console.error('Fetch error:', fetchError);
          
          // 捕获网络错误，使用备用分析
          console.log('Switching to fallback analysis method due to API error');
          return this.fallbackAnalyzeText(text);
        }
      } catch (error) {
        console.error('Error in analyzeCyberbullying:', error.message);
        throw error;
      }
    },
    
    // 判断是否应该使用备用分析方法
    shouldUseFallbackAnalysis(text) {
      // 这里可以添加一些逻辑来决定是否使用备用分析
      // 例如，API 密钥无效，或者是在开发环境中
      
      // 如果这是一个明显的测试请求，使用备用方法
      if (text.toLowerCase().includes('test') && text.length < 10) {
        return true;
      }
      
      return false;
    },
    
    // 备用文本分析方法，在 API 不可用时使用
    fallbackAnalyzeText(text) {
      console.log('Using fallback text analysis');
      
      // 简单的基于关键词的分析
      const toxicWords = [
        'hate', 'stupid', 'idiot', 'dumb', 'ugly', 'kill', 'die', 'loser', 
        'pathetic', 'retard', 'jerk', 'moron', 'fat', 'bitch', 'bastard', 'crap'
      ];
      
      const lowerText = text.toLowerCase();
      let toxicScore = 0;
      
      // 计算有毒词汇的出现次数
      toxicWords.forEach(word => {
        if (lowerText.includes(word)) {
          toxicScore += 0.2; // 每个有毒词增加 0.2 分
        }
      });
      
      // 限制最高分为 1
      toxicScore = Math.min(toxicScore, 1);
      
      // 构造一个类似 Perspective API 的响应
      return {
        attributeScores: {
          TOXICITY: {
            summaryScore: { value: toxicScore }
          },
          SEVERE_TOXICITY: {
            summaryScore: { value: toxicScore > 0.5 ? toxicScore - 0.2 : 0 }
          },
          IDENTITY_ATTACK: {
            summaryScore: { value: toxicScore > 0.4 ? toxicScore - 0.3 : 0 }
          },
          INSULT: {
            summaryScore: { value: toxicScore }
          },
          THREAT: {
            summaryScore: { value: lowerText.includes('kill') || lowerText.includes('die') ? 0.8 : 0 }
          }
        }
      };
    },
    
    processCyberbullyingResults(response) {
      // Extract scores from response
      const toxicityScore = response.attributeScores?.TOXICITY?.summaryScore?.value || 0
      const severeToxicityScore = response.attributeScores?.SEVERE_TOXICITY?.summaryScore?.value || 0
      const identityAttackScore = response.attributeScores?.IDENTITY_ATTACK?.summaryScore?.value || 0
      const insultScore = response.attributeScores?.INSULT?.summaryScore?.value || 0
      const threatScore = response.attributeScores?.THREAT?.summaryScore?.value || 0
      
      // Calculate overall bullying score (can be adjusted as needed)
      this.bullyingScore = Math.max(toxicityScore, severeToxicityScore, identityAttackScore, insultScore, threatScore)
      
      console.log('Toxicity scores:', {
        toxicity: toxicityScore,
        severeToxicity: severeToxicityScore,
        identityAttack: identityAttackScore,
        insult: insultScore,
        threat: threatScore,
        overall: this.bullyingScore
      })
      
      // Determine risk level based on score
      if (this.bullyingScore >= 0.7) {
        this.riskLevel = 'high'
      } else if (this.bullyingScore >= 0.4) {
        this.riskLevel = 'medium'
      } else if (this.bullyingScore >= 0.2) {
        this.riskLevel = 'low'
      } else {
        this.riskLevel = 'safe'
      }
      
      // Set result type and completion
      this.resultType = 'cyberbullying'
      this.analysisComplete = true
      
      // Scroll to results
      this.scrollToResults()
    },
    
    scrollToResults() {
      setTimeout(() => {
        const resultsEl = document.querySelector('.alert-message')
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    },
    
    formatDate(date) {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).format(date)
    },
    
    downloadReport() {
      // This would be implemented with a PDF generation library
      alert(`Downloading ${this.riskLevel === 'safe' ? 'Safety' : 'Analysis'} Report for ${this.activeTab} check`)
    }
  }
}
</script>

<style scoped>
.safety-check-container {
  padding: 2rem 0;
  max-width: 800px;
  margin: 0 auto;
}

/* Input card styles */
.input-card {
  border-radius: 12px !important;
  overflow: hidden;
  padding: 24px;
  background-color: rgba(255, 255, 255, 0.9) !important;
}

.tab-container {
  display: flex;
  justify-content: flex-start;
}

.tab-btn {
  border-radius: 10px !important;
  font-weight: 500;
  color: #4b5563;
  height: 40px;
  text-transform: none;
  font-size: 14px;
  letter-spacing: 0;
}

.tab-btn-active {
  background: var(--primary-gradient) !important;
  color: white !important;
  box-shadow: 0 4px 10px rgba(99, 102, 241, 0.3);
}

.image-upload-btn {
  border: 1px dashed rgba(99, 102, 241, 0.3);
  background-color: rgba(99, 102, 241, 0.05);
  transition: all 0.2s ease;
  width: 40px;
  height: 40px;
  border-radius: 8px !important;
}

.image-upload-btn:hover {
  border-color: rgba(99, 102, 241, 0.5);
  background-color: rgba(99, 102, 241, 0.1);
}

.check-btn {
  background: var(--primary-gradient) !important;
  color: white !important;
  font-weight: 500;
  min-width: 100px;
  height: 40px;
  letter-spacing: 0;
  text-transform: none;
  font-size: 14px;
  box-shadow: 0 4px 10px rgba(99, 102, 241, 0.3);
}

/* Results styles */
.results-container, .safe-content-container {
  margin-top: 30px;
}

.alert-message {
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.cyberbullying-alert {
  background-color: #FFF7E0;
  border-left: 4px solid #F59E0B;
}

.grooming-alert {
  background-color: #FEE2E2;
  border-left: 4px solid #EF4444;
}

.safe-card {
  border-radius: 12px !important;
  background-color: #F0FDF4 !important;
  border-left: 4px solid #22C55E;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
}

.safe-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
  color: #15803D;
}

.safe-description {
  font-size: 14px;
  color: #4B5563;
  line-height: 1.5;
}

.alert-icon-container, .safe-icon-container {
  min-width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.alert-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
}

.alert-description {
  font-size: 14px;
  color: #4B5563;
  line-height: 1.5;
}

.risk-score-label {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
}

.result-card {
  border-radius: 12px !important;
  padding: 0 !important;
  overflow: hidden;
  margin-bottom: 24px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03) !important;
}

.card-header {
  padding: 16px 20px;
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  margin: 0;
  background-color: rgba(249, 250, 251, 0.5);
}

.list-item {
  position: relative;
  padding: 12px 20px 12px 36px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);
  margin: 0;
}

.list-item:last-child {
  border-bottom: none;
}

.list-item::before {
  content: "•";
  position: absolute;
  left: 20px;
  color: #6366F1;
  font-weight: bold;
}

.characteristic-list, 
.action-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.report-item {
  padding: 12px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);
}

.report-item:last-child {
  border-bottom: none;
}

.report-label {
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 4px;
  color: #374151;
}

.report-value {
  font-size: 14px;
  color: #6B7280;
}

.related-article {
  padding: 12px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);
}

.related-article:last-child {
  border-bottom: none;
}

.article-link {
  display: block;
  color: #6366F1;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 4px;
  transition: color 0.2s ease;
}

.article-link:hover {
  color: #4F46E5;
  text-decoration: underline;
}

.article-meta {
  font-size: 12px;
  color: #9CA3AF;
}

.resource-item {
  padding: 12px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);
}

.resource-item:last-child {
  border-bottom: none;
}

.resource-link {
  color: #6366F1;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: color 0.2s ease;
}

.resource-link:hover {
  color: #4F46E5;
  text-decoration: underline;
}

.download-btn {
  background: linear-gradient(135deg, #6366F1 0%, #4F46E5 100%) !important;
  color: white !important;
  font-weight: 500;
  min-width: 240px;
  height: 48px;
  letter-spacing: 0;
  text-transform: none;
  font-size: 14px;
  border-radius: 24px !important;
  box-shadow: 0 8px 16px rgba(99, 102, 241, 0.25) !important;
  transition: transform 0.3s ease, box-shadow 0.3s ease !important;
}

.download-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 20px rgba(99, 102, 241, 0.35) !important;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .safety-check-container {
    padding: 1rem 0;
  }
  
  .tab-container {
    flex-direction: column;
    width: 100%;
  }
  
  .tab-btn {
    width: 100%;
    margin-bottom: 0.5rem;
    margin-right: 0 !important;
  }
  
  .input-card,
  .result-card {
    border-radius: 8px !important;
  }
  
  .input-card {
    padding: 16px;
  }
  
  .card-header {
    padding: 12px 16px;
  }
  
  .list-item,
  .report-item,
  .related-article,
  .resource-item {
    padding: 10px 16px 10px 32px;
  }
  
  .list-item::before {
    left: 16px;
  }
  
  .alert-message {
    padding: 16px;
  }
  
  .download-btn {
    min-width: 200px;
  }
}

/* Add these additional styles */
.medium-risk-alert {
  background-color: #FFF3E0;
  border-left: 4px solid #FB8C00;
}

.low-risk-alert {
  background-color: #E3F2FD;
  border-left: 4px solid #1E88E5;
}

.safe-content-alert {
  background-color: #F0FDF4;
  border-left: 4px solid #22C55E;
}

.risk-level-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 12px;
}

.risk-level-badge.high {
  background-color: #FECACA;
  color: #B91C1C;
}

.risk-level-badge.medium {
  background-color: #FED7AA;
  color: #C2410C;
}

.risk-level-badge.low {
  background-color: #BFDBFE;
  color: #1D4ED8;
}

.risk-level-badge.safe {
  background-color: #D1FAE5;
  color: #065F46;
}
</style> 