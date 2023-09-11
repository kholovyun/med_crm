import { Formik, Field, Form } from "formik";
import Btn from "../../../../components/UI/Btn/Btn";
import { useEditUserMutation } from "../../../../app/services/users";
import { useAppSelector } from "../../../../app/hooks";
import { validationSchemaEditUser } from "../../../../schemas/validationSchemaEditUser";
import styles from "./EditDoctorForm.module.css";
import MaskedInput from "react-text-mask";
import { FunctionComponent, ReactElement, useRef, useState } from "react";
import { EBtnSize } from "../../../../enums/EBtnSize";
import { EBtnTypes } from "../../../../enums/EBtnTypes";
import IEditDoctorFormProps from "./EditDoctorFormProps";
import IDoctorUpdateDto from "../../../../interfaces/IDoctor/IDoctorUpdateDto";
import { useEditDoctorMutation } from "../../../../app/services/doctors";
import { KGMask, KZMask } from "../../../../helpers/countryRegexs";
import KGFlag from "../../../../assets/img/kg.png";
import INTFlag from "../../../../assets/img/icon_international_flag.svg";
import { validationSchemaEditDoctor } from "../../../../schemas/validationSchemaEditDoctor";
import { EBtnClass } from "../../../../enums/EBtnClass";
import errorHandler from "../../../../helpers/errorHandler";
import successHandler from "../../../../helpers/successHandler";

