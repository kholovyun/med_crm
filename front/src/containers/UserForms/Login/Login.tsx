import { FunctionComponent, ReactElement, useEffect } from "react";
import { validationSchema } from "../../../schemas/validationSchema";
import { useLoginMutation } from "../../../app/services/users";
import { useAppSelector } from "../../../app/hooks";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../UserForms.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Btn from "../../../components/UI/Btn/Btn";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnTypes } from "../../../enums/EBtnTypes";
import { Container } from "../../../components/UI/Container/Container";
import { Title } from "../Title/Title";
import { FormBox } from "../FormBox/FormBox";
import { ERoles } from "../../../enums/ERoles";
import { EBtnClass } from "../../../enums/EBtnClass";
import errorHandler from "../../../helpers/errorHandler";
import successHandler from "../../../helpers/successHandler";

const Login: FunctionComponent = (): ReactElement => {
    const [loginUser, { data, isError, isSuccess, error: loginError }] = useLoginMutation();
    const { user } = useAppSelector(state => state.auth);
    const navigator = useNavigate();

    errorHandler(isError, loginError);
    successHandler(isSuccess, `Добро пожаловать ${data?.name} вход выполнен`);

    useEffect(() => {
        if (user) {
            user.role === ERoles.ADMIN || user.role === ERoles.SUPERADMIN ?
                navigator("/admin-page/doctors") : 
                user.role === ERoles.DOCTOR ?
                    navigator("/cabinet") :
                    navigator("/parent-cabinet");
        }
    }, [user]);

    return (
        <Container>
            <FormBox>                
                <Formik
                    initialValues={{
                        email: "",
                        password: "Aa1234",
                    }}
                    validateOnBlur
                    onSubmit={async (values) => {
                        await loginUser(values);
                    }}
                    validationSchema={validationSchema}
                >
                    {({ isValid, handleSubmit }) => (
                        <Form className={styles.form_column}>
                            <Title text="Вход" />
                            <ErrorMessage className={styles.error_text} name="email" component="div"/>
                            <Field className={styles.login_input} name="email" type="text" placeholder="Email" />
                            <ErrorMessage className={styles.error_text} name="password" component="div"/>
                            <Field className={styles.login_input} name="password" type="password" placeholder="Пароль" />
                            <NavLink to={"/forgot-password"} className={styles.forgot_link}>Забыли пароль?</NavLink>
                            <Btn disabled={!isValid} title="Войти"
                                onclick={handleSubmit}
                                size={EBtnSize.big}
                                btnClass={EBtnClass.dark_active}
                                types={EBtnTypes.submit} />
                        </Form>
                    )}
                </Formik>
            </FormBox>
        </Container>
    );
};

export default Login;