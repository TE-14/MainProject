// API Configuration
const apiConfig = {
  // API backend endpoints
  grooming: {
    // Use different URLs based on environment
    // Default local development
    url: process.env.VUE_APP_GROOMING_API_URL || 'https://api.shieldskills.live/predict',
    
    // 2. Alternative if running in same origin as front-end
    // url: '/api/predict',
    
    // 3. IP address option (for local network)
    // url: 'https://192.168.0.45:8000/predict',
  },
  
  // OCR API configuration for image text extraction
  ocr: {
    url: process.env.VUE_APP_OCR_API_URL || 'https://api.shieldskills.live/extract-text/'
  }
  
  // Other API configurations can be added here
};

export default apiConfig;