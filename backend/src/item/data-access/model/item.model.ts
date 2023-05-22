import { DataTypes, Model } from "sequelize";
import { Item } from "../../../item/domain/item";
import { database } from "../../../common/config/database.config";
import UserModel from "../../../user/data-access/model/user.model";


class ItemModel extends Model<Item> {
    public id!: string;
    public user_id!: string;
    public name!: string;
    public start_price!: number;
    public duration!: number;
}

ItemModel.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
            references: {
                model: UserModel,
                key: "id"
            },
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        start_price: {
            type: DataTypes.DECIMAL(17, 5),
            allowNull: false,
        },
        duration: {
            type: DataTypes.INTEGER(),
            allowNull: false,
        }
    },
    {
        tableName: "items",
        sequelize: database,
        timestamps: true
    }
)

export default ItemModel;