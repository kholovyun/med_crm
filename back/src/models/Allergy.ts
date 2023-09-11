import { Model, Table, Column, PrimaryKey, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Child } from "./Child";

@Table({
    tableName: "allergies",
    timestamps: false,
})

export class Allergy extends Model {
    @BelongsTo(() => Child)
        children!: Child;
    
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
        id!: string;

    @ForeignKey(() => Child)
    @Column({
        type: DataType.UUID,
        field: "child_id",
        allowNull: false,
    })
        childId!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
        type!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
        symptom!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
        factors!: string;
}