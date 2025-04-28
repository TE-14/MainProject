<template>
  <div></div>
</template>

<script>
import html2pdf from 'html2pdf.js'

export default {
  name: 'SafetyReportPDF',
  data() {
    return {
      isGeneratingPDF: false
    }
  },
  methods: {
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
    
    async generatePDF(data) {
      try {
        this.isGeneratingPDF = true;
        
        // 构建PDF内容
        const content = `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h1 style="color: #4F46E5; text-align: center; margin-bottom: 30px;">Online Safety Analysis Report</h1>
            
            ${data.riskLevel === 'safe' ? `
              <div style="margin-bottom: 30px; padding: 15px; background-color: #F0FDF4; border-left: 4px solid #22C55E; border-radius: 8px;">
                <div style="display: flex; align-items: center;">
                  <div style="flex-grow: 1">
                    <div style="font-size: 18px; font-weight: 700; margin-bottom: 4px; color: #15803D;">Safe Content</div>
                    <div style="font-size: 14px; color: #4B5563;">
                      No significant risk factors were detected in the analyzed content. Continue practicing safe online behavior.
                    </div>
                  </div>
                </div>
              </div>
            ` : data.riskLevel === 'high' ? `
              <div style="margin-bottom: 30px; padding: 15px; background-color: ${data.checkType === 'Cyberbullying' ? '#FEE2E2' : '#FEE2E2'}; border-left: 4px solid ${data.checkType === 'Cyberbullying' ? '#EF4444' : '#EF4444'}; border-radius: 8px;">
                <div style="display: flex; align-items: center;">
                  <div style="flex-grow: 1">
                    <div style="font-size: 18px; font-weight: 700; margin-bottom: 4px; color: #B91C1C;">
                      ${data.checkType === 'Cyberbullying' ? 'High Risk - Cyberbullying Detected' : 'High Risk - Grooming Detected'}
                    </div>
                    <div style="font-size: 14px; color: #4B5563;">
                      ${data.checkType === 'Cyberbullying'
                        ? 'This content shows strong characteristics of cyberbullying, containing hostile language or personal attacks. Such content can cause significant emotional harm.'
                        : 'This content shows strong indicators of potential grooming behavior. The patterns are consistent with methods used to establish inappropriate relationships.'
                      }
                    </div>
                    <div style="margin-top: 12px;">
                      <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">Risk Score: ${data.score}%</div>
                      <div style="background-color: #EF4444; height: 8px; width: ${data.score}%; border-radius: 4px;"></div>
                    </div>
                  </div>
                </div>
              </div>
            ` : data.riskLevel === 'medium' ? `
              <div style="margin-bottom: 30px; padding: 15px; background-color: #FFF3E0; border-left: 4px solid #FB8C00; border-radius: 8px;">
                <div style="display: flex; align-items: center;">
                  <div style="flex-grow: 1">
                    <div style="font-size: 18px; font-weight: 700; margin-bottom: 4px; color: #B45309;">Medium Risk Detected</div>
                    <div style="font-size: 14px; color: #4B5563;">
                      This content contains potentially concerning language or behavior that could be inappropriate or harmful. While not severe, it requires attention.
                    </div>
                    <div style="margin-top: 12px;">
                      <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">Risk Score: ${data.score}%</div>
                      <div style="background-color: #FB8C00; height: 8px; width: ${data.score}%; border-radius: 4px;"></div>
                    </div>
                  </div>
                </div>
              </div>
            ` : data.riskLevel === 'low' ? `
              <div style="margin-bottom: 30px; padding: 15px; background-color: #E3F2FD; border-left: 4px solid #1E88E5; border-radius: 8px;">
                <div style="display: flex; align-items: center;">
                  <div style="flex-grow: 1">
                    <div style="font-size: 18px; font-weight: 700; margin-bottom: 4px; color: #1565C0;">Low Risk Detected</div>
                    <div style="font-size: 14px; color: #4B5563;">
                      This content contains minor concerning elements. While generally acceptable, there are some aspects that warrant attention.
                    </div>
                    <div style="margin-top: 12px;">
                      <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">Risk Score: ${data.score}%</div>
                      <div style="background-color: #1E88E5; height: 8px; width: ${data.score}%; border-radius: 4px;"></div>
                    </div>
                  </div>
                </div>
              </div>
            ` : `
              <div style="margin-bottom: 30px; padding: 15px; background-color: #F0FDF4; border-left: 4px solid #22C55E; border-radius: 8px;">
                <div style="display: flex; align-items: center;">
                  <div style="flex-grow: 1">
                    <div style="font-size: 18px; font-weight: 700; margin-bottom: 4px; color: #15803D;">Unknown Risk Level</div>
                    <div style="font-size: 14px; color: #4B5563;">
                      The risk level could not be determined. Please review the content carefully.
                    </div>
                  </div>
                </div>
              </div>
            `}
            
            <!-- Identified Characteristics or Prevention Tips -->
            <div style="margin-bottom: 30px;">
              <h2 style="color: #4F46E5; margin-bottom: 15px;">
                ${data.riskLevel === 'safe' ? 'Prevention Tips' : (data.checkType === 'Cyberbullying' ? 'Identified Characteristics' : 'Identified Warning Signs')}
              </h2>
              <ul style="list-style-type: none; padding: 0;">
                ${(data.riskLevel === 'safe' ? data.preventionTips : data.warningItems).map(item => `
                  <li style="margin-bottom: 10px; padding-left: 20px; position: relative;">
                    • ${item}
                  </li>
                `).join('')}
              </ul>
            </div>

            <!-- Safety Report Section -->
            <div style="margin-top: 30px;">
              <h2 style="color: #4F46E5; margin-bottom: 15px;">Safety Report</h2>
              <div style="background-color: #F9FAFB; padding: 15px; border-radius: 8px;">
                <div style="margin-bottom: 10px;">
                  <span style="font-weight: 600;">Analysis Type:</span> ${data.checkType} Check
                </div>
                <div style="margin-bottom: 10px;">
                  <span style="font-weight: 600;">Analyzed Content:</span> ${data.content}
                </div>
                <div style="margin-bottom: 10px;">
                  <span style="font-weight: 600;">Analysis Date:</span> ${this.formatDate(data.date)}
                </div>
                <div>
                  <span style="font-weight: 600;">Risk Level:</span> ${data.riskLevel.charAt(0).toUpperCase() + data.riskLevel.slice(1)}
                </div>
              </div>
            </div>

            <!-- Recommended Actions Section -->
            <div style="margin-bottom: 30px;">
              <h2 style="color: #4F46E5; margin-bottom: 15px;">
                ${data.riskLevel === 'safe' ? 'Safety Recommendations' : 'Recommended Actions'}
              </h2>
              <ul style="list-style-type: none; padding: 0;">
                ${data.recommendedActions.map(action => `
                  <li style="margin-bottom: 10px; padding-left: 20px; position: relative;">
                    • ${action}
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>
        `

        // PDF配置选项
        const options = {
          margin: 10,
          filename: `${data.checkType}_safety_report_${new Date().toISOString().split('T')[0]}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        }

        // 生成PDF
        await html2pdf().from(content).set(options).save()
      } catch (error) {
        console.error('Error generating PDF:', error)
        alert('Failed to generate PDF report. Please try again.')
      } finally {
        this.isGeneratingPDF = false;
      }
    }
  }
}
</script> 