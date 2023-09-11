import { FunctionComponent, ReactElement } from "react";
import RegisterUser from "./RegisterUser";
import { ERoles } from "../../../enums/ERoles";

const RegisterDoctor: FunctionComponent = (): ReactElement => {
    return (
        <RegisterUser role={ERoles.DOCTOR} title={"Регистрация врача"} />
    );
};

export default RegisterDoctor;