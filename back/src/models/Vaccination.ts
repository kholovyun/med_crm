import { Model, Table, Column, PrimaryKey, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Child } from "./Child";

@Table({
    tableName: "vaccinations",
    timestamps: false
})

export class Vaccination extends Model {
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
        type: DataType.STRING(256),
        allowNull: false
    })
        infection!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
        vaccine!: string;

    @Column({
        type: DataType.STRING(256),
        allowNull: true
    })
        age!: string;

    @Column({
        type: DataType.DATEONLY,
        allowNull: true
    })
        date!: Date;

    @Column({
        type: DataType.STRING(256),
        allowNull: true
    })
        dose!: string;

    @Column({
        type: DataType.STRING(256),
        allowNull: true
    })
        serial!: string;

    @Column({
        type: DataType.STRING(256),
        allowNull: true
    })
        manufacturer!: string;

    @Column({
        type: DataType.STRING(256),
        allowNull: true
    })
        reaction!: string;

    @Column({
        type: DataType.STRING(256),
        allowNull: true
    })
        conterindication!: string;

    @Column({
        type: DataType.STRING(256),
        allowNull: true
    })
        notes!: string;
}