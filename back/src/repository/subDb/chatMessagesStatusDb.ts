import { StatusCodes } from "http-status-codes";
import { errorCodesMathcher } from "../../helpers/errorCodeMatcher";
import IResponse from "../../interfaces/IResponse";
import IChatMessagesStatusGetDto from "../../interfaces/IChatMessagesStatus/IChatMessagesStatusGetDto";
import IError from "../../interfaces/IError";
import { User } from "../../models/User";
import { EErrorMessages } from "../../enums/EErrorMessages";
import { Message } from "../../models/Message";
import { MessagesStatus } from "../../models/MessagesStatus";
import IChatMessageStatusCreateDto from "../../interfaces/IChatMessagesStatus/IChatMessageStatusCreateDto";
import { IMessage } from "../../interfaces/IMessage";

export class ChatMessagesStatusDb {
    public getMessagesStatusByMessage = async (userId: string, messageId: string): Promise<IResponse<IChatMessagesStatusGetDto[] | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser) throw new Error(EErrorMessages.NO_ACCESS);
            
            const foundMessage = await Message.findByPk(messageId);
            if (!foundMessage) throw new Error(EErrorMessages.MESSAGE_NOT_FOUND);

            const messagesStatusArray: IChatMessagesStatusGetDto[] = await MessagesStatus.findAll({
                where: {messageId}
            });
            return {
                status: StatusCodes.OK,
                result: messagesStatusArray
            };

        } catch (err: unknown) {
            const error = err as Error;
            const status = errorCodesMathcher[error.message] || StatusCodes.INTERNAL_SERVER_ERROR;
            return {
                status,
                result: {
                    status: "error",
                    message: error.message
                }
            };
        }
    };

    public createMessageStatus = async (userId: string, messageStatus: IChatMessageStatusCreateDto): Promise<IResponse<IMessage | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser) throw new Error(EErrorMessages.NO_ACCESS);

            const foundMessage = await Message.findByPk(messageStatus.messageId);
            if (!foundMessage) throw new Error(EErrorMessages.MESSAGE_NOT_FOUND);
            
            const foundStatus = await MessagesStatus.findOne({
                where: {
                    messageId: foundMessage.id,
                    userId: userId,
                    isRead: true
                }
            });
            if (!foundStatus) {
                await MessagesStatus.create({...messageStatus});
                return {
                    status: StatusCodes.CREATED,
                    result: {message: "Статус сообщения создан!"}
                };
            }
            return {
                status: StatusCodes.OK,
                result: {message: "Сообщение прочитано."}
            };
            
        } catch (err: unknown) {
            const error = err as Error;
            const status = errorCodesMathcher[error.message] || StatusCodes.BAD_REQUEST;
            return {
                status,
                result: {
                    status: "error",
                    message: error.message
                }
            };
        }
    };
}

export const chatMessagesStatusDb = new ChatMessagesStatusDb();