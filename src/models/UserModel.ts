import { DataTypes, Model, ModelStatic } from "sequelize";
import db from "../db/dbConnection";
import { IUser } from "../interfaces/IUser";

const UserModel: ModelStatic<Model<IUser>> = db.define("User", {
  fullname: {
    type: DataTypes.STRING,
  },
  dni: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
});

export default UserModel;
