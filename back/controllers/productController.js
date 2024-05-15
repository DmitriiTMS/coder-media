const { Products } = require("../db/models/product");

const getProducts = async (req, res) => {
  try {
    console.log("getProducts");
    return res.json('getProducts')
  } catch (error) {
    console.log(error);
  }
};

const getProductById = async (req, res) => {
  try {
    console.log("auth");
  } catch (error) {
    console.log(error);
  }
};

const createProduct = async (req, res) => {
  try {
   
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    console.log("auth");
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    console.log("auth");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
