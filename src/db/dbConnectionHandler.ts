import db from "./dbConnection";

/**
 * Handles the DB connection.
 */
export default async function dbConnectionHandler() {
  try {
    // await db.sync({ force: false });
    await db.authenticate();
    console.log("database online");
  } catch (error) {
    throw new Error(error as string);
  }
}
