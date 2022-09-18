"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const products_model_1 = require("../models/products.model");
// post data
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log(req.body);
    const product = new products_model_1.ProductModel(req.body);
    try {
        // create an instance of the product model and store it in the database
        if (product.quantity === 0) {
            product.status = "out-of-stock";
        }
        if (product.quantity < 0) {
            product.status = "discontinued";
        }
        if (product.price < 0) {
            product.price = 0;
        }
        yield product.save();
        res.status(201).json({
            message: "Product created successfully",
            status: 201,
            data: product,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Product not created",
            status: 400,
            error: error,
        });
    }
});
// get all products
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield products_model_1.ProductModel.find({
        // status: { $ne: "discontinued" },
        });
        res.status(200).json({
            message: "All products",
            status: 200,
            data: products,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "No products found",
            status: 400,
            error: error,
        });
    }
});
// get a single product
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield products_model_1.ProductModel.findById(req.params.id);
        res.status(200).json({
            message: "Single product",
            status: 200,
            data: product,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "No product found",
            status: 400,
            error: error,
        });
    }
});
// update a product
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield products_model_1.ProductModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            message: "Product updated successfully",
            status: 200,
            data: product,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Product not updated",
            status: 400,
            error: error,
        });
    }
});
// search for a product
const searchProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield products_model_1.ProductModel.find({
            // name: { $regex: req.params.name, $options: "i" },
            name: "Kiron",
        });
        console.log(req.params.name);
        res.status(200).json({
            message: "Product found",
            status: 200,
            data: product,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Product not found",
            status: 400,
            error: error,
        });
    }
});
exports.productsRouter = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
};
