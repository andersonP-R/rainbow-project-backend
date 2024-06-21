import prisma from "../lib/prisma";
import { initialData } from "./seed-data";

async function main() {
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const { categories, products, users } = initialData;

  const categoriesData = categories.map((name) => ({
    name,
  }));

  await prisma.user.createMany({ data: users });
  await prisma.category.createMany({ data: categoriesData });

  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce((map, categorie) => {
    map[categorie.name.toLowerCase()] = categorie.id;
    return map;
  }, {} as Record<string, string>);

  products.forEach(async (prod) => {
    const { type, images, ...rest } = prod;
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        type,
        categoryId: categoriesMap[type],
      },
    });

    const imagesData = images.map((img) => ({
      url: img,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });

  console.log("Seed executed");
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
