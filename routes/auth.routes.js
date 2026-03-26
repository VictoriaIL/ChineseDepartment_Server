const { Router } = require('express');
const router = Router();

const { Users } = require('../models/user.model');
const { JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

router.post('/register', async (req, res) => {
  try {
    const { login, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await Users.create({ login, password: hashedPassword });
    res.status(201).json({ message: 'User created', userId: user.id });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post(
  '/login',
  [check('password', 'Неверный пароль').exists()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе',
        });
      }

      const { login, password } = req.body;
      const person = await Users.findOne({ login });

      if (!person) {
        return res.status(404).json({ message: 'Неверный логин или пароль' });
      }

      const isMatch = await bcrypt.compare(password, person.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Неверный логин или пароль' });
      }
      const token = jwt.sign({ userId: person.id }, JWT_SECRET, {
        expiresIn: '1h',
      });
      res.status(201).json({
        token,
        userId: person.id,
        message: 'Выполнен вход в систему!',
      });
    } catch (e) {
      res.status(500).json({
        message: 'Произошла ошибка, попробуйте перезагрузить страницу',
        e: e.message,
      });
    }
  }
);

module.exports = router;
