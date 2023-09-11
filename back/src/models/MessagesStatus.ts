import { Model, Table, Column, PrimaryKey, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./User";
import { Message } from "./Message";

@Table({
    tableName: "messagesStatus",
    timestamps: false,
})

export class MessagesStatus extends Model {
    @BelongsTo(() => Message)
        messages!: Message;
    
    @BelongsTo(() => User)
        users!: User;

    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
        id!: string;
    
    @Column({
        field: "is_read",
        type: DataType.BOOLEAN,
        defaultValue: true,
        allowNull: false
    })
        isRead!: boolean;
    
    @ForeignKey(() => Message)
    @Column({
        type: DataType.UUID,
        field: "message_id",
        allowNull: false,
    })
        messageId!: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        field: "user_id",
        allowNull: false,
    })
        userId!: string;
}