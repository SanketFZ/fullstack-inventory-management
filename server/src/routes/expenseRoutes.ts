import { Router } from "express";
import { getexpensesByCategory } from "../contollers/expenseController";

const router = Router();

router.get("/",getexpensesByCategory);

export default router;