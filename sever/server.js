const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const configRoutes = require('./routes/configRoutes');
const { dbURI } = require('./config');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/config', configRoutes);

mongoose.connect(dbURI)
    .then(() => console.log('Conectado ao MongoDB Atlas'))
    .catch(err => console.log('Erro ao conectar ao MongoDB Atlas:', err));

if (process.env.NODE_ENV !== 'production') {
    app.listen(5000, () => {
        console.log('Servidor rodando na porta 5000');
    });
}

module.exports = app;