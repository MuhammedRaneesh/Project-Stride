import express from "express"
import { getAllProducts , getProductById  } from "../controllers/productController.js"
import { calculating } from "../controllers/practic.js";
const router = express.Router() ; 

router.get("/" , getAllProducts) 
router.get("/data" , calculating)
router.get("/:id" , getProductById)

export default router
