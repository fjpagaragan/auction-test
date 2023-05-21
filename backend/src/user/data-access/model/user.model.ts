import { DataTypes, Model } from "sequelize";
import { User } from "../../domain/user";
import { database } from "../../../common/config/database.config";


class UserModel extends Model<User> {
    public id!: string;
    public email!: string;
    public password!: string;
}

UserModel.init(
    {
        id: {
            type: new DataTypes.UUID,
            primaryKey: true,
        },
        email: {
            type: new DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: new DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        tableName: "users",
        sequelize: database,
        timestamps: true,
    }
);

export default UserModel;