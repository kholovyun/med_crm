import { StatusCodes } from "http-status-codes";
import { errorCodesMathcher } from "../../helpers/errorCodeMatcher";
import IChatMessageCreateDto from "../../interfaces/IChatMessage/IChatMessageCreateDto";
import { User } from "../../models/User";
import IResponse from "../../interfaces/IResponse";
import { EErrorMessages } from "../../enums/EErrorMessages";
import { Question } from "../../models/Question";
import { ERoles } from "../../enums/ERoles";
import { Parent } from "../../models/Parent";
import { Doctor } from "../../models/Doctor";
import { Message } from "../../models/Message";
import { deleteFile } from "../../helpers/deleteFile";
import { MessagesStatus } from "../../models/MessagesStatus";
import IChatMessageWithUserGetDto from "../../interfaces/IChatMessage/IChatMessageWithUserGetDto";
import IError from "../../interfaces/IError";
import { IMessage } from "../../interfaces/IMessage";
import IChatMessage from "../../interfaces/IChatMessage/IChatMessage";

export class ChatMessagesDb {

    public getMessagesByQuestion = async (userId: string, questionId: string): Promise<IResponse<IChatMessageWithUserGetDto[] | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser) throw new Error(EErrorMessages.NO_ACCESS);

            const foundQuestion = await Question.findByPk(questionId);
            if (!foundQuestion) throw new Error(EErrorMessages.QUESTION_NOT_FOUND);

            const messages: IChatMessageWithUserGetDto[] = await Message.findAll({
                where: {questionId},
                include: {
                    model: User,
                    as: "users",
                    attributes: ["role", "name", "patronim", "surname"]
                },
                order: [
                    ["createdAt", "ASC"]
                ]
            });
            return {
                status: StatusCodes.OK,
                result: messages
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
    
    public createMessage = async (userId: string, message: IChatMessageCreateDto): Promise<IResponse<IChatMessage | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser) throw new Error(EErrorMessages.NO_ACCESS);

            const foundQuestion = await Question.findByPk(message.questionId);
            if (!foundQuestion) throw new Error(EErrorMessages.QUESTION_NOT_FOUND);
            
            const newDate = new Date();
            if (foundUser.role === ERoles.PARENT) {
                const foundParent = await Parent.findOne({where: {userId: foundUser.id}});
                if (!foundParent || foundParent.subscriptionEndDate.getTime() < newDate.getTime() 
                || foundParent.id !== foundQuestion.parentId)
                    throw new Error(EErrorMessages.NO_ACCESS);
            }
            if (foundUser.role === ERoles.DOCTOR) {
                const foundDoctor = await Doctor.findOne({where: {userId: foundUser.id}});
                if (!foundDoctor || foundDoctor.id !== foundQuestion.doctorId)
                    throw new Error(EErrorMessages.NO_ACCESS);
            }
            const newMessage = await Message.create({...message});
            await MessagesStatus.create({
                messageId: newMessage.id,
                userId: foundUser.id
            });
            await MessagesStatus.create({
                messageId: newMessage.id,
                userId: foundUser.id,
            });
            return {
                status: StatusCodes.CREATED,
                result: newMessage
            };
        } catch (err: unknown) {
            const error = err as Error;
            if (message.url) {
                deleteFile(message.url, "messagesFiles");
            }
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

    public deleteMessage = async (userId: string, messageId: string): Promise<IResponse<IMessage | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser) throw new Error(EErrorMessages.NO_ACCESS);

            const foundMessage = await Message.findByPk(messageId);
            if (!foundMessage) throw new Error(EErrorMessages.MESSAGE_NOT_FOUND);

            const foundQuestion = await Question.findByPk(foundMessage.questionId);
            if (!foundQuestion) throw new Error(EErrorMessages.QUESTION_NOT_FOUND);
           
            if (foundMessage.authorId !== foundUser.id) throw new Error(EErrorMessages.NO_ACCESS);

            await Message.destroy({where: {id: messageId}});
            if (foundMessage.url || foundMessage.url !== "" && foundMessage.url !== "default-any-image.svg") {
                deleteFile(foundMessage.url, "messagesFiles");
            }
            return {
                status: StatusCodes.OK,
                result: {message: "Сообщение удалено!"}
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
}

export const chatMessagesDb = new ChatMessagesDb();