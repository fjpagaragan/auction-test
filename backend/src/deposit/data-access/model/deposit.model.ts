import { DataTypes, Model } from "sequelize";
import { Deposit } from "../../../deposit/domain/deposit";
import { database } from "../../../common/config/database.config";
import UserModel from "../../../user/data-access/model/user.model";


class DepositModel extends Model<Deposit> {
    public id!: string;
    public user_id!: string;
    public amount!: number;
}


DepositModel.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
            references: {
                model: UserModel   ,
                key: "id" 
            },
            allowNull: false,
            unique: true
        },
        amount: {
            type: DataTypes.DECIMAL(17, 5),
            allowNull: false
        }
    },
    {
        tableName: "deposits",
        sequelize: database,
        timestamps: true
    }
)

export default DepositModel;