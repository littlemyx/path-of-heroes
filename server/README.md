# Server

This is a simple Express.js server for the Path of Heroes application.

## Features

1. **Static File Serving**: Serves static files from the `/static` folder at the project root
2. **API Endpoints**: Provides `/api/${actionName}` endpoints for application server logic

## Running the Server

```bash
# Run the server
npm run server

# Run the server with auto-restart on changes (Node.js 18.11+)
npm run server:dev
```

The server will start on port 3000 by default (can be configured via PORT environment variable).

## API Endpoints

All API endpoints follow the pattern: `http://localhost:3000/api/${actionName}`

Example:
- `GET http://localhost:3000/api/test`
- `POST http://localhost:3000/api/create`

The server will respond with:
```json
{
  "message": "API endpoint for action: {actionName}",
  "method": "{HTTP_METHOD}",
  "timestamp": "{ISO_TIMESTAMP}"
}
```

## Static Files

Place any static files (images, documents, etc.) in the `/static` folder at the project root.

They will be accessible at: `http://localhost:3000/{filename}`
