import { FunctionComponent, ReactElement, useEffect } from "react";
import ICreateExamProps from "./ICreateExamProps";
import { Field, Form, Formik } from "formik";
import { useCreateExamMutation } from "../../../../app/services/specExams";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IErrorResponse } from "../../../../interfaces/IUser/IErrorResponse";
import { IMessage } from "../../../../interfaces/IUser/IMessage";
import { toast } from "react-toastify";
import { validationSchemaCreateExam } from "../../../../schemas/validationSchemaCreateExam";
import styles from "../../ChildAllergies/CreateAllergy/CreateAllergy.module.css";
import Btn from "../../../UI/Btn/Btn";
import { EBtnSize } from "../../../../enums/EBtnSize";
import { EBtnTypes } from "../../../../enums/EBtnTypes";
import DatePickerField from "../../../UI/DatePicker/DatePicker";

const CreateExam: FunctionComponent<ICreateExamProps> = (props): ReactElement => {
    const [createExam, {
        isSuccess: isSuccessCreateExam,
        isError: isErrorCreateExam,
        error: errorCreateExam
    }] = useCreateExamMutation();

    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message} Статус: ${err.status}`);
    };

    useEffect(() => {
        isErrorCreateExam && errorHandler(errorCreateExam);
    }, [isErrorCreateExam]);

    useEffect(() => {
        isSuccessCreateExam && toast.info("Создана новая запись об осмотре другими врачами");
    }, [isSuccessCreateExam]);


    return (
        <div className={styles.form_box}>
            <Formik
                initialValues={{
                    childId: props.childId,
                    specialist: "",
                    name: "",
                    date: new Date(),
                    conclusion: "",
                    recommend: ""
                }}
                validateOnBlur
                onSubmit={(values, {resetForm}) => {
                    createExam(values);
                    resetForm();
                }}
                validationSchema={validationSchemaCreateExam}
            >
                {({ isValid, errors, touched, handleSubmit }) => (
                    <Form>
                        <div className={styles.createEntityLine}>
                            <div className={styles.createEntityField}>
                                {touched.specialist && errors.specialist ? <p>{errors.specialist}</p> : <p></p>}
                                <p className={styles.createEntityFieldTitle}>Специальность	</p>
                                <Field className={styles.createEntityInput} name="specialist" type="text" />
                            </div>
                            <div className={styles.createEntityField}>
                                {touched.date && errors.date ? <p>{}</p> : <p></p>}
                                <p className={styles.createEntityFieldTitle}>Дата</p>
                                <DatePickerField name="date" />
                            </div>
                        </div>

                        <div className={styles.createEntityLine}>
                            <div className={styles.createEntityField}>
                                {touched.name && errors.name ? <p>{errors.name}</p> : <p></p>}
                                <p className={styles.createEntityFieldTitle}>ФИО врача</p>
                                <Field className={styles.createEntityInput} name="name" type="text" />
                            </div>
                        </div>

                        <div className={styles.createEntityLine}>
                            <div className={styles.createEntityField}>
                                {touched.conclusion && errors.conclusion ? <p>{errors.conclusion}</p> : <p></p>}
                                <p className={styles.createEntityFieldTitle}>Заключение</p>
                                <Field className={styles.createEntityInput} name="conclusion" type="text" />
                            </div>
                        </div>

                        <div className={styles.createEntityLine}>
                            <div className={styles.createEntityField}>
                                {touched.recommend && errors.recommend ? <p>{errors.recommend}</p> : <p></p>}
                                <p className={styles.createEntityFieldTitle}>Рекомендации</p>
                                <Field className={styles.createEntityInput} name="recommend" type="text" />
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

export default CreateExam;