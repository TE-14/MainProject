/**
 * Wllama Service
 * This service handles loading and interaction with the Wllama library
 */

// Global variables
let wllama = null;
let modelLoaded = false;
let isInitializing = false;

async function initWllama() {
  // No longer initializing here, just checking if loaded
  if (wllama) return true;
  if (isInitializing) { // Still prevent race conditions if called multiple times quickly
       await new Promise(resolve => setTimeout(resolve, 100)); // Basic wait
       return wllama != null;
  }

  isInitializing = true; // Mark as "attempting to access"

  try {
    console.log("Attempting to access pre-loaded Wllama...");

    // Check if the static script loaded the exports
    if (!window.__WLLAMA_EXPORTS__ || !window.__WLLAMA_EXPORTS__.Wllama) {
        // Wait a little, maybe the static script hasn't finished executing yet
        await new Promise(resolve => setTimeout(resolve, 500));
        if (!window.__WLLAMA_EXPORTS__ || !window.__WLLAMA_EXPORTS__.Wllama) {
           console.error("Wllama exports not found on window object.", window.__WLLAMA_EXPORTS__);
           throw new Error("Wllama class not found. Static script might have failed to load.");
        }
    }

    const WllamaClass = window.__WLLAMA_EXPORTS__.Wllama;
    console.log("Found Wllama class via static load.");

    const wasmPath = '/wllama/single-thread/wllama.wasm';
    // Basic check if wasmPath is likely reachable (optional, curl already confirmed)
    try {
         await fetch(wasmPath, { method: 'HEAD' });
    } catch (e) { console.warn(`Could not HEAD ${wasmPath}, continuing anyway...`); }


    const CONFIG_PATHS = {
      'single-thread/wllama.wasm': wasmPath
    };

    console.log("Creating Wllama instance...");
    wllama = new WllamaClass(CONFIG_PATHS, {
      // threads: 'single', // The wllama code seems to detect this internally
      logger: console,
      suppressNativeLog: false
    });

    console.log("Wllama instance created successfully from pre-loaded script.");
    isInitializing = false;
    return true;

  } catch (error) {
    console.error('Failed to initialize wllama from static script:', error);
    isInitializing = false;
    wllama = null; // Ensure wllama is null on failure
    throw error;
  }
}

/**
 * Load model from URL
 * @param {Function} statusCallback - Callback function to update status
 * @returns {Promise<boolean>} Success status
 */
async function loadModel(statusCallback) {
  if (modelLoaded) return Promise.resolve(true);
  
  try {
    // Initialize Wllama first
    statusCallback('Initializing Wllama...');
    await initWllama();
    
    if (!wllama) {
      throw new Error('Wllama initialization failed');
    }
    
    // Model path
    const MODEL_PATH = '/llama-3.2-1b-instruct-q4_k_m.gguf';
    
    statusCallback('Checking model file...');
    
    // Check if model file exists
    try {
      const modelResponse = await fetch(MODEL_PATH, { method: 'HEAD' });
      if (!modelResponse.ok) {
        throw new Error(`Model file not found: ${MODEL_PATH}`);
      }
      console.log(`Model file found at ${MODEL_PATH}, size: ${modelResponse.headers.get('Content-Length') || 'unknown'} bytes`);
    } catch (error) {
      console.error("Error checking model file:", error);
      throw new Error(`Failed to access model file: ${error.message}`);
    }
    
    statusCallback('Downloading model...');
    console.log("Starting model download from:", MODEL_PATH);
    
    // Fetch the model
    const response = await fetch(MODEL_PATH);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    let totalBytes = parseInt(response.headers.get('Content-Length') || '0');
    let loadedBytes = 0;
    
    // Create a reader to stream the response
    const reader = response.body.getReader();
    const chunks = [];
    
    // Read the model data in chunks and update progress
    let done = false;
    while (!done) {
      const result = await reader.read();
      done = result.done;
      
      if (!done) {
        const value = result.value;
        chunks.push(value);
        loadedBytes += value.length;
        
        // Update progress
        const progress = totalBytes ? Math.round((loadedBytes / totalBytes) * 100) : 0;
        statusCallback(`Loading model: ${progress}%`);
        console.log(`Download progress: ${progress}%`);
      }
    }
    
    // Combine all chunks into a single ArrayBuffer
    const modelSize = chunks.reduce((total, chunk) => total + chunk.length, 0);
    const modelBuffer = new Uint8Array(modelSize);
    
    let offset = 0;
    for (const chunk of chunks) {
      modelBuffer.set(chunk, offset);
      offset += chunk.length;
    }
    
    statusCallback('Processing model...');
    console.log("Model download complete, loading into wllama...");
    
    // Load the model from the ArrayBuffer
    await wllama.loadModel([new Blob([modelBuffer])], {
      n_ctx: 1024
    });
    
    modelLoaded = true;
    console.log("Model loaded successfully!");
    statusCallback('Model ready');
    return true;
  } catch (error) {
    console.error('Failed to load model:', error);
    statusCallback('Error: ' + error.message);
    throw error;
  }
}

/**
 * Generate response from the model
 * @param {string} userMessage - User input message
 * @param {string} aiPrompt - System prompt for the AI assistant
 * @returns {Promise<string>} AI response
 */
async function generateResponse(userMessage, aiPrompt) {
  if (!wllama || !modelLoaded) {
    throw new Error('Model not loaded');
  }
  
  try {
    console.log("Generating response for prompt:", userMessage);
    
    // Format the prompt - using system/user/assistant format
    const formattedPrompt = `<|system|>
${aiPrompt}
<|user|>
${userMessage}
<|assistant|>`;
    
    // Generate text
    const response = await wllama.createCompletion(formattedPrompt, {
      nPredict: 100,
      temperature: 0.7,
      top_p: 0.95,
      top_k: 40,
      stop: ["<|user|>", "<|system|>"]
    });
    
    // console.log("Raw response:", response);
    
    // Clean up the response
    return cleanResponse(response);
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}

/**
 * Clean up the response text
 * @param {string} response - Raw response from the model
 * @returns {string} Cleaned response
 */
function cleanResponse(response) {
  // Extract content from [RESPONSE] tags if present
  const responseTagPattern = /\[RESPONSE\]([\s\S]*?)(?:\[\/RESPONSE\]|$)/i;
  const responseMatch = response.match(responseTagPattern);
  
  if (responseMatch && responseMatch[1].trim()) {
    return responseMatch[1].trim();
  }
  
  // Remove any template markers
  let cleaned = response;
  const markers = ["<|user|>", "<|system|>", "<|assistant|>"];
  
  // If any marker is found, truncate at that point
  for (const marker of markers) {
    const index = cleaned.indexOf(marker);
    if (index !== -1) {
      cleaned = cleaned.substring(0, index).trim();
    }
  }
  
  return cleaned || "I couldn't generate a proper response. Please try again.";
}

/**
 * Get wllama instance (for advanced usage)
 * @returns {Object|null} wllama instance
 */
function getWllamaInstance() {
  return wllama;
}

export default {
  loadModel,
  generateResponse,
  getWllamaInstance
};
