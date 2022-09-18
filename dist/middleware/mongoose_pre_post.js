"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsMiddleware = void 0;
const products_schema_1 = __importDefault(require("../Schema/products.schema"));
// mongoose middleware to handle save data : pre and post
products_schema_1.default.pre("save", function (next) {
    console.log("this is from pre save", this);
    if (this.quantity === 0) {
        this.status = "out-of-stock";
    }
    next();
});
products_schema_1.default.post("save", function (doc, next) {
    console.log("this is from post save", doc);
    next();
});
exports.productsMiddleware = { productSchema: products_schema_1.default };
