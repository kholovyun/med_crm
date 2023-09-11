import { Model, Table, Column, PrimaryKey, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Doctor } from "./Doctor";

@Table({
    tableName: "diplomas",
    timestamps: false
})

export class Diploma extends Model {
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
        url!: string;
}