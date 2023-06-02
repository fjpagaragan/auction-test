import { DataTypes, Model } from "sequelize";
import { Bid } from "../../../bid/domain/bid";
import { database } from "../../../common/config/database.config";
import UserModel from "../../../user/data-access/model/user.model";
import ItemModel from "../../../item/data-access/model/item.model";


class BidModel extends Model<Bid> {
    public id!: string;
    public user_id!: string;
    public item_id!: string;
    public amount!: number;
    public status!: string;
}

BidModel.init(
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
        item_id: {
            type: DataTypes.UUID,
            references: {
                model: ItemModel,
                key: "id"
            },
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(17, 5),
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        tableName: "bids",
        sequelize: database,
        timestamps: true
    }
);

export default BidModel;