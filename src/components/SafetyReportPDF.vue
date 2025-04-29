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
        
        // Create PDF content
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

            <!-- Risks and Protective Strategies Section -->
            <div style="margin-bottom: 30px;">
              <h2 style="color: #4F46E5; margin-bottom: 15px;">
                ${data.checkType === 'Cyberbullying' ? 'Cyberbullying Risks and Protective Strategies' : 'Online Grooming Risks and Protective Strategies'}
              </h2>
              ${data.checkType === 'Cyberbullying' ? `
                <!-- Cyberbullying Strategies -->
                <div style="margin-bottom: 20px;">
                  <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #E5E7EB;">
                    <div style="font-weight: 600; color: #374151; margin-bottom: 8px;">Understand the Forms of Cyberbullying</div>
                    <div style="color: #4B5563; margin-bottom: 8px;">Recognize different forms of cyberbullying, such as harassment, impersonation, and social exclusion, to act early and effectively.</div>
                    <div style="color: #4B5563; margin-bottom: 8px;"><strong>Action:</strong> Discuss different types of cyberbullying with teens and how to respond safely.</div>
                    <div style="color: #6B7280; font-size: 12px;"><em>Source: Cyberbullying Research Center, "Preventing Cyberbullying: Top Ten Tips for Teens", 2024</em></div>
                  </div>

                  <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #E5E7EB;">
                    <div style="font-weight: 600; color: #374151; margin-bottom: 8px;">Save Evidence and Report It</div>
                    <div style="color: #4B5563; margin-bottom: 8px;">Document incidents by saving screenshots, chat logs, and timestamps to report through proper channels.</div>
                    <div style="color: #4B5563; margin-bottom: 8px;"><strong>Action:</strong> Teach young users how to gather evidence safely before blocking an aggressor.</div>
                    <div style="color: #6B7280; font-size: 12px;"><em>Source: UNICEF, "How to Stop Cyberbullying", 2024</em></div>
                  </div>

                  <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #E5E7EB;">
                    <div style="font-weight: 600; color: #374151; margin-bottom: 8px;">Avoid Emotional Posting</div>
                    <div style="color: #4B5563; margin-bottom: 8px;">Posting while angry or upset can escalate conflicts and cause regret. Encourage pausing before posting.</div>
                    <div style="color: #4B5563; margin-bottom: 8px;"><strong>Action:</strong> Introduce a "cool-down rule" before posting sensitive or emotional content online.</div>
                    <div style="color: #6B7280; font-size: 12px;"><em>Source: Cyberbullying Research Center, "Standing Up to Cyberbullying: Tips for Teens", 2024</em></div>
                  </div>

                  <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #E5E7EB;">
                    <div style="font-weight: 600; color: #374151; margin-bottom: 8px;">Recognize Warning Signs</div>
                    <div style="color: #4B5563; margin-bottom: 8px;">Signs of cyberbullying include frequent use of negative predictive text, hostile emojis, or abrupt changes in online behavior.</div>
                    <div style="color: #4B5563; margin-bottom: 8px;"><strong>Action:</strong> Monitor digital interactions and encourage open conversations when warning signs appear.</div>
                    <div style="color: #6B7280; font-size: 12px;"><em>Source: The Sun, "Signs Your Child Is a Cyberbullying Victim", 2024</em></div>
                  </div>

                  <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #E5E7EB;">
                    <div style="font-weight: 600; color: #374151; margin-bottom: 8px;">Protect Your Passwords</div>
                    <div style="color: #4B5563; margin-bottom: 8px;">Sharing passwords even with trusted friends can lead to misuse or identity theft.</div>
                    <div style="color: #4B5563; margin-bottom: 8px;"><strong>Action:</strong> Emphasize the importance of keeping passwords confidential and changing them regularly.</div>
                    <div style="color: #6B7280; font-size: 12px;"><em>Source: Cyberbullying Research Center, "Password Safety: Top Ten Tips for Teens", 2024</em></div>
                  </div>

                  <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #E5E7EB;">
                    <div style="font-weight: 600; color: #374151; margin-bottom: 8px;">Encourage Open Communication</div>
                    <div style="color: #4B5563; margin-bottom: 8px;">Maintaining open lines of communication helps young people feel safe to report online issues without fear.</div>
                    <div style="color: #4B5563; margin-bottom: 8px;"><strong>Action:</strong> Create a trusted environment where teens know they can seek help when needed.</div>
                    <div style="color: #6B7280; font-size: 12px;"><em>Source: National Crime Prevention Council, "Cyberbullying Tips for Teens", 2017</em></div>
                  </div>

                  <div style="margin-bottom: 20px; padding-bottom: 15px;">
                    <div style="font-weight: 600; color: #374151; margin-bottom: 8px;">Use Social Media Privacy Settings</div>
                    <div style="color: #4B5563; margin-bottom: 8px;">Setting stricter privacy controls helps limit unwanted interactions and exposure to risks.</div>
                    <div style="color: #4B5563; margin-bottom: 8px;"><strong>Action:</strong> Regularly review and adjust privacy settings on all social media platforms.</div>
                    <div style="color: #6B7280; font-size: 12px;"><em>Source: StopBullying.gov, "How to Prevent Cyberbullying", 2024</em></div>
                  </div>
                </div>
              ` : `
                <!-- Grooming Strategies -->
                <div style="margin-bottom: 20px;">
                  <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #E5E7EB;">
                    <div style="font-weight: 600; color: #374151; margin-bottom: 8px;">Educate About Online Grooming Risks</div>
                    <div style="color: #4B5563; margin-bottom: 8px;">Children must understand the dangers of sharing personal information online and how grooming works.</div>
                    <div style="color: #4B5563; margin-bottom: 8px;"><strong>Action:</strong> Use age-appropriate examples to explain grooming tactics and risks.</div>
                    <div style="color: #6B7280; font-size: 12px;"><em>Source: Internet Matters, "Protect Your Child from Online Grooming", 2024</em></div>
                  </div>

                  <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #E5E7EB;">
                    <div style="font-weight: 600; color: #374151; margin-bottom: 8px;">Encourage Reporting Suspicious Behavior</div>
                    <div style="color: #4B5563; margin-bottom: 8px;">Children should be empowered to report any suspicious online approach to parents or trusted adults.</div>
                    <div style="color: #4B5563; margin-bottom: 8px;"><strong>Action:</strong> Make it clear that reporting strange behavior is safe and encouraged.</div>
                    <div style="color: #6B7280; font-size: 12px;"><em>Source: NSPCC, "Online Grooming - Keep Your Child Safe", 2024</em></div>
                  </div>

                  <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #E5E7EB;">
                    <div style="font-weight: 600; color: #374151; margin-bottom: 8px;">Set and Regularly Review Privacy Settings</div>
                    <div style="color: #4B5563; margin-bottom: 8px;">Regularly updating device privacy settings helps prevent contact from strangers.</div>
                    <div style="color: #4B5563; margin-bottom: 8px;"><strong>Action:</strong> Review privacy settings together with children at regular intervals.</div>
                    <div style="color: #6B7280; font-size: 12px;"><em>Source: Netsafe, "Grooming - Online Abuse and Harassment", 2024</em></div>
                  </div>

                  <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #E5E7EB;">
                    <div style="font-weight: 600; color: #374151; margin-bottom: 8px;">Avoid Private or Inappropriate Online Conversations</div>
                    <div style="color: #4B5563; margin-bottom: 8px;">Private chats can be a grooming risk. Teach children to be cautious and recognize inappropriate approaches.</div>
                    <div style="color: #4B5563; margin-bottom: 8px;"><strong>Action:</strong> Encourage children to leave any conversation that feels uncomfortable.</div>
                    <div style="color: #6B7280; font-size: 12px;"><em>Source: Childline, "Online Grooming Safety Advice", 2024</em></div>
                  </div>

                  <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #E5E7EB;">
                    <div style="font-weight: 600; color: #374151; margin-bottom: 8px;">Establish Internet Usage Rules</div>
                    <div style="color: #4B5563; margin-bottom: 8px;">Setting clear boundaries around device use helps reduce exposure to unsafe environments.</div>
                    <div style="color: #4B5563; margin-bottom: 8px;"><strong>Action:</strong> Develop family internet usage agreements, including time limits and approved platforms.</div>
                    <div style="color: #6B7280; font-size: 12px;"><em>Source: The Children's Society, "Preventing Child Sexual Exploitation: Online Safety", 2024</em></div>
                  </div>

                  <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #E5E7EB;">
                    <div style="font-weight: 600; color: #374151; margin-bottom: 8px;">Warn Against Manipulative Behavior</div>
                    <div style="color: #4B5563; margin-bottom: 8px;">Strangers offering gifts or constant attention online may be attempting grooming tactics.</div>
                    <div style="color: #4B5563; margin-bottom: 8px;"><strong>Action:</strong> Teach children that genuine friendships do not involve secret gifts or pressure.</div>
                    <div style="color: #6B7280; font-size: 12px;"><em>Source: Safe Austin, "What is Grooming: Online Safety for Kids", 2024</em></div>
                  </div>

                  <div style="margin-bottom: 20px; padding-bottom: 15px;">
                    <div style="font-weight: 600; color: #374151; margin-bottom: 8px;">Maintain Regular Online Check-ins</div>
                    <div style="color: #4B5563; margin-bottom: 8px;">Frequent discussions about online activity help detect issues early and foster trust.</div>
                    <div style="color: #4B5563; margin-bottom: 8px;"><strong>Action:</strong> Ask about online experiences during regular family conversations.</div>
                    <div style="color: #6B7280; font-size: 12px;"><em>Source: FBI Safe Online Surfing Program, "SOS - Safe Online Surfing", 2024</em></div>
                  </div>
                </div>
              `}
            </div>
          </div>
        `

        // PDF configuration options
        const options = {
          margin: 10,
          filename: `${data.checkType}_safety_report_${new Date().toISOString().split('T')[0]}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        }

        // Generate PDF
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