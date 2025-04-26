# UV Index API Documentation

## Base URL
```
https://api.example.com
```

## Endpoints

### Get UV Index
```
GET /uv-index
```
Get the current UV index for a specified location.

**Parameters:**
- location (string, required): City or region name

**Response:**
```json
{
  "location": "Melbourne, VIC",
  "uvIndex": 5.2,
  "timestamp": "2024-03-20T10:30:00Z",
  "level": "Moderate",
  "recommendations": "Use sunscreen and protective clothing"
}
```

### Get Location Suggestions
```
GET /locations/suggest
```
Get location suggestions based on search query.

**Parameters:**
- query (string, required): Search term

**Response:**
```json
{
  "suggestions": [
    "Melbourne, VIC",
    "Melbourne Beach, FL",
    "Melbourne Airport, VIC"
  ]
}
```

## Error Responses

All endpoints return errors in the following format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

Common error codes:
- `INVALID_INPUT`: Invalid input parameters
- `NOT_FOUND`: Resource not found
- `SERVER_ERROR`: Internal server error 