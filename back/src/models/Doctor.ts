import { Model, Table, Column, PrimaryKey, DataType, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import { User } from "./User";
import { Diploma } from "./Diploma";
import { Question } from "./Question";
import { Parent } from "./Parent";
import { Recommendation } from "./Recommendation";

@Table({
    tableName: "doctors",
    timestamps: false
})

export class Doctor extends Model {
    @HasMany(() => Diploma)
        diplomas!: Diploma[]; 

    @HasMany(() => Question)
        questions!: Question[];

    @HasMany(() => Parent)
        parents!: Parent[];
    
    @HasMany(() => Recommendation)
        recommendations!: Recommendation[];
        
    @BelongsTo(() => User)
        users!: User;

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
    
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
        photo!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: "-"
    })
        speciality!: string;

    @Column({
        field: "place_of_work",
        type: DataType.STRING(256),
        allowNull: false,
        defaultValue: "-"
    })
        placeOfWork!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            max: 80,
            min: 0
        }
    })
        experience!: number;

    @Column({
        field: "is_active",
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true
    })
        isActive!: boolean;
    
    @Column({
        type: DataType.DECIMAL(10,2),
        allowNull: false,
        defaultValue: 0.00
    })
        price!: number;

    @Column({        
        type: DataType.STRING,
        allowNull: true
    })
        achievements!: string;
    
    @Column({
        type: DataType.STRING(256),
        allowNull: true
    })
        degree!: string;
}