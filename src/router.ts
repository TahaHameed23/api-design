import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { handleInputErr } from "./modules/middleware";
import {
    createProduct,
    deleteProduct,
    getOneProduct,
    getProducts,
    updateProduct,
} from "./handlers/product";
import {
    getUpdates,
    getOneUpdate,
    updateUpdate,
    deleteUpdate,
    createUpdate,
} from "./handlers/update";
const router = Router();

// Product
router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);
router.put(
    "/product/:id",
    body("name").isString(),
    handleInputErr,
    updateProduct
);
router.post("/product", body("name").isString(), handleInputErr, createProduct);
router.delete("/product", deleteProduct);

router.get("/update", getUpdates);
router.get("/update/:id", getOneUpdate);
router.put(
    "/update/:id",
    body("title").optional(),
    body("body").optional(),
    body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
    body("version").optional(),
    updateUpdate
);

router.post(
    "/update",
    body("title").exists().isString,
    body("body").exists().isString,
    body("productId").exists().isString,
    createUpdate
);
router.delete("/update", deleteUpdate);

router.get(" /updatepoint", () => {});
router.get(" /updatepoint/:id", () => {});
router.put(
    " /updatepoint/:id",
    body("name").optional().isString(),
    body("description").optional().isString(),
    () => {}
);
router.post(
    "/updatepoint",
    body("name").optional().isString(),
    body("description").optional().isString(),
    body("updatedId").exists().isString(),
    () => {}
);
router.delete("/updatepoint", () => {});

// router.use((err,req, res, next)=> {
//     console.log(err);
//     res.status(500).json({message: "In  router"})

// })

export default router;
