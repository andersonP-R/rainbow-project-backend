import { Router } from "express";
import searchController from "../controllers/searchController";

const router = Router();

// SEARCH ROUTES ("/api/search")
router.get("/", searchController.getFilteredProducts);

export default router;