const EditDoctorForm: FunctionComponent<IEditDoctorFormProps> = ({ modalCloser, doctorData }): ReactElement => {
    const { user } = useAppSelector(state => state.auth);
    const [phoneMask, setPhoneMask] = useState(user && user.phone.startsWith("+996(") ? KGMask : KZMask);
    const [flag, setFlag] = useState(user && user.phone.startsWith("+996(") ? KGFlag : INTFlag);

    const phoneMaskOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        switch (e.target.value) {
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

    const [editUser, {
        isError: isErrorEditUser,
        isSuccess: isSuccesEditUser,
        error: errorEditUser
    }] = useEditUserMutation();

    const [editDoctor, {
        isError: isErrorEditDoctor,
        isSuccess: isSuccesEditDoctor,
        error: errorEditDoctor
    }] = useEditDoctorMutation();

    errorHandler(isErrorEditUser, errorEditUser);
    errorHandler(isErrorEditDoctor, errorEditDoctor);

    successHandler(isSuccesEditUser, "Личные данные изменены");
    successHandler(isSuccesEditDoctor, "Специальные данные изменены");

    const updateDoctorData = async (values: IDoctorUpdateDto) => {
        const formData = new FormData();
        Object.entries(values).forEach(entry => {
            const [key, value] = entry;
            formData.append(key, value);
        });
        editDoctor({id: doctorData.id, data: formData});
    };

    const focusRef = useRef<HTMLInputElement>(null);

    const toggleTab = (index: number) => {
        if (focusRef.current) focusRef.current.focus();
        setToggleState(index);
    };

    const [toggleState, setToggleState] = useState(1);

    return (
        <div className={styles.editFormBox}>
            <div className={styles.editFormBoxTabs}>
                <div
                    className={toggleState === 1 ? `${styles.tab} ${styles.leftTab} ${styles.activeTab}` : `${styles.tab} ${styles.leftTab}`}
                    onClick={() => toggleTab(1)}
                >Специальная информация</div>
                <div
                    className={toggleState === 2 ? `${styles.tab} ${styles.rightTab} ${styles.activeTab}` : `${styles.tab} ${styles.rightTab}`}
                    onClick={() => toggleTab(2)}
                >Личные данные</div>
            </div>
            <div className={styles.tabsContent}>
                <div className={toggleState === 2 ? `${styles.content} ${styles.activeContent}` : styles.content}>
                    <Formik
                        initialValues={{
                            name: user!.name || "",
                            surname: user!.surname || "",
                            patronim: user!.patronim || "",
                            phone: user!.phone || ""
                        }}
                        validateOnBlur
                        onSubmit={(values) => {
                            editUser({ id: user!.id, userDto: values });
                        }}
                        validationSchema={validationSchemaEditUser}
                    >
                        {({ isValid, errors, touched, handleSubmit, handleChange, handleBlur }) => (
                            <Form className={styles.editUserForm}>
                                <div className={styles.editUserLine}>
                                    <div className={styles.editUserField}>
                                        {touched.surname && errors.surname ? <p>{errors.surname}</p> : <p></p>}
                                        <p className={styles.editUserFieldTitle}>Фамилия</p>
                                        <Field className={styles.editUserInput} name="surname" type="text" />
                                    </div>
                                </div>
                                <div className={styles.editUserLine}>
                                    <div className={styles.editUserField}>
                                        {touched.name && errors.name ? <p>{errors.name}</p> : <p></p>}
                                        <p className={styles.editUserFieldTitle}>Имя</p>
                                        <Field className={styles.editUserInput} name="name" type="text" />
                                    </div>
                                    <div className={styles.editUserField}>
                                        {touched.patronim && errors.patronim ? <p>{errors.patronim}</p> : <p></p>}
                                        <p className={styles.editUserFieldTitle}>Отчество</p>
                                        <Field className={styles.editUserInput} name="patronim" type="text" />
                                    </div>
                                </div>

                                <div className={styles.editUserLine}>
                                    <div className={styles.editUserField}>
                                        {touched.phone && errors.phone ? <p>{errors.phone}</p> : <p></p>}
                                        <p className={styles.editUserFieldTitle}>Тел.</p>
                                        <div className={styles.editPhoneField}>
                                            <div className={styles.flag_wrapper}>
                                                <img className={styles.flag_image} src={flag} alt="" />
                                            </div>
                                            <div className={styles.select_wrapper}>
                                                <select className={styles.country_select} defaultValue={user && user.phone.startsWith("+996(") ? "KG" : "INT"} onChange={phoneMaskOnChange}>
                                                    <option value={"INT"}>INT</option>
                                                    <option value={"KG"}>KG</option>
                                                </select>
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
                                                        className={styles.phoneInput}
                                                        defaultValue={user?.phone}
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                    </div>
                                    <div className={styles.saveButton}>
                                        <Btn disabled={!isValid} title="Сохранить" onclick={handleSubmit} size={EBtnSize.tiny} types={EBtnTypes.submit} />
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>

                <div className={toggleState === 1 ? `${styles.content} ${styles.activeContent}` : styles.content}>
                    <Formik
                        initialValues={{
                            degree: doctorData?.degree || "",
                            experience: doctorData?.experience || 0,
                            placeOfWork: doctorData?.placeOfWork || "",
                            achievements: doctorData?.achievements || "",
                            speciality: doctorData?.speciality || ""
                        }}
                        validateOnBlur
                        onSubmit={(values) => {
                            updateDoctorData(values);
                        }}
                        validationSchema={validationSchemaEditDoctor}
                    >
                        {({ isValid, errors, touched, handleSubmit }) => (
                            <Form className={styles.editDoctorForm}>
                                <div className={styles.editDoctorLine}>
                                    <div className={styles.editDoctorField}>
                                        {touched.speciality && errors.speciality ? <p>{errors.speciality}</p> : <p></p>}
                                        <p className={styles.editDoctorFieldTitle}>Специальность</p>
                                        <Field innerRef={focusRef} className={styles.editDoctorInput} name="speciality" type="text" />
                                    </div>
                                    <div className={styles.editDoctorField}>
                                        {touched.degree && errors.degree ? <p>{errors.degree}</p> : <p></p>}
                                        <p className={styles.editDoctorFieldTitle}>Степень</p>
                                        <Field className={styles.editDoctorInput} name="degree" type="text" />
                                    </div>
                                </div>
                                <div className={styles.editDoctorLine}>
                                    <div className={styles.editDoctorFieldExpreience}>
                                        {touched.experience && errors.experience ? <p>{errors.experience}</p> : <p></p>}
                                        <p className={styles.editDoctorFieldTitle}>Стаж</p>
                                        <Field className={styles.editDoctorInput} name="experience" min="1" max="100" type="number" />
                                    </div>
                                    <div className={styles.editDoctorField}>
                                        {touched.placeOfWork && errors.placeOfWork ? <p>{errors.placeOfWork}</p> : <p></p>}
                                        <p className={styles.editDoctorFieldTitle}>Место работы</p>
                                        <Field as={"textarea"} className={`${styles.editDoctorInput} ${styles.textarea}`} name="placeOfWork" type="text" />
                                    </div>
                                </div>
                                <div className={styles.editDoctorLine}>
                                    <div className={styles.editDoctorField}>
                                        {touched.achievements && errors.achievements ? <p>{errors.achievements}</p> : <p></p>}
                                        <p className={styles.editDoctorFieldTitle}>Достижения</p>
                                        <Field as={"textarea"} className={`${styles.editDoctorInput} ${styles.textarea}`} name="achievements" type="text" />
                                    </div>
                                    <div className={styles.saveButton}>
                                        <Btn disabled={!isValid} title="Сохранить" onclick={handleSubmit} size={EBtnSize.tiny} types={EBtnTypes.submit} />
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                <Btn title="Закрыть" onclick={modalCloser} size={EBtnSize.tiny} btnClass={EBtnClass.white_active} />
            </div>
        </div>
    );
};

export default EditDoctorForm;