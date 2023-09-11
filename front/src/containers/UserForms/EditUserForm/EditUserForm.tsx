import { ChangeEvent, FunctionComponent, ReactElement, useState } from "react";
import styles from "../UserForms.module.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Btn from "../../../components/UI/Btn/Btn";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnTypes } from "../../../enums/EBtnTypes";
import { useEditUserMutation } from "../../../app/services/users";
import MaskedInput from "react-text-mask";
import { FormBox } from "../FormBox/FormBox";
import { Title } from "../Title/Title";
import { KGMask, KZMask } from "../../../helpers/countryRegexs";
import KGFlag from "../../../assets/img/kg.png";
import INTFlag from "../../../assets/img/icon_international_flag.svg";
import { useAppSelector } from "../../../app/hooks";
import { validationSchemaEditUser } from "../../../schemas/validationSchemaEditUser";
import { useNavigate } from "react-router-dom";
import { EBtnClass } from "../../../enums/EBtnClass";
import { ERoles } from "../../../enums/ERoles";
import IEditUserFormProps from "./IEditUserFormProps";
import errorHandler from "../../../helpers/errorHandler";
import successHandler from "../../../helpers/successHandler";

const EditUserForm: FunctionComponent<IEditUserFormProps> = (props: IEditUserFormProps): ReactElement => {
    const navigate = useNavigate();
    const { user } = useAppSelector(state => state.auth);
    const [editUser, {
        isError: isErrorEditUser,
        isSuccess: isSuccesEditUser,
        error: errorEditUser,
        reset: resetEditUser
    }] = useEditUserMutation();
    const [phoneMask, setPhoneMask] = useState(user && user.phone.startsWith("+996(") ? KGMask : KZMask);
    const [flag, setFlag] = useState(user && user.phone.startsWith("+996(") ? KGFlag : INTFlag);

    const phoneMaskOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
        switch (e.currentTarget.value) {
        case "KG":
            setPhoneMask(KGMask);
            setFlag(KGFlag);
            break;
        case "INT":
            setPhoneMask(KZMask);
            setFlag(INTFlag);
            break;
        default:
            setPhoneMask(KZMask);
            setFlag(INTFlag);
            break;
        }
    };

    errorHandler(isErrorEditUser, errorEditUser);
    successHandler(isSuccesEditUser, "Личные данные изменены", resetEditUser);

    const backToAdminPage = () => {
        if (user?.role === ERoles.ADMIN || user?.role === ERoles.SUPERADMIN) {
            navigate("/admin-page/profile");
        }
    };

    return (
        <FormBox>
            {user ?
                <Formik
                    initialValues={{
                        name: user.name,
                        surname: user.surname,
                        patronim: user.patronim && user.patronim !== "" ? user.patronim : "",
                        phone: user.phone
                    }}
                    validateOnBlur
                    onSubmit={(values) => {
                        editUser({ id: user.id, userDto: values });
                    }}
                    validationSchema={validationSchemaEditUser}
                >
                    {({ isValid, handleSubmit, handleChange, handleBlur }) => (
                        <Form className={styles.form_column}>
                            <Title text={"Редактировать профиль"} />
                            <div className={styles.two_inputs_row}>
                                <div className={styles.input_flex_column}>
                                    <ErrorMessage className={styles.error_text} name="name" component="div" />
                                    <Field className={styles.login_input} name="name" type="text" placeholder="Имя" />
                                </div>
                                <div className={styles.input_flex_column}>
                                    <ErrorMessage className={styles.error_text} name="surname" component="div" />
                                    <Field className={styles.login_input} name="surname" type="text" placeholder="Фамилия" />
                                </div>
                            </div>
                            <ErrorMessage className={styles.error_text} name="patronim" component="div" />
                            <Field className={styles.login_input} name="patronim" type="text" placeholder="Отчество" />
                            <div className={styles.two_inputs_row}>
                                <div className={styles.input_flex_column}>
                                    <ErrorMessage className={styles.error_text} name="phone" component="div" />
                                    <div className={styles.two_inputs_row}>
                                        <div className={styles.select_flag_wrapper}>
                                            <div className={styles.flag_wrapper}><img className={styles.flag_image} src={flag} alt="" /></div>
                                            <div className={styles.select_wrapper}>
                                                <select className={styles.country_select} defaultValue={user && user.phone.startsWith("+996(") ? "KG" : "INT"} onChange={phoneMaskOnChange}>
                                                    <option value={"INT"}>INT</option>
                                                    <option value={"KG"}>KG</option>
                                                </select>
                                            </div>
                                        </div>
                                        <Field
                                            name="phone"
                                            type="text"
                                        >
                                            {({ ...field }) => (
                                                <MaskedInput
                                                    {...field}
                                                    mask={phoneMask}
                                                    id="phone"
                                                    type="text"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={styles.login_input}
                                                    defaultValue={user.phone}
                                                />
                                            )}
                                        </Field>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.added_margin_top} ${styles.btn_group}`}>
                                { props.closeModal !== undefined ? 
                                    <Btn title="Закрыть" 
                                        types={EBtnTypes.reset}    
                                        onclick={props.closeModal} 
                                        size={EBtnSize.big} btnClass={EBtnClass.white_active} /> 
                                    : 
                                    <Btn title="Закрыть" 
                                        types={EBtnTypes.reset}    
                                        onclick={backToAdminPage} 
                                        size={EBtnSize.big} btnClass={EBtnClass.white_active} />
                                }
                                <Btn disabled={!isValid}
                                    title="Сохранить"
                                    onclick={handleSubmit}
                                    size={EBtnSize.big}
                                    types={EBtnTypes.submit}
                                    btnClass={EBtnClass.dark_active} />
                            </div>
                        </Form>
                    )}
                </Formik>
                : null}
        </FormBox>
    );
};

export default EditUserForm;