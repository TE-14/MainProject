<template>
  <div class="global-container">
    <div class="safety-check-container">
      <!-- Add PDF component -->
      <SafetyReportPDF ref="safetyReportPDF" />
      
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
          <div class="search-bar-container">
            <v-text-field
              v-model="contentToAnalyze"
              placeholder="Enter text to analyze..."
              variant="outlined"
              :error-messages="inputError"
              class="google-style-input"
              @focus="clearError"
              @input="clearError"
              hide-details
            >
              <template v-slot:append-inner>
                <div class="d-flex align-center">
                  <!-- 添加相机图标按钮用于上传图片 -->
                  <v-btn
                    v-if="!selectedFile"
                    icon
                    density="comfortable"
                    class="image-upload-btn mr-2"
                    @click.stop="triggerFileUpload"
                    title="Upload image"
                  >
                    <v-icon>mdi-image-search</v-icon>
                    <input 
                      ref="fileInput" 
                      type="file" 
                      accept="image/*" 
                      style="display: none" 
                      @change="handleFileUpload"
                    />
                  </v-btn>
                </div>
              </template>
            </v-text-field>

            <!-- 检查按钮放在外面，更符合Google搜索的样式 -->
            <v-btn
              color="primary"
              class="check-btn ml-2"
              @click="analyzeContent"
              rounded
              :loading="isAnalyzing"
            >
              Check
            </v-btn>
          </div>
          
          <!-- 已选择图片预览区域 -->
          <div v-if="selectedFile" class="selected-file-preview mt-2">
            <div class="d-flex align-center">
              <div class="image-preview-wrapper mr-3">
                <img 
                  :src="selectedFilePreview" 
                  alt="Selected file preview" 
                  class="preview-image"
                />
              </div>
              <div class="file-info">
                <div class="file-name">{{ selectedFile.name }}</div>
                <div v-if="isExtractingText" class="d-flex align-center mt-1">
                  <v-progress-linear indeterminate color="primary" height="3" class="mb-1"></v-progress-linear>
                  <span class="text-caption ml-2">Extracting text...</span>
                </div>
              </div>
              <v-spacer></v-spacer>
              <v-btn
                icon
                size="small"
                class="remove-btn"
                @click.prevent="removeSelectedFile"
                title="Remove file"
              >
                <v-icon size="small">mdi-close</v-icon>
              </v-btn>
            </div>
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
                <div class="risk-score-label">Risk Score: {{ Math.round(bullyingScore * 100) }}%</div>
                <v-progress-linear 
                  color="red-darken-2" 
                  :model-value="bullyingScore * 100"
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
            <div class="report-value">{{ displayContent || 'n/a' }}</div>
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
        
        <!-- Cyberbullying/Grooming Risks and Protective Strategies -->
        <v-card class="result-card mb-6" elevation="1">
          <h3 class="card-header">{{ activeTab === 'cyberbullying' ? 'Cyberbullying Risks and Protective Strategies' : 'Online Grooming Risks and Protective Strategies' }}</h3>
          <div class="strategy-list">
            <div v-if="activeTab === 'cyberbullying'">
              <!-- Cyberbullying Strategies -->
              <!-- Strategy 1 -->
              <div class="strategy-item">
                <div class="strategy-title">Understand the Forms of Cyberbullying</div>
                <div class="strategy-description">
                  Recognize different forms of cyberbullying, such as harassment, impersonation, and social exclusion, to act early and effectively.
                </div>
                <div class="strategy-action">
                  <strong>Action:</strong> Discuss different types of cyberbullying with teens and how to respond safely.
                </div>
                <div class="strategy-source">
                  <em>Source: Cyberbullying Research Center, "Preventing Cyberbullying: Top Ten Tips for Teens", 2024</em>
                  <a href="https://cyberbullying.org/preventing-cyberbullying-top-ten-tips-for-teens" target="_blank" class="source-link">View Source</a>
                </div>
              </div>

              <!-- Strategy 2 -->
              <div class="strategy-item">
                <div class="strategy-title">Save Evidence and Report It</div>
                <div class="strategy-description">
                  Document incidents by saving screenshots, chat logs, and timestamps to report through proper channels.
                </div>
                <div class="strategy-action">
                  <strong>Action:</strong> Teach young users how to gather evidence safely before blocking an aggressor.
                </div>
                <div class="strategy-source">
                  <em>Source: UNICEF, "How to Stop Cyberbullying", 2024</em>
                  <a href="https://www.unicef.org/end-violence/how-to-stop-cyberbullying" target="_blank" class="source-link">View Source</a>
                </div>
              </div>

              <!-- Strategy 3 -->
              <div class="strategy-item">
                <div class="strategy-title">Avoid Emotional Posting</div>
                <div class="strategy-description">
                  Posting while angry or upset can escalate conflicts and cause regret. Encourage pausing before posting.
                </div>
                <div class="strategy-action">
                  <strong>Action:</strong> Introduce a "cool-down rule" before posting sensitive or emotional content online.
                </div>
                <div class="strategy-source">
                  <em>Source: Cyberbullying Research Center, "Standing Up to Cyberbullying: Tips for Teens", 2024</em>
                  <a href="https://cyberbullying.org/standing-up-to-cyberbullying" target="_blank" class="source-link">View Source</a>
                </div>
              </div>

              <!-- Strategy 4 -->
              <div class="strategy-item">
                <div class="strategy-title">Recognize Warning Signs</div>
                <div class="strategy-description">
                  Signs of cyberbullying include frequent use of negative predictive text, hostile emojis, or abrupt changes in online behavior.
                </div>
                <div class="strategy-action">
                  <strong>Action:</strong> Monitor digital interactions and encourage open conversations when warning signs appear.
                </div>
                <div class="strategy-source">
                  <em>Source: The Sun, "Signs Your Child Is a Cyberbullying Victim", 2024</em>
                  <a href="https://www.thesun.co.uk/tech/cyberbullying-signs" target="_blank" class="source-link">View Source</a>
                </div>
              </div>

              <!-- Strategy 5 -->
              <div class="strategy-item">
                <div class="strategy-title">Protect Your Passwords</div>
                <div class="strategy-description">
                  Sharing passwords even with trusted friends can lead to misuse or identity theft.
                </div>
                <div class="strategy-action">
                  <strong>Action:</strong> Emphasize the importance of keeping passwords confidential and changing them regularly.
                </div>
                <div class="strategy-source">
                  <em>Source: Cyberbullying Research Center, "Password Safety: Top Ten Tips for Teens", 2024</em>
                  <a href="https://cyberbullying.org/password-safety" target="_blank" class="source-link">View Source</a>
                </div>
              </div>

              <!-- Strategy 6 -->
              <div class="strategy-item">
                <div class="strategy-title">Encourage Open Communication</div>
                <div class="strategy-description">
                  Maintaining open lines of communication helps young people feel safe to report online issues without fear.
                </div>
                <div class="strategy-action">
                  <strong>Action:</strong> Create a trusted environment where teens know they can seek help when needed.
                </div>
                <div class="strategy-source">
                  <em>Source: National Crime Prevention Council, "Cyberbullying Tips for Teens", 2017</em>
                  <a href="https://www.ncpc.org/resources/cyberbullying" target="_blank" class="source-link">View Source</a>
                </div>
              </div>

              <!-- Strategy 7 -->
              <div class="strategy-item">
                <div class="strategy-title">Use Social Media Privacy Settings</div>
                <div class="strategy-description">
                  Setting stricter privacy controls helps limit unwanted interactions and exposure to risks.
                </div>
                <div class="strategy-action">
                  <strong>Action:</strong> Regularly review and adjust privacy settings on all social media platforms.
                </div>
                <div class="strategy-source">
                  <em>Source: StopBullying.gov, "How to Prevent Cyberbullying", 2024</em>
                  <a href="https://www.stopbullying.gov/cyberbullying/prevention" target="_blank" class="source-link">View Source</a>
                </div>
              </div>
            </div>

            <div v-else>
              <!-- Grooming Strategies -->
              <!-- Strategy 1 -->
              <div class="strategy-item">
                <div class="strategy-title">Educate About Online Grooming Risks</div>
                <div class="strategy-description">
                  Children must understand the dangers of sharing personal information online and how grooming works.
                </div>
                <div class="strategy-action">
                  <strong>Action:</strong> Use age-appropriate examples to explain grooming tactics and risks.
                </div>
                <div class="strategy-source">
                  <em>Source: Internet Matters, "Protect Your Child from Online Grooming", 2024</em>
                  <a href="https://www.internetmatters.org/issues/online-grooming" target="_blank" class="source-link">View Source</a>
                </div>
              </div>

              <!-- Strategy 2 -->
              <div class="strategy-item">
                <div class="strategy-title">Encourage Reporting Suspicious Behavior</div>
                <div class="strategy-description">
                  Children should be empowered to report any suspicious online approach to parents or trusted adults.
                </div>
                <div class="strategy-action">
                  <strong>Action:</strong> Make it clear that reporting strange behavior is safe and encouraged.
                </div>
                <div class="strategy-source">
                  <em>Source: NSPCC, "Online Grooming - Keep Your Child Safe", 2024</em>
                  <a href="https://www.nspcc.org.uk/keeping-children-safe/online-safety/online-grooming" target="_blank" class="source-link">View Source</a>
                </div>
              </div>

              <!-- Strategy 3 -->
              <div class="strategy-item">
                <div class="strategy-title">Set and Regularly Review Privacy Settings</div>
                <div class="strategy-description">
                  Regularly updating device privacy settings helps prevent contact from strangers.
                </div>
                <div class="strategy-action">
                  <strong>Action:</strong> Review privacy settings together with children at regular intervals.
                </div>
                <div class="strategy-source">
                  <em>Source: Netsafe, "Grooming - Online Abuse and Harassment", 2024</em>
                  <a href="https://www.netsafe.org.nz/grooming" target="_blank" class="source-link">View Source</a>
                </div>
              </div>

              <!-- Strategy 4 -->
              <div class="strategy-item">
                <div class="strategy-title">Avoid Private or Inappropriate Online Conversations</div>
                <div class="strategy-description">
                  Private chats can be a grooming risk. Teach children to be cautious and recognize inappropriate approaches.
                </div>
                <div class="strategy-action">
                  <strong>Action:</strong> Encourage children to leave any conversation that feels uncomfortable.
                </div>
                <div class="strategy-source">
                  <em>Source: Childline, "Online Grooming Safety Advice", 2024</em>
                  <a href="https://www.childline.org.uk/info-advice/bullying-abuse-safety/online-mobile-safety/online-grooming" target="_blank" class="source-link">View Source</a>
                </div>
              </div>

              <!-- Strategy 5 -->
              <div class="strategy-item">
                <div class="strategy-title">Establish Internet Usage Rules</div>
                <div class="strategy-description">
                  Setting clear boundaries around device use helps reduce exposure to unsafe environments.
                </div>
                <div class="strategy-action">
                  <strong>Action:</strong> Develop family internet usage agreements, including time limits and approved platforms.
                </div>
                <div class="strategy-source">
                  <em>Source: The Children's Society, "Preventing Child Sexual Exploitation: Online Safety", 2024</em>
                  <a href="https://www.childrenssociety.org.uk/what-we-do/our-work/child-criminal-exploitation-and-county-lines/online-safety" target="_blank" class="source-link">View Source</a>
                </div>
              </div>

              <!-- Strategy 6 -->
              <div class="strategy-item">
                <div class="strategy-title">Warn Against Manipulative Behavior</div>
                <div class="strategy-description">
                  Strangers offering gifts or constant attention online may be attempting grooming tactics.
                </div>
                <div class="strategy-action">
                  <strong>Action:</strong> Teach children that genuine friendships do not involve secret gifts or pressure.
                </div>
                <div class="strategy-source">
                  <em>Source: Safe Austin, "What is Grooming: Online Safety for Kids", 2024</em>
                  <a href="https://www.safeaustin.org/our-services/prevention-and-education/online-safety" target="_blank" class="source-link">View Source</a>
                </div>
              </div>

              <!-- Strategy 7 -->
              <div class="strategy-item">
                <div class="strategy-title">Maintain Regular Online Check-ins</div>
                <div class="strategy-description">
                  Frequent discussions about online activity help detect issues early and foster trust.
                </div>
                <div class="strategy-action">
                  <strong>Action:</strong> Ask about online experiences during regular family conversations.
                </div>
                <div class="strategy-source">
                  <em>Source: FBI Safe Online Surfing Program, "SOS - Safe Online Surfing", 2024</em>
                  <a href="https://sos.fbi.gov" target="_blank" class="source-link">View Source</a>
                </div>
              </div>
            </div>
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

      <transition name="fade">
        <div v-if="analysisComplete && !hasScrolled" class="scroll-indicator" @click="scrollToResults">
          <div class="scroll-indicator-content">
            <v-icon>mdi-arrow-down</v-icon>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import apiConfig from '@/config/api-config';
