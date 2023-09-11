import { FunctionComponent, ReactElement } from "react";
import RegisterUser from "./RegisterUser";
import { ERoles } from "../../../enums/ERoles";

const RegisterAdmin: FunctionComponent = (): ReactElement => {
    return (
        <RegisterUser role={ERoles.ADMIN} title={"Регистрация администратора"}/>
    );
};

export default RegisterAdmin;