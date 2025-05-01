// WllamaService.js - Using CDN version of wllama
console.log("Wllama global check:", window.wllama);
class WllamaService {
    constructor() {
      this.wllama = null;
      this.isLoading = false;
      this.isLoaded = false;
      this.error = null;
      this.progressCallback = null;
      this.Wllama = null;
    }
  
    async initialize(modelUrl, progressCallback = null) {
      if (this.isLoading) return false;
      
      this.isLoading = true;
      this.error = null;
      this.progressCallback = progressCallback;
      
      try {
        // Check if wllama is available as a global variable from CDN
        if (window.wllama && window.wllama.Wllama) {
          console.log("Using wllama from CDN (global scope)");
          this.Wllama = window.wllama.Wllama;
        } else {
          console.warn("Wllama library not found in global scope. Did you add the CDN script tag?");
          throw new Error("Wllama library not loaded from CDN");
        }
        
        // Initialize wllama instance with the library from CDN
        this.wllama = new this.Wllama({
          publicPath: '/',
          modelUrl: modelUrl,
        });
        
        // Add event listeners for loading progress
        this.wllama.addEventListener('loadProgress', (e) => {
          if (this.progressCallback) {
            this.progressCallback(e.progress);
          }
        });
        
        // Load the model
        await this.wllama.load();
        
        this.isLoaded = true;
        console.log('Model loaded successfully');
        return true;
      } catch (err) {
        console.error('Error in initialize:', err);
        
        // Create mock implementation since the real one failed
        this.Wllama = class MockWllama {
          constructor(config) {
            this.config = config;
            this.eventListeners = {};
            console.log("Created mock wllama with config:", config);
          }
          
          addEventListener(event, callback) {
            if (!this.eventListeners[event]) {
              this.eventListeners[event] = [];
            }
            this.eventListeners[event].push(callback);
          }
          
          triggerEvent(event, data) {
            if (this.eventListeners[event]) {
              this.eventListeners[event].forEach(callback => callback(data));
            }
          }
          
          async load() {
            // Simulate loading progress
            for (let i = 0; i <= 100; i += 10) {
              await new Promise(resolve => setTimeout(resolve, 100));
              this.triggerEvent('loadProgress', { progress: i / 100 });
            }
            return true;
          }
          
          async completions(params) {
            const { prompt, stream, onToken } = params;
            
            if (stream && onToken) {
              const mockResponse = `This is a mock response for prompt: "${prompt.substring(0, 30)}...". The actual Llama model could not be loaded, so this is a simulated response.`;
              const words = mockResponse.split(' ');
              
              // Stream words with delays to simulate generation
              for (const word of words) {
                await new Promise(resolve => setTimeout(resolve, 100));
                onToken(word + ' ');
              }
              
              return { choices: [{ text: mockResponse }] };
            } else {
              // Non-streaming response
              return {
                choices: [{
                  text: `Mock response for: "${prompt.substring(0, 30)}..."`
                }]
              };
            }
          }
          
          dispose() {
            console.log('Mock model disposed');
          }
        };
        
        // Initialize with mock implementation
        this.wllama = new this.Wllama({
          publicPath: '/',
          modelUrl: modelUrl,
        });
        
        // Add event listeners for loading progress
        this.wllama.addEventListener('loadProgress', (e) => {
          if (this.progressCallback) {
            this.progressCallback(e.progress);
          }
        });
        
        // "Load" the mock model
        await this.wllama.load();
        
        this.isLoaded = true;
        this.error = err;
        console.log('Using mock model implementation');
        return true;
      } finally {
        this.isLoading = false;
      }
    }
    
    async generateResponse(prompt, options = {}) {
      if (!this.isLoaded || !this.wllama) {
        throw new Error('Model not loaded. Please initialize the model first.');
      }
      
      // Default options
      const defaultOptions = {
        temperature: 0.7,
        topP: 0.9,
        maxTokens: 800,
        streamCallback: null,
      };
      
      const mergedOptions = { ...defaultOptions, ...options };
      
      try {
        // Generate completion
        const result = await this.wllama.completions({
          prompt: prompt,
          temperature: mergedOptions.temperature,
          top_p: mergedOptions.topP,
          max_tokens: mergedOptions.maxTokens,
          stream: Boolean(mergedOptions.streamCallback),
          onToken: mergedOptions.streamCallback,
        });
        
        return result.choices[0].text;
      } catch (err) {
        console.error('Error generating response:', err);
        throw err;
      }
    }
    
    dispose() {
      if (this.wllama) {
        this.wllama.dispose();
        this.wllama = null;
        this.isLoaded = false;
      }
    }
  }
  
  // Create a singleton instance
  const wllamaServiceInstance = new WllamaService();
  export default wllamaServiceInstance;