const { Users } = require("../db/models/user");

const verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Нет userId authUser" });
  }

  const user = await Users.findOne({
    where: {
      id: req.session.userId,
    },
  });

  if (!user)
    return res.status(404).json({ msg: "Пользователь нет по id authUser" });
  req.userId = user.id;
  req.role = user.role;
  next();
};

const adminOnly = async (req, res, next) => {
  const user = await Users.findOne({
    where: {
      id: req.session.userId,
    },
  });

  if (!user)
    return res.status(404).json({ msg: "Пользователь нет по id authUser" });

  if (user.role !== "admin")
    return res.status(403).json({ msg: "Пользователь не админ authUser" });
  next();
};

module.exports = {
  verifyUser,
  adminOnly,
};
