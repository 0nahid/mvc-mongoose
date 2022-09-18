"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../../controllers/products.controller");
const router = (0, express_1.Router)();
// router.post("/", productsRouter.createProduct);
// router.get("/", productsRouter.getAllProducts);
/***
 * @get all products  route (GET /api/v1/products)
 * @get a single product route (GET /api/v1/products/:id)
 * @create a product route (POST /api/v1/products)
 * @update a product route (PUT /api/v1/products/:id)
 * @delete a product route (DELETE /api/v1/products/:id)
 */
router
    .route("/")
    .post(products_controller_1.productsRouter.createProduct)
    .get(products_controller_1.productsRouter.getAllProducts);
router
    .route("/:id")
    .get(products_controller_1.productsRouter.getSingleProduct)
    .patch(products_controller_1.productsRouter.updateProduct);
exports.default = router;
