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
                    <div style="font-size: 18px; font-weight: 700; margin-bottom: 4px; color: #15803D;">Content Appears Safe</div>
                    <div style="font-size: 14px; color: #4B5563;">
                      Our analysis did not detect any significant indicators of ${data.checkType && data.checkType.toLowerCase() === 'cyberbullying' ? 'cyberbullying' : 'grooming'} in the provided content.
                    </div>
                  </div>
                </div>
              </div>
            ` : data.riskLevel === 'high' ? `
              <div style="margin-bottom: 30px; padding: 15px; background-color: ${data.checkType && data.checkType.toLowerCase() === 'cyberbullying' ? '#FEE2E2' : '#FEE2E2'}; border-left: 4px solid ${data.checkType && data.checkType.toLowerCase() === 'cyberbullying' ? '#EF4444' : '#EF4444'}; border-radius: 8px;">
                <div style="display: flex; align-items: center;">
                  <div style="flex-grow: 1">
                    <div style="font-size: 18px; font-weight: 700; margin-bottom: 4px; color: #B91C1C;">
                      ${data.checkType && data.checkType.toLowerCase() === 'cyberbullying' ? 'Cyberbullying Detected' : 'High Risk of Grooming Detected'}
                    </div>
                    <div style="font-size: 14px; color: #4B5563;">
                      ${data.checkType && data.checkType.toLowerCase() === 'cyberbullying'
                        ? 'This content shows characteristics of cyberbullying because it contains hostile language targeting personal traits. Such language can cause emotional harm and create a hostile online environment.'
                        : 'This content shows strong indicators of potential grooming behavior. The language patterns and approach are consistent with methods used by predators to establish inappropriate relationships.'
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
                    <div style="font-size: 18px; font-weight: 700; margin-bottom: 4px; color: #B45309;">Moderate Risk Detected</div>
                    <div style="font-size: 14px; color: #4B5563;">
                      ${data.checkType && data.checkType.toLowerCase() === 'cyberbullying'
                        ? 'This content contains language that could be considered inappropriate or mildly harmful. While not severe, such content may still negatively impact others.'
                        : 'This content contains some behaviors or language that could be considered inappropriate or overly friendly. While not severe, it is important to be cautious.'
                      }
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
                      This content contains some concerning elements, but they are minimal. The language is largely appropriate but has some minor issues worth noting.
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

            ${data.strategies && data.strategies.length > 0 ? `
              <h2 style="color: #4F46E5; font-size: 20px; font-weight: 700; margin-bottom: 15px; margin-top: 32px;">
                ${data.strategiesTitle}
              </h2>
              <ol style="padding-left: 20px; margin: 0;">
                ${data.strategies.map(item => `
                  <li style="margin-bottom: 18px;">
                    <div style="font-size: 14px; font-weight: 500; margin-bottom: 4px;">${item.title}</div>
                    <div style="font-size: 13px; color: #374151; margin-bottom: 2px; margin-left: 18px;">${item.desc}</div>
                    <div style="font-size: 12px; color: #374151; margin-bottom: 2px; margin-left: 18px;"><b>Action:</b> <i>${item.action}</i></div>
                    <div style="font-size: 12px; color: #888; margin-left: 18px;">
                      <b>Source:</b> ${item.source}
                      <a href="${item.sourceUrl}" style="color: #6366f1; margin-left: 8px; text-decoration: underline;">View Source</a>
                    </div>
                  </li>
                `).join('')}
              </ol>
            ` : ''}
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