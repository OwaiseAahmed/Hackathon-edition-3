// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MongoDB URI is missing. Check your .env file.");
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

// MongoDB Connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Sample route
app.get('/', (req, res) => {
  res.send('🚀 SkillBridge Backend is Running!');
});

// Import and use your routes here
// import authRoutes from './routes/authRoutes.js';
// app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`🌐 Server running on http://localhost:${PORT}`);
});
