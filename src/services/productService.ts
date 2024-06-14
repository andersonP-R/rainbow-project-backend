import prisma from "../lib/prisma";

class ProductService {
  async getProducts() {
    const products = await prisma.product.findMany();
    return products;
  }

  async getProduct(slug: string) {
    const product = await prisma.product.findFirst({
      include: {
        ProductImage: true,
      },
      where: {
        slug,
      },
    });

    if (!product) return null;

    return {
      ...product,
      images: product.ProductImage.map((img) => img.url),
    };
  }
}

export default new ProductService();
