import productSchema from "../Schema/products.schema";

// mongoose middleware to handle save data : pre and post
productSchema.pre("save", function (next) {
  console.log("this is from pre save", this);
  if (this.quantity === 0) {
      this.status = "out-of-stock";
  }
  next();
});

productSchema.post("save", function (doc, next) {
  console.log("this is from post save", doc);
  next();
});

export const productsMiddleware = { productSchema };
