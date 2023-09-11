import { Model, Table, Column, PrimaryKey, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Doctor } from "./Doctor";

@Table({
    tableName: "recommendations",
    timestamps: false
})

export class Recommendation extends Model {
    @BelongsTo(() => Doctor)
        doctors!: Doctor;

    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
        id!: string;

    @ForeignKey(() => Doctor)
    @Column({
        type: DataType.UUID,
        field: "doctor_id",
        allowNull: false
    })
        doctorId!: string;
    
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

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
        url!: string;
}