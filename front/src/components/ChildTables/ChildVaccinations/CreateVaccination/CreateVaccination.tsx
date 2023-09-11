import { FunctionComponent, ReactElement, useEffect } from "react";
import ICreateVaccinationProps from "./ICreateVaccinationProps";
import { Field, Form, Formik } from "formik";
import { useCreateVaccinationMutation } from "../../../../app/services/vaccinations";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IErrorResponse } from "../../../../interfaces/IUser/IErrorResponse";
import { IMessage } from "../../../../interfaces/IUser/IMessage";
import { toast } from "react-toastify";
import styles from "../../ChildAllergies/CreateAllergy/CreateAllergy.module.css";
import { validationSchemaCreateVaccination } from "../../../../schemas/validationSchemaCreateVaccination";
import Btn from "../../../UI/Btn/Btn";
import { EBtnSize } from "../../../../enums/EBtnSize";
import { EBtnTypes } from "../../../../enums/EBtnTypes";
import DatePickerField from "../../../UI/DatePicker/DatePicker";

const CreateVaccination: FunctionComponent<ICreateVaccinationProps> = (props): ReactElement => {
    const [createVaccination, {
        isSuccess: isSuccessCreateVaccination,
        isError: isErrorCreateVaccination,
        error: errorCreateVaccination
    }] = useCreateVaccinationMutation();

    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message} Статус: ${err.status}`);
    };

    useEffect(() => {
        isErrorCreateVaccination && errorHandler(errorCreateVaccination);
    }, [isErrorCreateVaccination]);

    useEffect(() => {
        isSuccessCreateVaccination && toast.info("Создана новая запись о вакцине");
    }, [isSuccessCreateVaccination]);
    
    return (
        <div className={styles.form_box}>
            <Formik
                initialValues={{
                    childId: props.childId,
                    infection: "",
                    vaccine: "",
                    age: "",
                    date: new Date(),
                    dose: "",
                    serial: "",
                    manufacturer: "",
                    reaction: "",
                    conterindication: "",
                    notes: ""
                }}
                validateOnBlur
                onSubmit={(values, {resetForm}) => {
                    createVaccination(values);
                    resetForm();
                }}
                validationSchema={validationSchemaCreateVaccination}
            >
                {({ isValid, errors, touched, handleSubmit }) => (
                    <Form>
                        <div className={styles.createEntityLine}>
                            <div className={styles.createEntityField}>
                                {touched.infection && errors.infection ? <p>{errors.infection}</p> : <p></p>}
                                <p className={styles.createEntityFieldTitle}>Вид инфекции</p>
                                <Field className={styles.createEntityInput} name="infection" type="text" />
                            </div>
                            <div className={styles.createEntityField}>
                                {touched.vaccine && errors.vaccine ? <p>{errors.vaccine}</p> : <p></p>}
                                <p className={styles.createEntityFieldTitle}>Вид вакцины</p>
                                <Field className={styles.createEntityInput} name="vaccine" type="text" />
                            </div>
                        </div>

                        <div className={styles.createEntityLine}>
                            <div className={styles.createEntityField}>
                                {touched.age && errors.age ? <p>{errors.age}</p> : <p></p>}
                                <p className={styles.createEntityFieldTitle}>Возраст ребенка</p>
                                <Field className={styles.createEntityInput} name="age" type="text" />
                            </div>
                            <div className={styles.createEntityField}>
                                {touched.date && errors.date ? <p>{}</p> : <p></p>}
                                <p className={styles.createEntityFieldTitle}>Дата</p>
                                <DatePickerField name="date" />
                            </div>
                        </div>

                        <div className={styles.createEntityLine}>
                            <div className={styles.createEntityField}>
                                {touched.manufacturer && errors.manufacturer ? <p>{errors.manufacturer}</p> : <p></p>}
                                <p className={styles.createEntityFieldTitle}>Производитель</p>
                                <Field className={styles.createEntityInput} name="manufacturer" type="text" />
                            </div>
                        </div>

                        <div className={styles.createEntityLine}>
                            <div className={styles.createEntityField}>
                                {touched.dose && errors.dose ? <p>{errors.dose}</p> : <p></p>}
                                <p className={styles.createEntityFieldTitle}>Доза</p>
                                <Field className={styles.createEntityInput} name="dose" type="text" />
                            </div>
                            <div className={styles.createEntityField}>
                                {touched.serial && errors.serial ? <p>{errors.serial}</p> : <p></p>}
                                <p className={styles.createEntityFieldTitle}>Серия</p>
                                <Field className={styles.createEntityInput} name="serial" type="text" />
                            </div>
                        </div>
                        <div className={styles.createEntityLine}>
                            <div className={styles.createEntityField}>
                                {touched.reaction && errors.reaction ? <p>{errors.reaction}</p> : <p></p>}
                                <p className={styles.createEntityFieldTitle}>Реакция</p>
                                <Field as="textarea" className={styles.createEntityInput} name="reaction" type="text" />
                            </div>
                        </div>

                        <div className={styles.createEntityLine}>
                            <div className={styles.createEntityField}>
                                {touched.conterindication && errors.conterindication ? <p>{errors.conterindication}</p> : <p></p>}
                                <p className={styles.createEntityFieldTitle}>Медотвод</p>
                                <Field as="textarea" className={styles.createEntityInput} name="conterindication" type="text" />
                            </div>
                        </div>

                        <div className={styles.createEntityLine}>
                            <div className={styles.createEntityField}>
                                {touched.notes && errors.notes ? <p>{errors.notes}</p> : <p></p>}
                                <p className={styles.createEntityFieldTitle}>Примечание</p>
                                <Field as="textarea" className={styles.createEntityInput} name="notes" type="text" />
                            </div>
                        </div>
                        
                        <div className={styles.btnBlock}>
                            <div className={styles.saveButton}>
                                <Btn
                                    disabled={!isValid}
                                    title="Создать"
                                    size={EBtnSize.tiny}
                                    types={EBtnTypes.submit}
                                    onclick={handleSubmit} />
                            </div>
                            <div className={styles.closeButton}>
                                <Btn
                                    onclick={props.modalCloser}
                                    title="Закрыть"
                                    size={EBtnSize.tiny}
                                    types={EBtnTypes.reset} />
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateVaccination;