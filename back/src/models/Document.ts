import { Model, Table, Column, PrimaryKey, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Child } from "./Child";

@Table({
    tableName: "documents",
    timestamps: false
})

export class Document extends Model {
    @BelongsTo(() => Child)
        children!: Child;

    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
        id!: string;

    @ForeignKey(() => Child)
    @Column({
        type: DataType.UUID,
        field: "child_id",
        allowNull: false
    })
        childId!: string;

    @Column({
        field: "created_at",
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    })
        createdAt!: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
        url!: string;
}