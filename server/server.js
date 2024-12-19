const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require("path");

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const url = "mongodb+srv://anupsree293:TKE4VcXmAtEhkc75@cluster0.oeisf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

// if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "../client/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname1, "../client/dist", "index.html"))
  );


// --------------------------deployment------------------------------
