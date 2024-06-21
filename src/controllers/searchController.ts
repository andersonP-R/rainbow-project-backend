import type { Request, Response } from "express";
import searchService from "../services/searchService";

class SearchController {
  async getFilteredProducts(req: Request, res: Response) {
    const price = req.query.price as string;
    const type = req.query.type as string;
    const gender = req.query.gender as string;

    // console.log(price, tag, gender);

    const querys = req.query;

    try {
      const products = await searchService.getProducts(type, gender, price);
      return res.status(200).json(products);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Bad error" });
    }
  }

  async getProductsByTerm(req: Request, res: Response) {
    const { term } = req.params;

    try {
      const products = await searchService.getProductsByTerm(term);
      return res.status(200).json(products);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Bad error" });
    }
  }
}

export default new SearchController();
