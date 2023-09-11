import IUserGetDto from "../interfaces/IUser/IUserGetDto";

export default interface IAuthState {
    user: IUserGetDto | null
    token: string | null
}