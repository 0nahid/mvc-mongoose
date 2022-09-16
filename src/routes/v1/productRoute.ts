import { Router } from "express";
import { productsRouter } from "../../controllers/products.controller";
const router: Router = Router();

router.post("/", productsRouter.createProduct);
router.get("/", productsRouter.getAllProducts);

export default router;
