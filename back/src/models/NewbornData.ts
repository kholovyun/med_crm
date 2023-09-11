import { Model, Table, Column, PrimaryKey, DataType, ForeignKey, BelongsTo,  } from "sequelize-typescript";
import { Child } from "./Child";

@Table({
    tableName: "newbornDatas",
    timestamps: false
})

export class NewbornData extends Model {
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
        field: "discharged_date",
        type: DataType.DATEONLY,
        allowNull: false,
        defaultValue: DataType.NOW
    })
        dischargedDate!: Date;

    @Column({
        field: "pregnancy_n",
        type: DataType.INTEGER,
        defaultValue: 0,
        allowNull: false
    })
        pregnancyN!: number;

    @Column({
        field: "pregnancy_descript",
        type: DataType.STRING,
        defaultValue: "-",
        allowNull: false
    })
        pregnancyDescript!: string;

    @Column({
        field: "birth_n",
        type: DataType.INTEGER,
        defaultValue: 0,
        allowNull: false
    })
        birthN!: number;

    @Column({
        field: "gest_age",
        type: DataType.INTEGER,
        defaultValue: 0,
        allowNull: false
    })
        gestAge!: number;

    @Column({
        field: "period_1",
        type: DataType.INTEGER,
        defaultValue: 0,
        allowNull: false
    })
        period1!: number;

    @Column({
        field: "period_2",
        type: DataType.INTEGER,
        defaultValue: 0,
        allowNull: false
    })
        period2!: number;

    @Column({
        field: "amn_abs_period",
        type: DataType.INTEGER,
        defaultValue: 0,
        allowNull: false
    })
        amnAbsPeriod!: number;

    @Column({
        field: "amn_descript",
        type: DataType.STRING(256),
        defaultValue: "-",
        allowNull: false
    })
        amnDescript!: string;

    @Column({
        type: DataType.STRING(256),
        defaultValue: "-",
        allowNull: false
    })
        anesthesia!: string;

    @Column({
        field: "post_birth_period",
        type: DataType.STRING(256),
        defaultValue: "-",
        allowNull: false
    })
        postBirthPeriod!: string;

    @Column({
        field: "mother_state",
        type: DataType.STRING,
        defaultValue: "-",
        allowNull: false
    })
        motherState!: string;

    @Column({
        field: "birth_weight",
        type: DataType.DECIMAL(4,3),
        defaultValue: 0,
        allowNull: false
    })
        birthWeight!: number;

    @Column({
        field: "birth_height",
        type: DataType.INTEGER,
        defaultValue: 0,
        allowNull: false
    })
        birthHeight!: number;

    @Column({
        field: "newborn_state",
        type: DataType.STRING(256),
        defaultValue: "-",
        allowNull: false
    })
        newbornState!: string;

    @Column({
        field: "apgar_score",
        type: DataType.STRING(10),
        defaultValue: "-",
        allowNull: false
    })
        apgarScore!: string;

    @Column({
        type: DataType.STRING(256),
        defaultValue: "-",
        allowNull: false
    })
        reanimation!: string;

    @Column({
        field: "breast_try",
        type: DataType.BOOLEAN,
        defaultValue: true,
        allowNull: false
    })
        breastTry!: boolean;

    @Column({
        type: DataType.STRING(256),
        defaultValue: "-",
        allowNull: false
    })
        feeding!: string;

    @Column({
        type: DataType.STRING,
        defaultValue: "-",
        allowNull: false
    })
        diagnosis!: string;

    @Column({
        type: DataType.STRING,
        defaultValue: "-",
        allowNull: false
    })
        examination!: string;

    @Column({
        type: DataType.STRING,
        defaultValue: "-",
        allowNull: false
    })
        treatment!: string;

    @Column({
        type: DataType.STRING(256),
        defaultValue: "-",
        allowNull: false
    })
        eyes!: string;

    @Column({
        type: DataType.STRING(256),
        defaultValue: "-",
        allowNull: false
    })
        reflexes!: string;

    @Column({
        type: DataType.STRING(256),
        defaultValue: "-",
        allowNull: false
    })
        skin!: string;

    @Column({
        type: DataType.STRING(256),
        defaultValue: "-",
        allowNull: false
    })
        organs!: string;

    @Column({
        type: DataType.STRING(256),
        defaultValue: "-",
        allowNull: false
    })
        stool!: string;

    @Column({
        type: DataType.STRING(256),
        defaultValue: "-",
        allowNull: false
    })
        diuresis!: string;

    @Column({
        field: "umbilical_cord",
        type: DataType.STRING(256),
        defaultValue: "-",
        allowNull: false
    })
        umbilicalCord!: string;

    @Column({
        field: "examed_by",
        type: DataType.STRING(256),
        defaultValue: "-",
        allowNull: false
    })
        examedBy!: string;

    @Column({
        type: DataType.STRING(256),
        defaultValue: "-",
        allowNull: true
    })
        notes!: string;

    @Column({
        field: "feeding_reason",
        defaultValue: "-",
        type: DataType.STRING(256),
        allowNull: true
    })
        feedingReason!: string;
}