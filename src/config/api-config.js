// API Configuration
const apiConfig = {
  // API backend endpoints
  grooming: {
    url: process.env.VUE_APP_GROOMING_API_URL || '/backend/predict',
  },

  ocr: {
    url: process.env.VUE_APP_OCR_API_URL || '/backend/extract-text/'
  }

};

export default apiConfig;