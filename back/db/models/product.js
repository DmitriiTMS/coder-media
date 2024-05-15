"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const { Users } = require("./user");

const Products = sequelize.define("products", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
});

Users.hasMany(Products, { as: "products", onDelete: "CASCADE" });
Products.belongsTo(Users, { foreignKey: "userId" });

module.exports = {
  Products,
};
