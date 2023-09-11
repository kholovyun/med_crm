import { FunctionComponent, ReactElement } from "react";
import styles from "../UserForms.module.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { validationSchemaRegUser } from "../../../schemas/validationSchemaRegUser";
import Btn from "../../../components/UI/Btn/Btn";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnTypes } from "../../../enums/EBtnTypes";
import { toast } from "react-toastify";
import { useCreateUserMutation } from "../../../app/services/users";
import { FormBox } from "../FormBox/FormBox";
import { Title } from "../Title/Title";
import { useNavigate } from "react-router-dom";
import { ERoles } from "../../../enums/ERoles";
import { EDoctorLevel } from "../../../enums/EDoctorLevel";
import PhoneMask from "../../../components/PhoneMask/PhoneMask";
import { EBtnClass } from "../../../enums/EBtnClass";
import errorHandler from "../../../helpers/errorHandler";

const RegisterUser: FunctionComponent<{role: string, title: string}> = (props: {role: string, title: string}): ReactElement => {
    const navigate = useNavigate();
    const [createUser, { isError, isSuccess, error: createUserError }] = useCreateUserMutation();

    const successHandler = () => {
        if (props.role === ERoles.ADMIN) {
            toast.info(`${props.role} Администратор создан`);
        }
        if (props.role === ERoles.DOCTOR) {
            toast.info(`${props.role} Врач создан`);
        }
        navigate(-1);
    };

    errorHandler(isError, createUserError);
    isSuccess && successHandler();

    return (
        <FormBox>            
            <Formik
                initialValues={{
                    name: "",
                    surname: "",
                    patronim: "",
                    phone: "",
                    email: "",
                    role: props.role,
                    price: props.role === ERoles.DOCTOR ? 0 : null
                }}
                validateOnBlur
                onSubmit={(values) => {
                    createUser(values);
                }}
                validationSchema={validationSchemaRegUser}
            >
                {({ isValid, handleSubmit, handleChange, handleBlur }) => (
                    <Form className={styles.form_column}>
                        <Title text={props.title} />
                        <div className={styles.two_inputs_row}>
                            <div className={styles.input_flex_column}>
                                <ErrorMessage className={styles.error_text} name="name" component="div"/>
                                <Field className={styles.login_input} name="name" type="text" placeholder="Имя" />
                            </div>
                            <div className={styles.input_flex_column}>
                                <ErrorMessage className={styles.error_text} name="surname" component="div"/>
                                <Field className={styles.login_input} name="surname" type="text" placeholder="Фамилия" />
                            </div>
                        </div>
                        <ErrorMessage className={styles.error_text} name="patronim" component="div"/>
                        <Field className={styles.login_input} name="patronim" type="text" placeholder="Отчество" />
                        <div className={styles.two_inputs_row}>
                            <div className={styles.input_flex_column}>
                                <ErrorMessage className={styles.error_text} name="phone" component="div"/>
                                <PhoneMask
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                />
                            </div>
                        </div>
                        <ErrorMessage className={styles.error_text} name="email" component="div"/>
                        <Field className={styles.login_input} name="email" type="text" placeholder="Email" />
                        {props.role === ERoles.DOCTOR ?
                            <div className={styles.input_row}>
                                <label htmlFor={"price"} className={styles.label_text}>Базовая цена подписки</label>
                                <div className={styles.input_flex_column}>
                                    <div className={styles.select_wrapper}>                                    
                                        <Field className={styles.custom_select} id={"price"} name="price" as="select" placeholder="Уровень цены">
                                            <option className={styles.custom_option} value={EDoctorLevel.JUNIOR}>{EDoctorLevel.JUNIOR}</option>
                                            <option className={styles.custom_option} value={EDoctorLevel.MIDLLE}>{EDoctorLevel.MIDLLE}</option>
                                            <option className={styles.custom_option} value={EDoctorLevel.SENIOR}>{EDoctorLevel.SENIOR}</option>
                                        </Field>
                                    </div>
                                </div>
                            </div>                                                        
                            : null}
                        <Field hidden type="text" name="role" className={styles.login_input} value={props.role} />
                        <div className={styles.added_margin_top}>
                            <Btn disabled={!isValid} 
                                title="Создать" 
                                onclick={handleSubmit} size={EBtnSize.big} 
                                types={EBtnTypes.submit}
                                btnClass={EBtnClass.dark_active} />
                        </div>
                    </Form>
                )}
            </Formik>
        </FormBox>
    );
};

export default RegisterUser;