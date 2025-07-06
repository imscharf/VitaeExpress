const User = require('../models/user');


exports.updateCv = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    user.cv = { ...user.cv, ...req.body };
    
    if (!user.cv.fullName) {
        user.cv.fullName = user.name;
    }

    if (!user.cv.email) {
        user.cv.email = user.email;
    }

    await user.save();

    res.json(user.cv);
  } catch (error) {
    console.error('Erro ao atualizar CV:', error);
    res.status(500).json({ message: 'Erro no servidor ao atualizar o currículo.', error });
  }
};