import SafetyReportPDF from '@/components/SafetyReportPDF.vue';

export default {
  name: 'SafetyCheckView',
  components: {
    SafetyReportPDF
  },
  data() {
    return {
      activeTab: 'cyberbullying',
      contentToAnalyze: '',
      selectedFile: null,
      selectedFilePreview: null,
      extractedText: '',
      analysisComplete: false,
      resultType: 'cyberbullying',
      bullyingScore: 0,
      inputError: '',
      isAnalyzing: false,
      perspectiveApiKey: 'AIzaSyBfZHcZx1g76dSAfTNxpcPGvxqRDyiOt5U', 
      riskLevel: 'safe', // 'high', 'medium', 'low', 'safe'
      groomingApiUrl: apiConfig.grooming.url,
      isGroomingApiAvailable: false,
      displayContent: '', // New property to store content for display
      isExtractingText: false, // New: show spinner when extracting text from image
      hasScrolled: false
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
    // Add scroll event listener when component is mounted
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    // Remove the scroll event listener when component is destroyed
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    // Handle scroll events
    handleScroll() {
      if (window.scrollY > 300 && this.analysisComplete) {
        this.hasScrolled = true;
      } else if (window.scrollY < 100) {
        this.hasScrolled = false;
      }
    },
    async testApiConnection() {
      try {
        console.log('Testing Grooming API connection...')
        const response = await fetch(this.groomingApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ text: 'This is a test message' }),
          mode: 'cors',
          credentials: 'omit'
        })
        
        if (response.ok) {
          const data = await response.json()
          console.log('API test successful:', data)
        } else {
          console.error('API test failed:', response.status, response.statusText)
        }
      } catch (error) {
        console.error('API connection test error:', error)
      }
    },
    clearError() {
      if (this.inputError) {
        this.inputError = '';
      }
    },
    setActiveTab(tab) {
      this.activeTab = tab
      this.analysisComplete = false // Hide results when switching tabs
      this.inputError = ''
      this.contentToAnalyze = '' // Clear input text when switching tabs
      
      // Clear uploaded file when switching tabs
      this.selectedFile = null
      this.selectedFilePreview = null
      this.extractedText = ''
      
      // Reset file input element
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = ''
      }
    },
    triggerFileUpload() {
      // 清空之前的分析结果
      this.analysisComplete = false
      this.bullyingScore = 0
      this.riskLevel = 'safe'
      this.displayContent = ''
      
      // 重置已有的图片（如果存在）
      if (this.selectedFile) {
        this.removeSelectedFile()
      }
      
      this.$refs.fileInput.click()
    },
    handleFileUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.selectedFile = file
        this.contentToAnalyze = '' // Clear text input
        this.extractedText = '' // Clear extracted text
        this.createImagePreview(file)
      }
    },
    createImagePreview(file) {
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.selectedFilePreview = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    removeSelectedFile() {
      this.selectedFile = null
      this.selectedFilePreview = null
      this.extractedText = ''
      this.contentToAnalyze = ''
      this.inputError = '' // Clear any error messages
      
      // 清空分析结果
      this.analysisComplete = false
      this.bullyingScore = 0
      this.riskLevel = 'safe'
      this.displayContent = ''
      
      // Reset file input so the same file can be selected again
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = ''
      }
    },
    async extractTextFromImage(file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        // Show spinner while extracting text
        this.isExtractingText = true;
        // Using same fetch pattern for consistency
        const response = await fetch('https://api.shieldskills.live/extract-text/', {

          method: 'POST',
          body: formData,
          // No additional headers or credentials for FormData
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('OCR error response:', errorText);
          throw new Error('OCR failed: ' + (response.status || 'unknown error'));
        }

        const data = await response.json();
        console.log('OCR response:', data);
        
        // Handle empty text or error
        if (data.error) {
          this.inputError = `Error extracting text: ${data.error}`;
          return "";
        }
        
        if (!data.text || data.text.trim() === "") {
          this.inputError = "No readable text detected in the image. Please try another image or enter text manually.";
          return "";
        }
        
        // Store extracted text but don't show in input field
        this.extractedText = data.text;
        return data.text;
      } catch (err) {
        console.error('OCR error:', err);
        this.inputError = 'Failed to extract text from image. Please try another image or enter text manually.';
        return "";
      } finally {
        // Hide spinner after extraction
        this.isExtractingText = false;
      }
    },
    async analyzeContent() {
      this.inputError = '';
      this.analysisComplete = false;
      this.isAnalyzing = true;

      try {
        let textToAnalyze = '';
        
        // Decide which text to analyze
        if (this.selectedFile && (!this.contentToAnalyze || this.contentToAnalyze === "Processing image text...")) {
          // Use extracted text if available, otherwise extract it
          if (this.extractedText) {
            textToAnalyze = this.extractedText;
          } else {
            textToAnalyze = await this.extractTextFromImage(this.selectedFile);
          }
        } else {
          textToAnalyze = this.contentToAnalyze.trim();
        }

        // If no text to analyze, show error
        if (!textToAnalyze) {
          this.inputError = 'Please enter text or upload an image to analyze.';
          this.isAnalyzing = false;
          return;
        }

        // Use the text for analysis but don't show in input field
        // Instead store it for displaying in results
        this.displayContent = textToAnalyze;
        
        const analysisResult =
          this.activeTab === 'cyberbullying'
            ? await this.analyzeCyberbullying(textToAnalyze)
            : await this.analyzeGrooming(textToAnalyze);

        this.activeTab === 'cyberbullying'
          ? this.processCyberbullyingResults(analysisResult)
          : this.processGroomingResults(analysisResult);
          
        // Reset file upload and text input after successful analysis
        if (this.analysisComplete) {
          // Clear text input
          this.contentToAnalyze = '';
          
          // Reset file if uploaded
          if (this.selectedFile) {
            this.selectedFile = null;
            this.selectedFilePreview = null;
            this.extractedText = '';
            
            // Reset file input element
            if (this.$refs.fileInput) {
              this.$refs.fileInput.value = '';
            }
          }
        }
      } catch (err) {
        this.inputError = err.message || 'Something went wrong.';
      } finally {
        this.isAnalyzing = false;
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
              'Origin': window.location.origin // Add Origin header, may help with some CORS situations
            },
            body: JSON.stringify(requestBody),
            mode: 'cors' // Explicitly use CORS mode
          });
          
          if (!response.ok) {
            if (response.status === 400) {
              // If it's a 400 error, usually it's a request format issue
              const errorData = await response.json();
              console.error('API Request Error:', errorData);
              throw new Error(`API request error: ${errorData.error?.message || 'Invalid request format'}`);
            } else if (response.status === 403) {
              // If it's a 403 error, usually it's an API key issue
              throw new Error('API key error: Invalid or unauthorized API key');
            } else if (response.status === 429) {
              // Rate limit
              throw new Error('API rate limit exceeded: Please try again later');
            } else if (response.status === 0 || response.status === 520) {
              // CORS or network error
              throw new Error('Network error: CORS issue or service unavailable');
            } else {
              // Other errors
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
          
          // Catch network errors, use fallback analysis
          console.log('Switching to fallback analysis method due to API error');
          return this.fallbackAnalyzeText(text);
        }
      } catch (error) {
        console.error('Error in analyzeCyberbullying:', error.message);
        throw error;
      }
    },
    
    // Determine if fallback analysis method should be used
    shouldUseFallbackAnalysis(text) {
      // You can add some logic here to decide whether to use fallback analysis
      // For example, invalid API key, or in development environment
      
      // If this is an obvious test request, use fallback method
      if (text.toLowerCase().includes('test') && text.length < 10) {
        return true;
      }
      
      return false;
    },
    
    // Fallback text analysis method, used when API is unavailable
    fallbackAnalyzeText(text) {
      console.log('Using fallback text analysis');
      
      // Simple keyword-based analysis
      const toxicWords = [
        'hate', 'stupid', 'idiot', 'dumb', 'ugly', 'kill', 'die', 'loser', 
        'pathetic', 'retard', 'jerk', 'moron', 'fat', 'bitch', 'bastard', 'crap'
      ];
      
      const lowerText = text.toLowerCase();
      let toxicScore = 0;
      
      // Count occurrences of toxic words
      toxicWords.forEach(word => {
        if (lowerText.includes(word)) {
          toxicScore += 0.2; // Each toxic word adds 0.2 points
        }
      });
      
      // Cap maximum score at 1
      toxicScore = Math.min(toxicScore, 1);
      
      // Construct a response similar to Perspective API
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
      
      // Reset scroll tracking when new results are available
      this.hasScrolled = false
    },
    
    scrollToResults() {
      const resultsEl = document.querySelector('.alert-message');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth' });
      }
      // Mark as scrolled
      this.hasScrolled = true;
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
      // Call the PDF component's generation method
      this.$refs.safetyReportPDF.generatePDF({
        reportType: this.riskLevel === 'safe' ? 'Safety' : 'Analysis',
        checkType: this.activeTab === 'cyberbullying' ? 'Cyberbullying' : 'Grooming',
        riskLevel: this.riskLevel,
        score: Math.round(this.bullyingScore * 100),
        content: this.displayContent,
        warningItems: this.warningItems,
        preventionTips: this.preventionTips,
        recommendedActions: this.currentRecommendedActions,
        date: new Date()
      });
    },

    // Add these new methods for grooming detection
    async analyzeGrooming(text) {
      // If API is known to be unavailable, use fallback immediately
      if (!this.isGroomingApiAvailable) {
        console.log('Grooming API known to be unavailable, using fallback immediately')
        return this.fallbackGroomingAnalysis(text)
      }
      
      try {
        // Call FastAPI backend
        const apiUrl = this.groomingApiUrl
        
        console.log('Sending request to Grooming API:', apiUrl)
        console.log('Request text (first 50 chars):', text.substring(0, 50))
        
        // Add timeout to the fetch request
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        try {
          // Simplified fetch configuration for CORS
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text }),
            signal: controller.signal
          });
          
          clearTimeout(timeoutId); // Clear the timeout
          
          if (!response.ok) {
            console.error('API error:', response.status, response.statusText);
            const errorText = await response.text();
            console.error('Error response:', errorText);
            
            // Mark API as unavailable for future requests if it's a server error
            if (response.status >= 500) {
              this.isGroomingApiAvailable = false;
              console.warn('Marking API as unavailable due to server error');
            }
            
            throw new Error(`API error: ${response.status} ${response.statusText}`);
          }
          
          const data = await response.json();
          console.log('Grooming API response:', data);
          
          // If we get here, the API is definitely available
          this.isGroomingApiAvailable = true;
          
          return data;
        } catch (fetchError) {
          clearTimeout(timeoutId); // Ensure timeout is cleared
          
          if (fetchError.name === 'AbortError') {
            console.error('API request timed out');
            throw new Error('API request timed out. Please try again.');
          }
          
          throw fetchError; // Re-throw for the outer catch
        }
      } catch (error) {
        console.error('Error in grooming analysis:', error);
        
        // Try to check if it's a model-specific error
        if (error.message && error.message.includes('Model prediction failed')) {
          console.warn('Using fallback due to model prediction error');
        }
        
        // Fallback to mock analysis if API call fails
        const fallbackResult = this.fallbackGroomingAnalysis(text);
        console.log('Using fallback analysis:', fallbackResult);
        return fallbackResult;
      }
    },

    // Fallback method if API is unavailable
    fallbackGroomingAnalysis(text) {
      console.log('Using fallback grooming analysis')
      
      // Simple keyword-based analysis
      const concerningKeywords = [
        'secret', 'private', 'alone', 'meet', 'older', 'trust me', 'don\'t tell', 
        'just between us', 'special friend', 'pictures', 'camera', 'send photo',
        'age', 'parents', 'address', 'location', 'school'
      ]
      
      let score = 0
      const lowerText = text.toLowerCase()
      
      concerningKeywords.forEach(keyword => {
        if (lowerText.includes(keyword.toLowerCase())) {
          score += 0.1 // Each keyword adds 0.1 to the score
        }
      })
      
      // Cap at 1.0
      score = Math.min(score, 1.0)
      
      let label, color
      if (score < 0.35) {
        label = "SAFE"
        color = "green"
      } else if (score < 0.70) {
        label = "CAUTION"
        color = "orange"
      } else {
        label = "DANGER"
        color = "red"
      }
      
      return {
        score: score.toFixed(2),
        label,
        color
      }
    },

    processGroomingResults(response) {
      console.log('Processing grooming results:', response)
      
      // Check for error in response
      if (response.error) {
        console.error('API returned error:', response.error)
        throw new Error(response.error)
      }
      
      // Extract data from response - ensure values are properly parsed
      const score = typeof response.score === 'string' 
        ? parseFloat(response.score) 
        : response.score || 0
        
      const label = response.label || 'SAFE'
      
      console.log(`Processed score: ${score}, label: ${label}`)
      
      // Map API response to UI risk levels
      if (label === "DANGER") {
        this.riskLevel = 'high'
      } else if (label === "CAUTION") {
        this.riskLevel = 'medium'
      } else if (label === "SAFE" && score > 0.1) {
        this.riskLevel = 'low'
      } else {
        this.riskLevel = 'safe'
      }
      
      // Store score for display - convert to 0-1 range if needed
      this.bullyingScore = score <= 1 ? score : score/100
      
      // Set result type and completion
      this.resultType = 'grooming'
      this.analysisComplete = true
      
      // Reset scroll tracking when new results are available
      this.hasScrolled = false
    },
  },
  async created() {
    // Check if grooming API is available
    try {
      const testResponse = await fetch(this.groomingApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: 'API availability test' })
      });
      
      this.isGroomingApiAvailable = testResponse.ok;
      console.log('Grooming API is', this.isGroomingApiAvailable ? 'available' : 'unavailable');
      
      if (testResponse.ok) {
        const data = await testResponse.json();
        console.log('API test response:', data);
      }
    } catch (error) {
      console.warn('Grooming API check failed:', error);
      this.isGroomingApiAvailable = false;
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

/* Input container styles */
.input-container {
  position: relative;
}

.search-bar-container {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
}

.google-style-input {
  border-radius: 24px !important;
  background-color: white !important;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08) !important;
  transition: all 0.3s ease !important;
}

