const { Users } = require("../db/models/user");
const argon2 = require("argon2");

const login = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) return res.status(404).json({ msg: "Пользователь не создан" });

    const match = await argon2.verify(user.password, req.body.password);

    if (!match) return res.status(400).json({ msg: "Ошибка пароля" });
    req.session.userId = user.id;
    const id = user.id;
    const name = user.name;
    const email = user.email;
    const role = user.role;

    return res.status(200).json({ id, name, email, role });
  } catch (error) {
    console.log(error);
  }
};

const me = async (req, res) => {
    if(!req.session.userId) {
        return res.status(401).json({msg: "Нет userId"})
    }

    const user = await Users.findOne({
        attributes: ["id", "name", "email", "role"],
        where: {
          id: req.session.userId,
        },
      });
  
      if (!user) return res.status(404).json({ msg: "Пользователь нет по id" });
      
      return res.status(200).json(user)
}

const logOut = async (req, res) => {
  try {
    req.session.destroy((error) => {
      if (error) {
        return res.status(400).json({ msg: "Ошибка выхода из системы" });
      }
      return res.status(200).json({ msg: "Вы вышли из системы" });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  login,
  me,
  logOut,
};
