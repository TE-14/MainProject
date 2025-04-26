// src/assets/scenarioLoader.js

import axios from 'axios';

// Define paths to scenario data
const SCENARIO_BASE_PATH = '/scenarios/';

// Import images directly to make them available through webpack
import scenario1Text1 from '@/assets/images/cb_tc1.jpg';
import scenario1Image1 from '@/assets/images/CB1_angry_allison.jpg';
import scenario1Text2 from '@/assets/images/cb_tc2.jpg';
// import scenario1Image2 from '@/assets/images/CB1_distressed_allison.jpg';
// import scenario1Text3 from '@/assets/images/cb_tc3.jpg';
// import scenario1Image3 from '@/assets/images/CB1_stressed_allison.jpg';
// import scenario1Image4 from '@/assets/images/scenario3.jpg';

// Map of image paths to their imported versions
const imageMap = {
  'cb_tc1.jpg': scenario1Text1,
  'CB1_angry_allison.jpg': scenario1Image1,
  'cb_tc2.jpg': scenario1Text2,
//   'CB1_distressed_allison.jpg': scenario1Image2,
//   'cb_tc3.jpg': scenario1Text3,
//   'CB1_stressed_allison.jpg': scenario1Image3,
//   'scenario3.jpg': scenario1Image4,
//   'text_chain1.jpg': scenario1Text1,
//   'text_chain2.jpg': scenario1Text2,
//   'allison_1.jpg': scenario1Image3,
//   'end_card.jpg': scenario1Image4
};

/**
 * Process scenario data to handle image paths properly
 */
function processScenarioData(scenarioData) {
  if (!scenarioData || !scenarioData.parts) return scenarioData;
  
  // Process each part
  scenarioData.parts.forEach(part => {
    // Process image for any card type that has an image
    if (part.image) {
      // Extract image filename from path if it's a path
      const filename = part.image.includes('/') ? part.image.split('/').pop() : part.image;
      
      // If we have this image in our map, use the processed URL
      if (imageMap[filename]) {
        part.image = imageMap[filename];
      }
      // Otherwise, ensure the path starts with / for public folder assets
      else if (!part.image.startsWith('http') && !part.image.startsWith('/')) {
        part.image = '/' + part.image;
      }
    }
    
    // Also process message-based scenarios for backward compatibility
    if (part.messages) {
      part.messages.forEach(message => {
        if (message.type === 'image' && message.src) {
          // Extract image filename from path
          const filename = message.src.includes('/') ? message.src.split('/').pop() : message.src;
          
          // If we have this image in our map, use the processed URL
          if (imageMap[filename]) {
            message.src = imageMap[filename];
          }
          // Otherwise, ensure the path starts with / for public folder assets
          else if (!message.src.startsWith('http') && !message.src.startsWith('/')) {
            message.src = '/' + message.src;
          }
        }
      });
    }
  });
  
  return scenarioData;
}

/**
 * Load a scenario by its ID from a JSON file
 */
export async function loadScenario(scenarioId) {
  try {
    // Try loading from src/assets first
    try {
      // This uses webpack's dynamic import feature
      const scenarioModule = await import(`@/assets/scenarios/${scenarioId}.json`);
      return processScenarioData(scenarioModule.default);
    } catch (importError) {
      // If that fails, try loading from public directory
      const response = await axios.get(`${SCENARIO_BASE_PATH}${scenarioId}.json`);
      return processScenarioData(response.data);
    }
  } catch (error) {
    console.error(`Error loading scenario ${scenarioId}:`, error);
    throw new Error('Failed to load scenario data. Please try again.');
  }
}

/**
 * For development/demo purposes - returns a hardcoded scenario
 */