.google-style-input:hover, .google-style-input:focus-within {
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12) !important;
}

/* Reset input field styles */
:deep(.v-field__outline) {
  border-radius: 24px !important;
  border-color: transparent !important;
}

:deep(.v-field__input) {
  padding: 12px 16px !important;
}

.image-upload-btn {
  color: #4f86f7 !important;
  transition: all 0.2s ease;
  opacity: 0.8;
}

.image-upload-btn:hover {
  opacity: 1;
  transform: scale(1.05);
}

.check-btn {
  height: 44px;
  min-width: 100px;
  border-radius: 24px !important;
  text-transform: none;
  font-weight: 500;
  font-size: 15px;
  box-shadow: 0 2px 5px rgba(99, 102, 241, 0.2) !important;
}

.selected-file-preview {
  background-color: #f5f7ff;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.image-preview-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.file-info {
  flex: 1;
}

.file-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 300px;
}

.remove-btn {
  background-color: rgba(0, 0, 0, 0.05) !important;
}

.remove-btn:hover {
  background-color: rgba(0, 0, 0, 0.1) !important;
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
  
  /* Improved mobile experience for file upload */
  .image-preview-wrapper {
    width: 42px;
    height: 42px;
  }
  
  .remove-btn {
    width: 22px;
    height: 22px;
    top: -8px;
    right: -8px;
    border-width: 2px;
  }
  
  .file-name {
    max-width: 80px;
    font-size: 9px;
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

.strategy-list {
  padding: 20px;
}

.strategy-item {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #E5E7EB;
}

.strategy-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.strategy-title {
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
  font-size: 16px;
}

.strategy-description {
  color: #4B5563;
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 1.5;
}

.strategy-action {
  color: #4B5563;
  margin-bottom: 8px;
  font-size: 14px;
}

.strategy-source {
  color: #6B7280;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.source-link {
  color: #4F46E5;
  margin-left: 10px;
  text-decoration: none;
  font-size: 12px;
  &:hover {
    text-decoration: underline;
  }
}

.card-header {
  padding: 16px 20px;
  background-color: #F9FAFB;
  border-bottom: 1px solid #E5E7EB;
  font-size: 18px;
  font-weight: 600;
  color: #111827;
}

.result-card {
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  overflow: hidden;
}

/* Scroll indicator styles */
.scroll-indicator {
  position: fixed;
  bottom: 80px; /* Moved higher to avoid being covered */
  left: 50%;
  transform: translateX(-50%);
  width: 56px;
  height: 56px;
  background-color: rgba(99, 102, 241, 0.75);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 999; /* Ensure it's above all other elements */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
}

.scroll-indicator:hover {
  background-color: rgba(99, 102, 241, 0.9);
  transform: translateX(-50%) translateY(-5px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.25);
}

.scroll-indicator-content {
  display: flex;
  align-items: center;
  color: white;
}

/* Transition for fade in/out */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}
</style> 