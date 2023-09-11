import { Model, Table, Column, PrimaryKey, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./User";
import { EPaymentType } from "../enums/EPaymentType";

@Table({
    tableName: "subscriptions",
    timestamps: false
})

export class Subscription extends Model {
    @BelongsTo(() => User, "userId")
        users!: User;

    @BelongsTo(() => User, "payed_by")
        payers!: User;

    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
        id!: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        field: "user_id",
        allowNull: false
    })
        userId!: string;
    
    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        field: "payed_by",
        allowNull: false
    })
        payedBy!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
        type!: number;

    @Column({
        type: DataType.ENUM(...Object.values(EPaymentType)),
        field: "payment_type",
        allowNull: false
    })
        paymentType!: EPaymentType;

    @Column({
        type: DataType.DECIMAL(10,2),
        allowNull: false,
        defaultValue: 0.00
    })
        sum!: number;

    @Column({
        field: "end_date",
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    })
        endDate!: Date;
}