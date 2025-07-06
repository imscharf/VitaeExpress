const express = require('express');
const { auth } = require('../controller/authController');
const { updateCv } = require('../controller/userController');

const router = express.Router();

// Rota para buscar os dados do usuário logado (incluindo o CV)
router.get('/me', auth, (req, res) => {
  // Retorna o usuário sem a senha
  const userProfile = req.user.toObject();
  delete userProfile.password;
  res.json(userProfile);
});

// Rota para atualizar o currículo do usuário logado
router.put('/me/cv', auth, updateCv);

module.exports = router;