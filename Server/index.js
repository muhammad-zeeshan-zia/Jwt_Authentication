const express=require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app=express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/JWT")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });



// Define a user schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
  });

  const User = mongoose.model('User', userSchema);


  app.post('/api/register', async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }});
    // Login endpoint
app.post('/api/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
  
      if (!user || !await bcrypt.compare(password, user.password)) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }
  
      const token = jwt.sign({ username }, 'zeeshan', { expiresIn: '20s' });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Protected route example
app.get('/api/welcome', authenticateToken, (req, res) => {
    res.json({ message: req.user.username });
  });
  
  // Middleware to verify JWT token
  function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
    jwt.verify(token, 'zeeshan', (err, user) => {
      if (err) return res.status(403).json({ error: 'Forbidden' });
      req.user = user;
      next();
    });
  }
  
app.listen("5000",()=>{
    console.log("Backend is running at server 5000");
})