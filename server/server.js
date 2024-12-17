const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const url = process.env.MONGODB_URL;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const matchMakingRoutes = require('./routes/matchmakingRoutes');
const connectionRoutes = require('./routes/connectionRoutes');

app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/notification', notificationRoutes);
app.use('/api/matchMakingRoutes', matchMakingRoutes);
app.use('/api/connection', connectionRoutes);

// Listen on port
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('Hello');
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
