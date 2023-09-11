import { Model, Table, Column, PrimaryKey, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Child } from "./Child";

@Table({
    tableName: "specialistExams",
    timestamps: false
})

export class SpecialistExam extends Model {
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
        specialist!: string;

    @Column({
        type: DataType.STRING(256),
        allowNull: false
    })
        name!: string;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false
    })
        date!: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
        conclusion!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
        recommend!: string;
}