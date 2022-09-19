import { Router } from "express";
import { productsRouter } from "../../controllers/products.controller";
const router: Router = Router();

// router.post("/", productsRouter.createProduct);
// router.get("/", productsRouter.getAllProducts);
/***
 * @get all products  route (GET /api/v1/products)
 * @get a single product route (GET /api/v1/products/:id)
 * @create a product route (POST /api/v1/products)
 * @update a product route (PUT /api/v1/products/:id)
 * @bulkUpdate update many products route (PUT /api/v1/products)
 * @delete a product route (DELETE /api/v1/products/:id)
 */
router
  .route("/")
  .post(productsRouter.createProduct)
  .get(productsRouter.getAllProducts);

router.patch("/bulk", productsRouter.bulkUpdate);

router
  .route("/:id")
  .get(productsRouter.getSingleProduct)
  .patch(productsRouter.updateProduct)
  .delete(productsRouter.deleteProduct);

export default router;
