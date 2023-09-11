import { Model, Table, Column, PrimaryKey, DataType, ForeignKey, HasMany, HasOne, BelongsTo } from "sequelize-typescript";
import { Parent } from "./Parent";
import { ESex } from "../enums/ESex";
import { Document } from "./Document";
import { Allergy } from "./Allergy";
import { SpecialistExam } from "./SpecialistExam";
import { Vaccination } from "./Vaccination";
import { Visit } from "./Visit";
import { NewbornData } from "./NewbornData";
import { Question } from "./Question";

@Table({
    tableName: "children",
    timestamps: false
})

export class Child extends Model {
    @HasMany(() => Document)
        documents!: Document[];
    
    @HasMany(() => Allergy)
        allergies!: Allergy[];
    
    @HasMany(() => SpecialistExam)
        specialistExams!: SpecialistExam[];

    @HasMany(() => Vaccination)
        vaccinations!: Vaccination[];
    
    @HasMany(() => Visit)
        visits!: Visit[];
    
    @HasMany(() => Question)
        questions!: Question[];

    @HasOne(() => NewbornData)
        newbornDatas!: NewbornData;
    
    @BelongsTo(() => Parent)
        parents!: Parent;
    
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
        id!: string;

    @ForeignKey(() => Parent)
    @Column({
        type: DataType.UUID,
        field: "parent_id",
        allowNull: false
    })
        parentId!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
        photo!: string;

    @Column({
        type: DataType.STRING(256),
        allowNull: false
    })
        name!: string;

    @Column({
        type: DataType.STRING(256),
        allowNull: false
    })
        surname!: string;

    @Column({
        field: "date_of_birth",
        type: DataType.DATEONLY,
        allowNull: false
    })
        dateOfBirth!: Date;

    @Column({
        type: DataType.ENUM(...Object.values(ESex)),
        allowNull: false
    })
        sex!: ESex;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        allowNull: false
    })
        height!: number;

    @Column({
        type: DataType.DECIMAL(6, 3),
        defaultValue: 0,
        allowNull: false
    })
        weight!: number;

    @Column({
        type: DataType.STRING(256),
        allowNull: true
    })
        patronim!: string;

    @Column({
        field: "is_active",
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true
    })
        isActive!: boolean;
}