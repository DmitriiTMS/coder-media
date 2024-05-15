const { Users } = require("../db/models/user");
const argon2 = require("argon2");

const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({ include: "products" });
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
