import "dotenv/config";
import app from "./app";

const PORT = process.env.PORT || 8080;

// TODO: database connection here

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { server };
