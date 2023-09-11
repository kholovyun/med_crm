import { StatusCodes } from "http-status-codes";
import { EErrorMessages } from "../../enums/EErrorMessages";
import { errorCodesMathcher } from "../../helpers/errorCodeMatcher";
import INewBornDataGetDto from "../../interfaces/IChild/INewBornData/INewBornDataGetDto";
import IError from "../../interfaces/IError";
import IResponse from "../../interfaces/IResponse";
import { User } from "../../models/User";
import { Child } from "../../models/Child";
import { ERoles } from "../../enums/ERoles";
import { Doctor } from "../../models/Doctor";
import { Parent } from "../../models/Parent";
import { NewbornData } from "../../models/NewbornData";
import INewBornDataUpdateDto from "../../interfaces/IChild/INewBornData/INewBornDataUpdateDto";

export class NewbornDatasDb {
    public getNewbornDataByChildId = async (userId: string, childId: string): Promise<IResponse<INewBornDataGetDto[] | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser) throw new Error(EErrorMessages.NO_ACCESS);

            const foundChild = await Child.findByPk(childId);
            if (!foundChild) throw new Error(EErrorMessages.CHILD_NOT_FOUND);

            if (foundUser.role === ERoles.DOCTOR) {
                const foundDoctor = await Doctor.findOne({where: {userId}});
                const foundParent = await Parent.findOne({where: {id: foundChild.parentId}});
                if (foundDoctor?.id !== foundParent?.doctorId) throw new Error(EErrorMessages.NO_ACCESS);
            }

            if (foundUser.role === ERoles.PARENT) {
                const foundParent = await Parent.findOne({where: {userId}});
                if (foundChild.parentId !== foundParent?.id) throw new Error(EErrorMessages.NO_ACCESS);
            }

            const newbornData = await NewbornData.findAll({
                where: {childId},
            });
            return {
                status: StatusCodes.OK,
                result: newbornData
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

    public updateNewbornDataByChildId = async (userId: string, childId: string, newbornData: INewBornDataUpdateDto): Promise<IResponse<INewBornDataGetDto | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser) throw new Error(EErrorMessages.NO_ACCESS);
            if (foundUser.isBlocked && foundUser.role !== ERoles.PARENT)
                throw new Error(EErrorMessages.NO_ACCESS);
                     
            const foundChild = await Child.findByPk(childId);
            if (!foundChild) throw new Error(EErrorMessages.CHILD_NOT_FOUND);

            const foundNewbornData = await NewbornData.findOne({where: {childId}});
            if (!foundNewbornData) throw new Error(EErrorMessages.NEWBORN_DATA_NOT_FOUND);

            if (foundUser.role === ERoles.PARENT) {
                const foundParentByUser = await Parent.findOne({where: {userId}});
                if (!foundParentByUser || foundChild.parentId !== foundParentByUser.id)
                    throw new Error(EErrorMessages.NO_ACCESS);
            }
            
            const foundParent = await Parent.findOne({where: {id: foundChild.parentId}});  
            if (!foundParent) throw new Error(EErrorMessages.PARENT_NOT_FOUND);
            if (foundUser.role === ERoles.DOCTOR) {
                const foundDoctor = await Doctor.findOne({where: {userId}});
                if (!foundDoctor || foundDoctor.id !== foundParent.doctorId) {
                    throw new Error(EErrorMessages.NO_ACCESS);
                }
            }

            const updatedNewbornData = await NewbornData.update(
                {...newbornData},
                {where: {id: foundNewbornData.id},
                    returning: true}
            ).then((result) => {
                return result[1][0];
            });
            return {
                status: StatusCodes.OK,
                result: updatedNewbornData
            };
        } catch(err: unknown) {
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

export const newbornDatasDb = new NewbornDatasDb();