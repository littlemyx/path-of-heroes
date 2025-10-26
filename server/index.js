import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files from /static folder
app.use(express.static(path.join(__dirname, '../static')));

// API endpoint handler
app.all('/api/:actionName', (req, res) => {
  const { actionName } = req.params;
  
  // Placeholder for app-server logic
  res.json({
    message: `API endpoint for action: ${actionName}`,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Serving static files from: ${path.join(__dirname, '../static')}`);
  console.log(`API endpoints available at: /api/{actionName}`);
});
