import { Model, Table, Column, PrimaryKey, DataType, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import { Doctor } from "./Doctor";
import { Child } from "./Child";
import { Parent } from "./Parent";
import { Message } from "./Message";

@Table({
    tableName: "questions",
    timestamps: false
})

export class Question extends Model {
    @HasMany(() => Message)
        messages!: Message[];

    @BelongsTo(() => Doctor)
        doctors!: Doctor;
    
    @BelongsTo(() => Parent)
        parents!: Parent;
    
    @BelongsTo(() => Child)
        children!: Child;

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

    @ForeignKey(() => Child)
    @Column({
        type: DataType.UUID,
        field: "child_id",
        allowNull: false
    })
        childId!: string;

    @ForeignKey(() => Parent)
    @Column({
        type: DataType.UUID,
        field: "parent_id",
        allowNull: false
    })
        parentId!: string;

    @Column({
        field: "created_at",
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    })
        createdAt!: Date;
    
    @Column({
        type: DataType.STRING(256),
        allowNull: false
    })
        question!: string;
}