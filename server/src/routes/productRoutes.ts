import { Router } from "express";
import { getDashboardMetrics } from "../contollers/dashboardController";
import {getProducts , createProduct} from "../contollers/productsContolller"


const router = Router();

router.get("/",getProducts);
router.post("/",createProduct);


export default router;