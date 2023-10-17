const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000; 

app.use(express.json());

app.post('/api/cost', async (req, res) => {
  try {
    const response = await axios.post('https://api.rajaongkir.com/starter/cost', req.body, {
      headers: {
        key: 'aac75978ddf338dc5d0c08f76b7161b3',
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json(error.response.data);
  }
});

app.get('/api/city', async (req, res) => {
    try {
      const response = await axios.get('https://api.rajaongkir.com/starter/city', req.body, {
        headers: {
          key: 'aac75978ddf338dc5d0c08f76b7161b3',
        },
      });
      res.json(response.data);
    } catch (error) {
      res.status(500).json(error.response.data);
    }
  });
  app.get('/api/province', async (req, res) => {
    try {
      const response = await axios.get('https://api.rajaongkir.com/starter/province', req.body, {
        headers: {
          key: 'aac75978ddf338dc5d0c08f76b7161b3',
        },
      });
      res.json(response.data);
    } catch (error) {
      res.status(500).json(error.response.data);
    }
  });
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
