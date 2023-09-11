import { StatusCodes } from "http-status-codes";
import { User } from "../models/User";
import { UsersDb } from "../repository/subDb/usersDb";
import { ERoles } from "../enums/ERoles";
import { EErrorMessages } from "../enums/EErrorMessages";


jest.mock("../models/User");
jest.mock("../models/Doctor");

describe("UsersController", () => {
    describe("register", () => {
        test("should register a new user", async () => {
            const userDto = {
                role: ERoles.ADMIN,
                email: "test@example.com",
                phone: "+77086666666",
                name: "John",
                surname: "Doe",
                patronim: "Smith",
            };

            const mockedCreate = jest.fn().mockResolvedValue({
                id: "1",
                role: ERoles.ADMIN,
                email: "test@example.com",
                phone: "123456789",
                name: "John",
                surname: "Doe",
                patronim: "Smith",
            });

            User.findOne = jest.fn().mockResolvedValue(null);
            User.create = mockedCreate;
            const db = new UsersDb ();
            const result = await db.register(userDto);
            expect(User.findOne).toHaveBeenCalledWith({
                where: { email: userDto.email },
            });
            expect(User.create).toHaveBeenCalledWith({
                ...userDto,
                password: "123",
            });
            expect(result).toEqual({
                status: StatusCodes.CREATED,
                result: {
                    id: "1",
                    role: ERoles.ADMIN,
                    email: "test@example.com",
                    phone: "123456789",
                    name: "John",
                    surname: "Doe",
                    patronim: "Smith",
                },
            });
        });
    });
    test("should throw an error if user already exists", async () => {
        const userDto = {
            role: ERoles.ADMIN,
            email: "test@example.com",
            phone: "+77086666666",
            name: "John",
            surname: "Doe",
            patronim: "Smith",
        };
  
        const mockedFindOne = jest.fn().mockResolvedValue(userDto);
        User.findOne = mockedFindOne;
        const db = new UsersDb();
        const result = await db.register(userDto);
        expect(result.status).toEqual(StatusCodes.BAD_REQUEST);
        //@ts-ignore
        expect(result.result.message).toEqual(EErrorMessages.USER_ALREADY_EXISTS);
    });
  
    test("should throw an error if email format is incorrect", async () => {
        const userDto = {
            role: ERoles.DOCTOR,
            email: "281u1hjnfal",
            phone: "+77086666666",
            name: "John",
            surname: "Doe",
            patronim: "Smith",
        };
        const db = new UsersDb();
        User.findOne = jest.fn().mockResolvedValue(null);
        //@ts-ignore
        const result = await db.register(userDto);
        expect(result.status).toEqual(StatusCodes.BAD_REQUEST);
        //@ts-ignore
        expect(result.result.status).toEqual("error");
        //@ts-ignore
        expect(result.result.message).toEqual(EErrorMessages.WRONG_MAIL_FORMAT);
    });
});



