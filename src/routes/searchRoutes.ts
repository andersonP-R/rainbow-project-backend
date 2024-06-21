import { Router } from "express";
import searchController from "../controllers/searchController";

const router = Router();

// SEARCH ROUTES ("/api/search")
router.get("/", searchController.getFilteredProducts);
router.get("/:term", searchController.getProductsByTerm);

export default router;
