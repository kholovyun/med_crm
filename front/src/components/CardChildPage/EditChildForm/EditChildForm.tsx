import { FunctionComponent, ReactElement } from "react";
import styles from "./EditChildForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import IEditFormProps from "./IEditFormProps";
import { useEditChildMutation } from "../../../app/services/children";
import successHandler from "../../../helpers/successHandler";
import errorHandler from "../../../helpers/errorHandler";
import IChildUpdateDto from "../../../interfaces/IChild/IChildUpdateDto";
import { validationScremasCreateChild } from "../../../schemas/validationScremasCreateChild";
import { ESex } from "../../../enums/ESex";
import Btn from "../../UI/Btn/Btn";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnClass } from "../../../enums/EBtnClass";
import { EBtnTypes } from "../../../enums/EBtnTypes";
import { FormBox } from "../../../containers/UserForms/FormBox/FormBox";
import AccessControl from "../../../permissionRoutes/AccessControl";
import { ERoles } from "../../../enums/ERoles";

const EditChildForm: FunctionComponent<IEditFormProps> = ({childData, closeModal}): ReactElement => {
    
    const [updateChild, {isSuccess, isError, error}] = useEditChildMutation();
    successHandler(isSuccess, "Данные ребенка изменены", closeModal);
    errorHandler(isError, error);

    const initialValues = {
        name: childData.name,
        surname: childData.surname,
        patronim: childData.patronim,
        dateOfBirth: childData.dateOfBirth,
        sex: childData.sex,
        height: childData.height,
        weight: childData.weight,
    };

    const submitHandler = async (values: IChildUpdateDto) => {
        const formData = new FormData();
        Object.entries(values).forEach(entry => {
            const [key, value] = entry;
            formData.append(key, value);
        });
        updateChild({id: childData.id, data: formData}); 
    };

    return (
        <FormBox>
            <Formik
                initialValues={initialValues}
                onSubmit={ async (values) => {
                    await submitHandler(values);
                }}
                validateOnBlur
                validationSchema={validationScremasCreateChild}
            >
                {({isValid, handleSubmit}) => (
                    <Form className={styles.form}>
                        <p className={styles.formTitle}>Изменение данных</p>
                        <AccessControl allowedRoles={[ERoles.PARENT]}>
                            <div className={styles.formLine}>
                                <div className={styles.formFieldBox}>
                                    <ErrorMessage name="surname" className={styles.errorText} component="div" />
                                    <p className={styles.fieldTitle}>Фамилия</p>
                                    <Field name="surname" className={styles.field} type="text" placeholder="Фамилия" />
                                </div>
                            </div>
                            <div className={styles.formLine}>
                                <div className={styles.formFieldBox}>
                                    <ErrorMessage name="name" className={styles.errorText} component="div" />
                                    <p className={styles.fieldTitle}>Имя</p>
                                    <Field name="name" className={styles.field} type="text" placeholder="Имя" />
                                </div>
                                <div className={styles.formFieldBox}>
                                    <ErrorMessage name="patronim" className={styles.errorText} component="div" />
                                    <p className={styles.fieldTitle}>Отчество</p>
                                    <Field name="patronim" className={styles.field} type="text" placeholder="Отчество" />
                                </div>
                            </div>
                            <div className={styles.formLine}>
                                <div className={styles.formFieldBox}>
                                    <ErrorMessage name="dateOfBirth" className={styles.errorText} component="div" />
                                    <p className={styles.fieldTitle}>Дата рождения</p>
                                    <Field name="dateOfBirth" className={styles.field} type="date" />
                                </div>
                                <div className={styles.formFieldBox}>
                                    <ErrorMessage  name="sex" className={styles.errorText} component="div" />
                                    <p className={styles.fieldTitle}>Пол</p>
                                    <div className={styles.selectSex}>
                                        <Field name="sex" as="select" className={styles.field} placeholder="Пол" id="sex" >
                                            <option value={ESex.FEMALE}>{ESex.FEMALE}</option>
                                            <option value={ESex.MALE}>{ESex.MALE}</option>
                                        </Field>
                                    </div>
                                </div>
                            </div>
                        </AccessControl>
                        <div className={styles.formLine}>
                            <div className={styles.formFieldBox}>
                                <ErrorMessage name="height" className={styles.errorText} component="div" />
                                <p className={styles.fieldTitle}>Рост/см</p>
                                <Field name="height" className={styles.field} type="number" min="0" placeholder="Рост" />
                            </div>
                            <div className={styles.formFieldBox}>
                                <ErrorMessage name="weight" className={styles.errorText} component="div" />
                                <p className={styles.fieldTitle}>Вес/кг</p>
                                <Field name="weight" className={styles.field} type="number" min="0" placeholder="Вес" />
                            </div>
                        </div>
                        <div className={`${styles.added_margin_top} ${styles.btn_group}`}>
                            <Btn
                                onclick={closeModal}
                                title="Отмена"
                                size={EBtnSize.big}
                                btnClass={EBtnClass.white_active}
                                types={EBtnTypes.reset}  
                            />
                            <Btn
                                disabled={!isValid}
                                types={EBtnTypes.submit}
                                title={"Сохранить"}
                                size={EBtnSize.big}
                                btnClass={EBtnClass.dark_active}
                                onclick={handleSubmit}
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </FormBox>
    );
};

export default EditChildForm;