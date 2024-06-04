import { Sequelize } from "sequelize";

const db = new Sequelize("rainbow-db", "root", "1234", {
  host: process.env.DB_URI_DEV,
  dialect: "mysql",
});

export default db;
