import { Model, Table, Column, PrimaryKey, DataType, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import { User } from "./User";
import { Doctor } from "./Doctor";
import { Child } from "./Child";
import { Question } from "./Question";

@Table({
    tableName: "parents",
    timestamps: false
})

export class Parent extends Model {
    @HasMany(() => Child)
        children!: Child[];
    
    @HasMany(() => Question)
        question!: Question[];

    @BelongsTo(() => User)
        users!: User;

    @BelongsTo(() => Doctor)
        doctors!: Doctor;

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

    @ForeignKey(() => Doctor)
    @Column({
        type: DataType.UUID,
        field: "doctor_id",
        allowNull: false
    })
        doctorId!: string;

    @Column({
        field: "register_date",
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    })
        registerDate!: Date;

    @Column({
        field: "is_active",
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
        isActive!: boolean;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: "subscription_end_date"
    })
        subscriptionEndDate!: Date;
}