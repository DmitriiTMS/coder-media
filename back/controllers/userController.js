const { Users } = require("../db/models/user");
const validator = require("validator");
const argon2 = require("argon2");

const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "email", "role"],
      include: "products",
    });
    if (!users) {
      return res.status(200).json({ msg: "Пользователи не созданы" });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findOne({
      attributes: ["id", "name", "email", "role"],
      where: {
        id,
      },
      include: "products",
    });
    if (!user) {
      return res.status(200).json({ msg: `Пользователя с id ${id} нет` });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ msg: "Все поля должны быть заполнены" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ msg: "Ошибка в формате email" });
    }

    const userEmail = await Users.findOne({ where: { email } });

    if (userEmail) {
      return res
        .status(400)
        .json({ msg: "Пользователь с таким email уже создан" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Password не равен ConfirmPsssword" });
    }

    const hashPassword = await argon2.hash(password);

    const user = await Users.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    return res.status(200).json({ user, msg: "Пользователь создан" });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    console.log("auth");
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    console.log("auth");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
