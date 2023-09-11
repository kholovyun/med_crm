import { Model, Table, Column, PrimaryKey, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { User } from "./User";
import { Question } from "./Question";
import { MessagesStatus } from "./MessagesStatus";

@Table({
    tableName: "messages",
    timestamps: false
})

export class Message extends Model {
    @BelongsTo(() => Question)
        questions!: Question;
    
    @BelongsTo(() => User)
        users!: User;
    
    @HasMany(() => MessagesStatus)
        messagesStatus!: MessagesStatus[];
    
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
        id!: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        field: "author_id",
        allowNull: false,
    })
        authorId!: string;

    @Column({
        field: "created_at",
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    })
        createdAt!: Date;

    @ForeignKey(() => Question)
    @Column({
        type: DataType.UUID,
        field: "question_id",
        allowNull: false,
    })
        questionId!: string;

    @Column({
        type: DataType.STRING(256),
        allowNull: false,
    })
        text!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
        url!: string;
}