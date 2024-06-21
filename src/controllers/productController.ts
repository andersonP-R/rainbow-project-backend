import { Request, Response } from "express";
import productService from "../services/productService";

class ProductController {
  async getProducts(req: Request, res: Response) {
    try {
      const products = await productService.getProducts();
      return res.status(200).json(products);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Bad error" });
    }
  }

  async getProduct(req: Request, res: Response) {
    const { slug } = req.params;
    console.log(slug);
    try {
      const product = await productService.getProduct(slug);
      res.status(200).json(product);
      if (!product) return res.status(400).json({ message: "not found" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Bad error" });
    }
  }

  async search(req: Request, res: Response) {
    // const tags = req.query.tags;
    // console.log(tags);

    try {
      return res.status(200).json({ message: "ok" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Bad error" });
    }
  }
}

export default new ProductController();
