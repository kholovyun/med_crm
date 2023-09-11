import { validationSchemaEmail } from "../../../schemas/validationSchemaEmail";
import { useResetPasswordMutation } from "../../../app/services/password";
import styles from "../UserForms.module.css";
import { EBtnSize } from "../../../enums/EBtnSize";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FunctionComponent, ReactElement } from "react";
import Btn from "../../../components/UI/Btn/Btn";
import { EBtnTypes } from "../../../enums/EBtnTypes";
import { Container } from "../../../components/UI/Container/Container";
import { FormBox } from "../FormBox/FormBox";
import { Title } from "../Title/Title";
import { EBtnClass } from "../../../enums/EBtnClass";
import { useNavigate } from "react-router-dom";
import errorHandler from "../../../helpers/errorHandler";
import successHandler from "../../../helpers/successHandler";

const ForgotPassword: FunctionComponent = (): ReactElement => {
    const [resetPassword, { data, isError, isSuccess, error: forgotError }] = useResetPasswordMutation();
    const navigate = useNavigate();

    errorHandler(isError, forgotError);
    successHandler(isSuccess, `Ссылка отправлена на Ваш Email ${data?.email}`);

    return (
        <Container>
            <FormBox>
                {isSuccess ? 
                    <div className={styles.reset_box}>
                        <p className={styles.forgot_link}>Ссылка отправлена на Ваш Email</p>
                        <Btn title="На главную" onclick={() => navigate("/")} size={EBtnSize.big} types={EBtnTypes.submit} btnClass={EBtnClass.dark_active} />
                    </div>
                    : <Formik
                        initialValues={{ email: "" }}
                        validateOnBlur
                        onSubmit={async (values) => {
                            await resetPassword(values);
                        }}
                        validationSchema={validationSchemaEmail}
                    >
                        {({ isValid, handleSubmit }) => (
                            <Form className={styles.form_column}>
                                <Title text="Сбросить пароль" />
                                <ErrorMessage className={styles.error_text} name="email" component="div"/>
                                <Field className={styles.login_input} name="email" type="text" placeholder="Email" />
                                <Btn disabled={!isValid} title="Сбросить" onclick={handleSubmit} size={EBtnSize.big} types={EBtnTypes.submit} btnClass={EBtnClass.dark_active} />
                            </Form>
                        )}
                    </Formik>}
            </FormBox>
        </Container>
    );
};

export default ForgotPassword;