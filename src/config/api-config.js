// API Configuration

const apiConfig = {
  // FastAPI backend endpoints
  grooming: {
    // Try different URLs based on environment
    // 1. Default local development
    url: process.env.VUE_APP_GROOMING_API_URL || 'http://localhost:8000/predict',
    
    // 2. Alternative if running in same origin as front-end
    // url: '/api/predict',
    
    // 3. IP address option (for local network)
    // url: 'http://192.168.0.49:8000/predict',
  },
  
  // Other API configurations can be added here
};

export default apiConfig; 