export function getHardcodedScenario(scenarioId) {
  // You can add more hardcoded scenarios here as needed
  const scenarioMap = {
    'cyberbullying-scenario': {
      "id": "cyberbullying-scenario",
      "title": "Cyberbullying Scenario",
      "parts": [
        {
          "type": "narrative",
          "image": "text_chain1.jpg",
          "imageAlt": "Initial text conversation showing signs of cyberbullying",
          "narrativeText": "Allison and her rrrrrrrrrrrrrclassmates are in a group chat planning weekend activities. Notice how the conversation begins to take a negative turn.",
          "imageCaption": "What starts as normal conversation can quickly turn into something more harmful."
        },
        {
          "type": "action",
          "image": "text_chain1.jpg",
          "imageAlt": "Text conversation showing cyberbullying comments",
          "narrativeText": "Looking at this conversation, you can see that Allison is being excluded and mocked by her classmates.",
          "imageCaption": "Cyberbullying often involves exclusion and public mockery.",
          "question": "What would you advise Allison to do in this situation?",
          "choices": [
            {
              "text": "Screenshot the messages and tell a trusted adult",
              "icon": "mdi-shield-check",
              "correct": true,
              "feedback": "Correct! Documenting the bullying and seeking help from parents, teachers, or school counselors is the best first step."
            },
            {
              "text": "Reply with equally hurtful comments",
              "icon": "mdi-account-alert",
              "correct": false,
              "feedback": "This approach typically escalates the situation and can make the bullying worse. It may also get Allison in trouble."
            },
            {
              "text": "Leave the group chat and ignore them",
              "icon": "mdi-eye-off",
              "correct": false,
              "feedback": "While removing yourself from the situation can help temporarily, ignoring bullying without reporting it often allows the behavior to continue or worsen."
            },
            {
              "text": "Delete all social media accounts",
              "icon": "mdi-delete",
              "correct": false,
              "feedback": "This extreme measure doesn't address the underlying issue and isolates the victim from positive social interactions online."
            }
          ]
        },
        {
        "type": "narrative",
                "image": "text_chain2.jpg",
                "imageAlt": "Follow-up conversation with more cyberbullying",
                "narrativeText": "The next day, the comments in the group chat become even more targeted and hurtful. Other classmates have joined in.",
                "imageCaption": "Cyberbullying can quickly escalate when others join in."
                },
                {
                "type": "narrative",
                "image": "allison_1.jpg",
                "imageAlt": "Allison speaking with her teacher",
                "narrativeText": "Allison decided to speak with her teacher and showed the screenshots of the conversation.",
                "imageCaption": "Taking action by involving trusted adults is an important step."
                },
                {
                "type": "action",
                "image": "allison_1.jpg",
                "imageAlt": "School meeting about cyberbullyhefjeriuing",
                "narrativeText": "The school arranged a meeting with all students involved and their parents to address the cyberbullying.",
                "imageCaption": "Schools have anti-bullying policies to address these situations.",
                "question": "What should happen after this meeting?",
                "choices": [
                    {
                    "text": "Monitor the situation and provide ongoing support to Allison",
                    "icon": "mdi-account-supervisor-circle",
                    "correct": true,
                    "feedback": "Correct! Follow-up support is essential to ensure the bullying has stopped and to help Allison recover emotionally."
                    },
                    {
                    "text": "Consider the issue resolved and take no further action",
                    "icon": "mdi-check-circle",
                    "correct": false,
                    "feedback": "Cyberbullying often has lasting emotional impacts. Ongoing monitoring and support are necessary to ensure the situation improves."
                    },
                    {
                    "text": "Transfer Allison to a different class",
                    "icon": "mdi-arrow-decision",
                    "correct": false,
                    "feedback": "Moving the victim rather than addressing the bullies' behavior sends the wrong message and can make Allison feel punished for something that wasn't her fault."
                    },
                    {
                    "text": "Ban all students from using phones or social media",
                    "icon": "mdi-cellphone-off",
                    "correct": false,
                    "feedback": "Blanket restrictions don't teach responsible digital citizenship. It's better to educate students about appropriate online behavior."
                    }
                ]
                },
                {
                "type": "end",
                "image": "end_card.jpg",
                "imageAlt": "Illustration showing positive online interaction",
                "narrativeText": "By taking appropriate action and involving trusted adults, Allison was able to address the cyberbullying situation. The school implemented additional digital citizenship training for all students.",
                "title": "Scenario Complete!",
                "message": "You've completed this cyberbullying scenario and learned about appropriate responses to online harassment. Remember that cyberbullying is never okay, and it's important to take action rather than staying silent.",
                "statistics": {
                    "correctAnswers": 0,
                    "totalQuestions": 2
                }
                }
            ]
            },
    // Add grooming scenario
    'scenario2': {
        "id": "scenario2",
        "title": "Online Grooming Scenario",
        "parts": [
          {
            "type": "narrative",
            "image": "cb_tc1.jpg", // Reusing an existing image temporarily
            "imageAlt": "Initial conversation with a stranger online",
            "narrativeText": "Sam received a friend request from someone they don't know."
          },
          {
            "type": "action",
            "image": "cb_tc2.jpg", 
            "imageAlt": "Stranger asking for personal information",
            "narrativeText": "The stranger is asking for personal information and wants to meet in person.",
            "question": "What should Sam do in this situation?",
            "choices": [
              {
                "text": "Block the person and tell a trusted adult",
                "icon": "mdi-shield-check",
                "correct": true,
                "feedback": "Correct! It's important to avoid sharing personal information with strangers online and to tell a trusted adult about suspicious interactions."
              },
              {
                "text": "Share limited personal information to be polite",
                "icon": "mdi-account-alert",
                "correct": false,
                "feedback": "This is risky. You should never share personal information with strangers online, even if they seem friendly."
              },
              {
                "text": "Agree to meet in a public place",
                "icon": "mdi-map-marker",
                "correct": false,
                "feedback": "This is very dangerous. Never agree to meet someone you've only talked to online without a trusted adult's knowledge and supervision."
              },
              {
                "text": "Ignore the messages but keep the connection",
                "icon": "mdi-eye-off",
                "correct": false,
                "feedback": "Simply ignoring the messages while maintaining the connection still leaves you vulnerable. It's better to block them and report the behavior."
              }
            ]
          },
          {
            "type": "end",
            "image": "scenario3.jpg",
            "title": "Scenario Complete!",
            "message": "You've completed this scenario on recognizing online grooming. Remember to be cautious about who you connect with online and never share personal information with strangers.",
            "statistics": {
              "correctAnswers": 0,
              "totalQuestions": 1
            }
          }
        ]
      }
    };
  
  return processScenarioData(scenarioMap[scenarioId] || null);
}

// Export default object for easier imports
export default {
  loadScenario,
  getHardcodedScenario
};