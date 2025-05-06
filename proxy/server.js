import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/lead', async (req, res) => {
  try {
    const response = await fetch('https://dev.emerchantauthority.com/api/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': '7478b4a8f4632828edf3176c1d860915',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({
      error: err,
      message: err.message,
      stack: err.stack, // This will give more detailed info (for debugging)
    });
  }
});

app.get('/api/business', async (req, res) => {
  try {
    const response = await fetch('https://dev.emerchantauthority.com/api/business', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': '7478b4a8f4632828edf3176c1d860915',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch business data');
    }

    const data = await response.json();
    res.json(data); // Send the business data to the client
  } catch (error) {
    console.error('❌ Error while fetching business data:', error.message);
    res.status(500).json({ message: 'Failed to fetch business data' });
  }
});

// Serve static frontend files AFTER API routes
app.use(express.static(path.join(__dirname, '..')));

app.listen(PORT, () => {
  console.log(`🚀 Proxy server running at http://localhost:${PORT}`);
});
