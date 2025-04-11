const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const documentationRoutes = require('./routes/documentation');
const learningModuleRoutes = require('./routes/learningModules');


connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use('/api/docs', documentationRoutes);

app.use('/api/modules', learningModuleRoutes);


// Error handling
app.use((req, res) => {
  res.status(400).json({ message: "Undefinded routes" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
