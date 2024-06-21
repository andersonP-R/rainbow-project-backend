import type { Gender } from "@prisma/client";
import prisma from "../lib/prisma";

const prices = [
  25, 30, 35, 40, 45, 60, 65, 70, 75, 85, 90, 100, 110, 115, 130, 200, 225,
];

class SearchService {
  async getProducts(tag: string, gender: Gender, price: string) {
    const castPrice = parseFloat(price);

    if (!tag && !gender && !price) {
      const products = await prisma.product.findMany({
        include: {
          ProductImage: {
            take: 2,
            select: {
              url: true,
            },
          },
        },
      });

      const prodArray = products.map((prod) => ({
        ...prod,
        images: prod.ProductImage.map((img) => img.url),
      }));
      return prodArray;
    }

    const products = await prisma.product.findMany({
      where: {
        gender,

        tags: {
          has: tag ? tag : "shirt",
        },

        price: castPrice ? castPrice : { in: prices },
      },
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
    });

    const prodArray = products.map((prod) => ({
      ...prod,
      images: prod.ProductImage.map((img) => img.url),
    }));
    return prodArray;
  }
}

export default new SearchService();
