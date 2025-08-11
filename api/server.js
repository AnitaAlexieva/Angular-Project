const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // добавяме mongoose
require('dotenv').config();

const app = express();
const clothingRoutes = require('./routes/clothingRoutes');
app.use('/api/clothes', clothingRoutes);

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('DB connection error:', err));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
