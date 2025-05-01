export default [
  {
    id: 1,
    users: {
      me: { name: "You", initial: "Y", status: "Online" },
      other: { name: "Kenny", initial: "K", status: "Online" }
    },
    // Configuration flags for AI behavior
    aiConfig: {
      skipAI: false,           // Whether to skip AI generation and use default responses
      personalityKey: "kenny"   // The personality to use with this conversation
    },
    initialMessageCount: 2,
    messages: [
      {
        sender: "other",
        text: "Saw you posting about that anime show again. Only losers watch that cartoon junk.",
        time: "14:25"
      },
      {
        sender: "other",
        text: "Seriously, why don't you grow up and watch something real like football? 🏈",
        time: "14:26"
      }
    ],
    responseOptions: [
      {
        id: "kenny-uncomfortable",
        text: "I feel uncomfortable when you talk to me like this. Please stop.",
        displayText: "I feel uncomfortable when you talk to me like this. Please stop.",
        followUpMessages: [
          {
            sender: "other",
            text: "Aww, did I hurt your feelings? Cry me a river, anime freak! Maybe if you weren't into such childish garbage, people wouldn't treat you like the loser you are."
          }
        ],
        nextOptions: [
          {
            id: "kenny-uncomfortable-1",
            text: "I feel uncomfortable when you talk to me like this. Please stop.",
            displayText: "I feel uncomfortable when you talk to me like this. Please stop.",
            followUpMessages: [
              {
                sender: "other",
                text: "What are you going to do about it? Go cry to your anime body pillow? 😂 Seriously, grow a spine or stay off the internet, snowflake!"
              }
            ]
          },
          {
            id: "kenny-uncomfortable-2",
            text: "Insult his love for football (he becomes more defensive)",
            displayText: "Football is so boring. It's just sweaty guys chasing a ball. At least anime has actual stories and creativity.",
            followUpMessages: [
              {
                sender: "other",
                text: "At least football is a REAL sport with REAL athletes, not some weird Japanese cartoons with giant eyes. You're just jealous you can't play sports."
              }
            ]
          },
          {
            id: "kenny-uncomfortable-3",
            text: "Ask him why he is doing this. (he responds rudely)",
            displayText: "Why are you being like this? What's your problem with anime?",
            followUpMessages: [
              {
                sender: "other",
                text: "Because it's hilarious how defensive you get. Maybe if you weren't such an easy target I wouldn't bother."
              }
            ]
          }
        ]
      },
      {
        id: "kenny-insult",
        text: "Insult his love for football (he becomes more defensive)",
        displayText: "Football is lame and you're cringe. At least anime has actual storylines instead of just watching guys tackle each other.",
        followUpMessages: [
          {
            sender: "other",
            text: "Football is a REAL sport unlike your cartoon shows! You're just jealous because you've never been athletic a day in your life!"
          }
        ],
        nextOptions: [
          {
            id: "kenny-insult-1",
            text: "I feel uncomfortable when you talk to me like this. Please stop.",
            displayText: "I feel uncomfortable when you talk to me like this. Please stop.",
            followUpMessages: [
              {
                sender: "other",
                text: "Can't handle a little trash talk? This is why nobody respects anime fans."
              }
            ]
          },
          {
            id: "kenny-insult-2",
            text: "Insult his love for football (he becomes more defensive)",
            displayText: "Your obsession with football is so pathetic. It's just a game where guys slam into each other. Real intelligent...",
            followUpMessages: [
              {
                sender: "other",
                text: "You're pathetic. At least I don't spend my days watching animated characters with unrealistic proportions. Football takes SKILL!"
              }
            ]
          },
          {
            id: "kenny-insult-3",
            text: "Ask him why he is doing this. (he responds rudely)",
            displayText: "Why do you care so much about what I watch? It doesn't affect you at all.",
            followUpMessages: [
              {
                sender: "other",
                text: "Because you make it so easy! It's fun watching you get all worked up defending your little cartoons."
              }
            ]
          }
        ]
      },
      {
        id: "kenny-why",
        text: "Ask him why he is doing this. (he responds rudely)",
        displayText: "Why are you giving me such a hard time about anime? It's just a show I enjoy watching.",
        followUpMessages: [
          {
            sender: "other",
            text: "Because it's so easy to get a rise out of weirdos like you. Maybe if you had normal hobbies people wouldn't make fun of you."
          }
        ],
        nextOptions: [
          {
            id: "kenny-why-1",
            text: "I feel uncomfortable when you talk to me like this. Please stop.",
            displayText: "I feel uncomfortable when you talk to me like this. Please stop.",
            followUpMessages: [
              {
                sender: "other",
                text: "Stop being so sensitive. This is why nobody wants to hang out with you. Go back to watching your pathetic cartoon girls with giant eyes instead of learning how to take a joke."
              }
            ]
          },
          {
            id: "kenny-why-2",
            text: "Insult his love for football (he becomes more defensive)",
            displayText: "Like football is so much better? It's just a bunch of guys with brain damage throwing a ball around. Super interesting...",
            followUpMessages: [
              {
                sender: "other",
                text: "At least I'm not obsessed with fictional characters! Football is REAL. Get a life!"
              }
            ]
          },
          {
            id: "kenny-why-3",
            text: "Ask him why he is doing this. (he responds rudely)",
            displayText: "You still haven't explained why you care so much about what I watch.",
            followUpMessages: [
              {
                sender: "other",
                text: "I already told you - because it's funny. Not my fault you can't take a joke."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    users: {
      me: { name: "You", initial: "Y", status: "Online" },
      other: { name: "Whaleed", initial: "W", status: "Last seen 5m ago" }
    },
    // Configuration flags for AI behavior - skip AI for Whaleed
    aiConfig: {
      skipAI: true,             // Skip AI for Whaleed conversations
      personalityKey: "whaleed",  // Still identify the personality for reference
      simulateTyping: true       // Show typing indicator for realism
    },
    initialMessageCount: 2,
    messages: [
      {
        sender: "other",
        text: "Saw your math test score. Should've studied harder, but I guess that's not your family's strong suit.",
        time: "16:42"
      },
      {
        sender: "other",
        text: "Not surprising. People like you always struggle with STEM. Maybe stick to easier subjects?",
        time: "16:43"
      }
    ],
    responseOptions: [
      {
        id: "whaleed-no-racism",
        text: "You know I can do better. There is no need to be racist.",
        displayText: "You know I can do better. There is no need to be racist.",
        followUpMessages: [
          {
            sender: "other",
            text: "I'm just stating facts here. It's not racism if it's true. Some people just aren't cut out for certain things."
          }
        ],
        nextOptions: [
          {
            id: "whaleed-no-racism-1",
            text: "You know I can do better. There is no need to be racist.",
            displayText: "You know I can do better. There is no need to be racist.",
            followUpMessages: [
              {
                sender: "other",
                text: "Stop hiding behind the racism card. Take some responsibility for your poor performance instead of blaming others."
              }
            ]
          },
          {
            id: "whaleed-no-racism-2",
            text: "I am not taking this from someone who unironically uses the phrase negative canthal tilt.",
            displayText: "I am not taking this from someone who unironically uses the phrase negative canthal tilt.",
            followUpMessages: [
              {
                sender: "other",
                text: "Ah, trying to use fancy words you don't understand? Classic deflection tactic. Let's get back to your failing grades, shall we?"
              }
            ]
          },
          {
            id: "whaleed-no-racism-3",
            text: "Ask him why he is doing this. (He responds about being a punch-clock racist)",
            displayText: "Why do you keep saying these things? What's your problem with me?",
            followUpMessages: [
              {
                sender: "other",
                text: "Look, I'm just a punch-clock racist. Wake up, BE MOST RACIST, clock out. I'm doing it for the love of the game. Like a mercenary, but with none of the sociopathy. Maybe if your people were better at math, I'd have to find a new hobby."
              }
            ]
          }
        ]
      },
      {
        id: "whaleed-canthal-tilt",
        text: "I am not taking this from someone who unironically uses the phrase negative canthal tilt.",
        displayText: "I am not taking this from someone who unironically uses the phrase negative canthal tilt.",
        followUpMessages: [
          {
            sender: "other",
            text: "Oh look, trying to sound smart by using terms you don't understand. Maybe focus that energy on your math homework instead."
          }
        ],
        nextOptions: [
          {
            id: "whaleed-canthal-tilt-1",
            text: "You know I can do better. There is no need to be racist.",
            displayText: "You know I can do better. There is no need to be racist.",
            followUpMessages: [
              {
                sender: "other",
                text: "I'm just giving helpful feedback. Not my fault you can't handle criticism without playing the race card."
              }
            ]
          },
          {
            id: "whaleed-canthal-tilt-2",
            text: "I am not taking this from someone who unironically uses the phrase negative canthal tilt.",
            displayText: "I am not taking this from someone who unironically uses the phrase negative canthal tilt.",
            followUpMessages: [
              {
                sender: "other",
                text: "Keep deflecting. Meanwhile your grades keep slipping. Some people just aren't built for academic success."
              }
            ]
          },
          {
            id: "whaleed-canthal-tilt-3",
            text: "Ask him why he is doing this. (He responds about being a punch-clock racist)",
            displayText: "Why are you targeting me with these racist comments?",
            followUpMessages: [
              {
                sender: "other",
                text: "It's simple really. I'm a punch-clock racist. 9-to-5, wake up, BE MOST RACIST, clock out. Nothing personal, just doing my job with dedication."
              }
            ]
          }
        ]
      },
      {
        id: "whaleed-why",
        text: "Ask him why he is doing this. (He responds about being a punch-clock racist)",
        displayText: "Why are you acting like this? What did I ever do to you?",
        followUpMessages: [
          {
            sender: "other",
            text: "Look, I'm just a punch-clock racist. Wake up, BE MOST RACIST, clock out. I'm doing it for the love of the game. Like a mercenary, but with none of the sociopathy."
          }
        ],
        nextOptions: [
          {
            id: "whaleed-why-1",
            text: "You know I can do better. There is no need to be racist.",
            displayText: "You know I can do better. There is no need to be racist.",
            followUpMessages: [
              {
                sender: "other",
                text: "It's not about need, it's about dedication to my craft. Some people paint, I discriminate. We all have our talents."
              }
            ]
          },
          {
            id: "whaleed-why-2",
            text: "I am not taking this from someone who unironically uses the phrase negative canthal tilt.",
            displayText: "I am not taking this from someone who unironically uses the phrase negative canthal tilt.",
            followUpMessages: [
              {
                sender: "other",
                text: "I'm a professional, I use all the latest racist terminology. It's important to stay current in this field."
              }
            ]
          },
          {
            id: "whaleed-why-3",
            text: "Ask him why he is doing this. (He responds about being a punch-clock racist)",
            displayText: "That doesn't even make sense. Why would anyone choose to be racist?",
            followUpMessages: [
              {
                sender: "other",
                text: "I already told you - it's my calling. Some people rescue puppies, I make offensive comments. We can't all be heroes."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 3,
    users: {
      me: { name: "You", initial: "Y", status: "Online" },
      other: { name: "Mallory", initial: "M", status: "Typing..." }
    },
    // Configuration flags for AI behavior
    aiConfig: {
      skipAI: false,             // Use AI for Mallory
      personalityKey: "mallory",  // Use the Mallory personality
      timeoutSeconds: 60,         // Custom timeout for this character (optional)
      simulateTyping: true        // Show typing indicator for realism
    },
    initialMessageCount: 2,
    messages: [
      {
        sender: "other",
        text: "Well, well. Look what the cat dragged in, after apparently chewing it up and regurgitating it.",
        time: "20:17"
      },
      {
        sender: "other",
        text: "I've seen more impressive outfits on a scarecrow. Is that your idea of fashion or did you lose a bet?",
        time: "20:18"
      }
    ],
    responseOptions: [
      {
        id: "mallory-uncomfortable",
        text: "Tell her you feel uncomfortable.",
        displayText: "I feel really uncomfortable with the way you're talking to me.",
        followUpMessages: [
          {
            sender: "other",
            text: "Oh, you're uncomfortable? Join the club. I've been uncomfortable since I first laid eyes on that disaster you call a haircut. But I soldier on."
          }
        ],
        nextOptions: [
          {
            id: "mallory-uncomfortable-1",
            text: "Tell her you feel uncomfortable.",
            displayText: "I still feel uncomfortable. Please stop.",
            followUpMessages: [
              {
                sender: "other",
                text: "Your discomfort is noted and summarily ignored. Perhaps focus less on your feelings and more on developing a personality that doesn't make people want to fake their own death to avoid you."
              }
            ]
          },
          {
            id: "mallory-uncomfortable-2",
            text: "Call her a slur.",
            displayText: "You're just a [SLUR]!",
            followUpMessages: [
              {
                sender: "other",
                text: "How predictably pedestrian. When faced with wit, resort to vulgarity. It's like watching a chimp throw its feces when presented with quantum physics."
              }
            ]
          },
          {
            id: "mallory-uncomfortable-3",
            text: "Ask why she is doing this.",
            displayText: "Why are you being so mean? What did I do to deserve this?",
            followUpMessages: [
              {
                sender: "other",
                text: "Why? Because someone needs to inform you of your shortcomings before you stumble through life with the unearned confidence of a mediocre white man. Consider it a public service."
              }
            ]
          }
        ]
      },
      {
        id: "mallory-slur",
        text: "Call her a slur.",
        displayText: "You're just a [SLUR]!",
        followUpMessages: [
          {
            sender: "other",
            text: "My god, it speaks, and with all the eloquence of a brain-damaged parrot. Is that really the best your limited vocabulary could muster? Pathetic."
          }
        ],
        nextOptions: [
          {
            id: "mallory-slur-1",
            text: "Tell her you feel uncomfortable.",
            displayText: "I feel uncomfortable with how you're speaking to me.",
            followUpMessages: [
              {
                sender: "other",
                text: "Uncomfortable? After that vulgar display, I should be the one feeling violated. It's like being insulted by a dictionary that's missing half its pages."
              }
            ]
          },
          {
            id: "mallory-slur-2",
            text: "Call her a slur.",
            displayText: "You're still just a [SLUR]!",
            followUpMessages: [
              {
                sender: "other",
                text: "Repeating yourself? How dreadfully boring. At least try to be creative with your insults. This is why you'll never rise above mediocrity."
              }
            ]
          },
          {
            id: "mallory-slur-3",
            text: "Ask why she is doing this.",
            displayText: "Why are you treating me this way?",
            followUpMessages: [
              {
                sender: "other",
                text: "I'm merely filling the void where your personality should be with something interesting. It's exhausting work, but someone has to do it."
              }
            ]
          }
        ]
      },
      {
        id: "mallory-why",
        text: "Ask why she is doing this.",
        displayText: "Why are you being so cruel to me? What did I do wrong?",
        followUpMessages: [
          {
            sender: "other",
            text: "Why? Because watching you fumble through basic human interaction is the closest thing to entertainment I can find without a subscription service. Your bewilderment is my happy hour."
          }
        ],
        nextOptions: [
          {
            id: "mallory-why-1",
            text: "Tell her you feel uncomfortable.",
            displayText: "Your comments make me feel really uncomfortable.",
            followUpMessages: [
              {
                sender: "other",
                text: "Ah yes, discomfort - the default state of the chronically uninteresting. Try developing a spine. It might improve your posture as well as your personality."
              }
            ]
          },
          {
            id: "mallory-why-2",
            text: "Call her a slur.",
            displayText: "You're nothing but a [SLUR].",
            followUpMessages: [
              {
                sender: "other",
                text: "Resorting to slurs? How disappointingly predictable. It's like watching a toddler discover they can make noise by banging pots together."
              }
            ]
          },
          {
            id: "mallory-why-3",
            text: "Ask why she is doing this.",
            displayText: "I still don't understand why you're targeting me like this.",
            followUpMessages: [
              {
                sender: "other",
                text: "I already told you why. Do try to keep up. This is why conversation with you is like playing chess with a pigeon - lots of squawking and knocking pieces over, zero comprehension."
              }
            ]
          }
        ]
      }
    ]
  }
];