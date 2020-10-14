const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (!users.length) {
        res.status(200).send({ data: [] });
        return;
      }
      res.send(users);
    })
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => new Error('NotFound'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Невалидный id' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.changeUserInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true })
    .orFail(() => new Error('NotFound'))
    .then(() => res.send({ message: 'Профиль пользователя обновлен' }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      } else if (err.name === 'CastError') {
        res.status(404).send({ message: 'Невалидный id' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.changeUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true })
    .orFail(() => new Error('NotFound'))
    .then(() => res.send({ message: 'Аватар обновлен' }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Невалидный id' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};
