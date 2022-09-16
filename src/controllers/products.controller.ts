import { Request, Response } from "express";
import { ProductModel } from "../models/products.model";

// post data
const createProduct = async (req: Request, res: Response) => {
  //   console.log(req.body);
  const product = new ProductModel(req.body);
  try {
    // create an instance of the product model and store it in the database
    if (product.quantity === 0) {
      product.status = "out-of-stock";
    }
    if (product.price < 0) {
      product.price = 0;
    }
    await product.save();
    res.status(201).json({
      message: "Product created successfully",
      status: 201,
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      message: "Product not created",
      status: 400,
      error: error,
    });
  }
};

export const productsRouter = { createProduct };
