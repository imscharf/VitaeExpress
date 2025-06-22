const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes'); // Adicione esta linha
const { dbURI } = require('./config');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes); // Adicione esta linha

mongoose.connect(dbURI)
    .then(() => console.log('Conectado ao MongoDB Atlas'))
    .catch(err => console.log('Erro ao conectar ao MongoDB Atlas:', err));

app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
});