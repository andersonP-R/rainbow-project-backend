import type { Request, Response } from "express";
import searchService from "../services/searchService";
import { Gender } from "@prisma/client";

class SearchController {
  async getFilteredProducts(req: Request, res: Response) {
    const price = req.query.price as string;
    const tag = req.query.tag as string;
    const gender = req.query.gender as Gender;

    // console.log(price, tag, gender);

    const querys = req.query;

    try {
      const products = await searchService.getProducts(tag, gender, price);
      return res.status(200).json(products);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Bad error" });
    }
  }
}

export default new SearchController();
