// AWS Configuration
export const awsConfig = {
  // AWS Region
  region: 'ap-southeast-2', // Sydney, Australia region

  // API Gateway
  apiGateway: {
    ENDPOINT: process.env.VUE_APP_API_ENDPOINT,
  },

  // Cognito User Pool
  cognito: {
    USER_POOL_ID: process.env.VUE_APP_COGNITO_USER_POOL_ID,
    CLIENT_ID: process.env.VUE_APP_COGNITO_CLIENT_ID,
  },

  // S3 Bucket
  s3: {
    BUCKET_NAME: process.env.VUE_APP_S3_BUCKET,
  }
} 