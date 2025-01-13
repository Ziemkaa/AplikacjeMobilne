// server.js
require('dotenv').config(); // 1) Wczytaj .env jako pierwsze

const mongoose = require('mongoose');
const app = require('./app'); // zakładam, że tu jest skonfigurowany Express

// 2) Odczytaj zmienne z process.env
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET; 
// (Możesz też przekazać JWT_SECRET do innych plików przez process.env lub w inny sposób.)

// 3) Połącz się z MongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // w nowszych wersjach Mongoose domyślnie włączone/wyłączone są pewne opcje
  })
  .then(() => {
    console.log('Connected to MongoDB');
    // 4) Uruchom serwer dopiero gdy jest połączony z bazą
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
