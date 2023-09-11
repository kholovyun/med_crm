import { Model, Table, Column, PrimaryKey, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./User";

@Table({
    tableName: "reviews",
    timestamps: false
})

export class Review extends Model {
    @BelongsTo(() => User)
        users!: User;

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
    
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
        text!: string;

    @Column({
        field: "created_at",
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    })
        createdAt!: Date;
}