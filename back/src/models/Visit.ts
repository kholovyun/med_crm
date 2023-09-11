import { Model, Table, Column, PrimaryKey, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { EVisitReasons } from "../enums/EVisitReasons";
import { Child } from "./Child";

@Table({
    tableName: "visits",
    timestamps: false,
})

export class Visit extends Model {
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
        allowNull: false
    })
        childId!: string;

    @Column({
        type: DataType.ENUM(...Object.values(EVisitReasons)),
        allowNull: false,
    })
        reason!: EVisitReasons;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
    })
        date!: Date;
    
    @Column({
        type: DataType.STRING,
        field: "clinic_data",
        allowNull: false,
    })
        clinicData!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
        conclusion!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
        appointment!: string;

    @Column({
        type: DataType.STRING(256),
        allowNull: false,
    })
        place!: string;
}