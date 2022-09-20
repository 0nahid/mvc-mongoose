import { Request, Response } from "express";
import { ProductModel } from "../models/products.model";
interface Product {
  _id?: string;
  name: string;
  price: number;
  quantity: number;
  status: string;
}
interface queries {
  sortBy?: string;
  limit?: number;
  page?: number;
  fields?: string;
}
// post data
const createProduct = async (req: Request, res: Response) => {
  //   console.log(req.body);
  const product = new ProductModel(req.body);
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

// get all products
const getAllProducts = async (req: Request, res: Response) => {
  const filters = { ...req.query };
  // exclude the page and limit from the query
  const excludedFields = ["page", "limit", "sort"];
  excludedFields.forEach((field) => delete filters[field]);
  // build the query
  let queries:queries = {};
  if (req.query.sort) {
    const sortBy = req.query.sort.toString().split(",").join(" ");
    queries.sortBy = sortBy;
  }
  console.log(queries.sortBy);
  if (req.query.fields){
    const fields = req.query.fields.toString().split(",").join(" ");
    queries.fields = fields;
  }

  try {
    const products = await ProductModel.find({ ...filters }).sort(queries.sortBy).select(queries.fields);
    res.status(200).json({
      message: "All products",
      status: 200,
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      message: "No products found",
      status: 400,
      error: error,
    });
  }
};

// get a single product
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    res.status(200).json({
      message: "Single product",
      status: 200,
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      message: "No product found",
      status: 400,
      error: error,
    });
  }
};

// update a product
const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Product updated successfully",
      status: 200,
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      message: "Product not updated",
      status: 400,
      error: error,
    });
  }
};

// bulk update
const bulkUpdate = async (req: Request, res: Response) => {
  try {
    // const products = await ProductModel.updateMany({ _id:  req.body.ids },  req.body.data, {
    //   new: true,
    //   runValidators: true,
    // });
    // req.body.ids.forEach( id => {
    //   products.push(ProductModel.updateOne({ _id: id }, req.body.data));
    // })
    //  handle bulk update for unique products
    const products: Product[] = [];
    // console.log(req.body.ids);
    const data = req.body;
    data.ids.forEach((product: Product) => {
      const productData = ProductModel.updateOne(
        { _id: product._id },
        data.data
      );
      products.push(productData as unknown as Product);
    });
    const results = await Promise.all(products); // Promise.allSettled(products);
    // console.log(req.body.ids);
    res.status(200).json({
      message: "Products updated successfully",
      status: 200,
      data: results,
    });
  } catch (error) {
    res.status(400).json({
      message: "Products not updated",
      status: 400,
      error: error,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Product deleted successfully",
      status: 200,
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      message: "Product not deleted",
      status: 400,
      error: error,
    });
  }
};

// bulk delete product
const bulkDelete = async (req: Request, res: Response) => {
  // console.log(req.body.ids);
  try {
    const products = await ProductModel.deleteMany({ _id: req.body.ids });
    res.status(200).json({
      message: "Products deleted successfully",
      status: 200,
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      message: "Products not deleted",
      status: 400,
      error: error,
    });
  }
};

export const productsRouter = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  bulkUpdate,
  deleteProduct,
  bulkDelete,
};
