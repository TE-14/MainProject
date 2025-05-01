// WllamaServiceCDN.js - Using direct ES module imports from CDN
// Import will happen dynamically in initialize()

class WllamaServiceCDN {
  constructor() {
    this.wllama = null;
    this.isLoading = false;
    this.isLoaded = false;
    this.error = null;
    this.progressCallback = null;
    this.modelBuffer = null; // For storing the model in memory
  }

  async initialize(modelUrl, progressCallback = null) {
    if (this.isLoading) return false;
    
    this.isLoading = true;
    this.error = null;
    this.progressCallback = progressCallback;
    
    try {
      // Dynamically import wllama from CDN
      const wllamaModule = await import('https://cdn.jsdelivr.net/npm/@wllama/wllama@2.3.1/esm/index.js');
      const Wllama = wllamaModule.Wllama;
      
      // Configure paths to WebAssembly files
      const CONFIG_PATHS = {
        'single-thread/wllama.wasm': 'https://cdn.jsdelivr.net/npm/@wllama/wllama@2.3.1/esm/single-thread/wllama.wasm',
        'multi-thread/wllama.wasm': 'https://cdn.jsdelivr.net/npm/@wllama/wllama@2.3.1/esm/multi-thread/wllama.wasm',
      };
      
      // Create Wllama instance with NO caching
      this.wllama = new Wllama(CONFIG_PATHS, {
        // Disable cache manager completely
        cacheManager: {
          enabled: false,
          // Implement a no-op cache manager
          saveModel: async () => {},
          loadModel: async () => null,
          clear: async () => {},
          getCacheKey: () => '',
          getCacheDir: async () => null
        }
      });
      
      // If the model URL is provided, load it
      if (modelUrl) {
        await this.loadModel(modelUrl);
      }
      
      return true;
    } catch (err) {
      this.error = err;
      console.error('Error initializing wllama:', err);
      return false;
    } finally {
      this.isLoading = false;
    }
  }
  
  async loadModel(modelUrl) {
    if (this.isLoaded) return true;
    
    this.isLoading = true;
    
    try {
      console.log("Starting model download from:", modelUrl);
      
      // First fetch the model as an ArrayBuffer
      const response = await fetch(modelUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      let totalBytes = parseInt(response.headers.get('Content-Length') || '0');
      let loadedBytes = 0;
      
      // Create a reader to stream the response
      const reader = response.body.getReader();
      const chunks = [];
      
      // Read the model data in chunks and update progress
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        chunks.push(value);
        loadedBytes += value.length;
        
        // Update progress
        const progress = totalBytes ? (loadedBytes / totalBytes) : 0;
        if (this.progressCallback) {
          this.progressCallback(progress);
        }
        
        console.log(`Download progress: ${Math.round(progress * 100)}%`);
      }
      
      // Combine all chunks into a single ArrayBuffer
      const modelSize = chunks.reduce((total, chunk) => total + chunk.length, 0);
      this.modelBuffer = new Uint8Array(modelSize);
      
      let offset = 0;
      for (const chunk of chunks) {
        this.modelBuffer.set(chunk, offset);
        offset += chunk.length;
      }
      
      console.log("Model download complete, loading into wllama...");
      
      // Load the model from the ArrayBuffer
      await this.wllama.loadModel([new Blob([this.modelBuffer])], {
        n_ctx: 1024,
        cacheModel: false, // Explicitly disable caching
      });
      
      this.isLoaded = true;
      console.log("Model loaded successfully!");
      return true;
    } catch (err) {
      this.error = err;
      console.error('Error loading model:', err);
      return false;
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
      // Format the prompt for the model
      const formattedPrompt = `<|begin_of_text|><|prompt|>${prompt}<|response|>`;
      
      if (mergedOptions.streamCallback) {
        // For streaming, use createCompletion with callback
        let fullResponse = '';
        
        await this.wllama.createCompletion(formattedPrompt, {
          nPredict: mergedOptions.maxTokens,
          sampling: {
            temp: mergedOptions.temperature,
            top_p: mergedOptions.topP,
            top_k: 40,
            repeat_penalty: 1.1,
          },
          onToken: (token) => {
            fullResponse += token;
            mergedOptions.streamCallback(token);
          }
        });
        
        return fullResponse;
      } else {
        // For non-streaming, use createCompletion without callback
        const response = await this.wllama.createCompletion(formattedPrompt, {
          nPredict: mergedOptions.maxTokens,
          sampling: {
            temp: mergedOptions.temperature,
            top_p: mergedOptions.topP,
            top_k: 40,
            repeat_penalty: 1.1,
          }
        });
        
        return response;
      }
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
    
    // Clear the model buffer to free memory
    this.modelBuffer = null;
  }
}

// Create a singleton instance
const wllamaServiceInstance = new WllamaServiceCDN();
export default wllamaServiceInstance;