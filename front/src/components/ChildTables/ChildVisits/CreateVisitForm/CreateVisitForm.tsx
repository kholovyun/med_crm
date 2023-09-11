import { FunctionComponent, ReactElement, useEffect } from "react";
import styles from "../../ChildAllergies/CreateAllergy/CreateAllergy.module.css";
import { Field, Form, Formik } from "formik";
import { useCreateVisitMutation } from "../../../../app/services/visits";
import { EVisitReasons } from "../../../../enums/EVisitReasons";
import { validationSchemaCreateVisit } from "../../../../schemas/validationSchemaCreateVisit";
import Btn from "../../../UI/Btn/Btn";
import { EBtnSize } from "../../../../enums/EBtnSize";
import { EBtnTypes } from "../../../../enums/EBtnTypes";
import ICreateVisitFormProps from "./ICreateVisitFormProps";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IMessage } from "../../../../interfaces/IUser/IMessage";
import { IErrorResponse } from "../../../../interfaces/IUser/IErrorResponse";
import { toast } from "react-toastify";
import DatePickerField from "../../../UI/DatePicker/DatePicker";

const CreateVisitForm: FunctionComponent<ICreateVisitFormProps> = (props): ReactElement => {
    const [createVisit, { isError, isSuccess, error: createVisitError }] = useCreateVisitMutation();

    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message} Статус: ${err.status}`);
    };

    useEffect(() => {
        isError && errorHandler(createVisitError);
    }, [isError]);

    useEffect(() => {
        isSuccess && toast.info("Создан новый прием у врача");
    }, [isSuccess]);
    return (
        <div className={styles.form_box}>
            <Formik
                initialValues={{
                    childId: props.childId,
                    reason: EVisitReasons.PROPH,
                    date: new Date(),
                    clinicData: "",
                    conclusion: "",
                    appointment: "",
                    place: ""
                }}
                validateOnBlur
                onSubmit={(values, { resetForm }) => {
                    createVisit(values);
                    resetForm();
                }}
                validationSchema={validationSchemaCreateVisit}
            >
                {({ isValid, errors, touched, handleSubmit }) => (
                    <Form className={styles.createEntityForm}>
                        <div className={styles.createEntityLine}>
                            <div className={styles.createEntityField}>
                                {touched.place && errors.place ? <p>{errors.place}</p> : <p></p>}
                                <p className={styles.createEntityFieldTitle}>Место осмотра</p>
                                <Field className={styles.createEntityInput} name="place" type="text" />
                            </div>
                            <div className={styles.createEntityField}>
                                {touched.date && errors.date ? <p>{ }</p> : <p></p>}
                                <p className={styles.createEntityFieldTitle}>Дата осмотра</p>
                                <DatePickerField name="date" />
                            </div>
                        </div>

                        <div className={styles.createEntityLine}>
                            <div className={styles.createEntityField}>
                                {touched.reason && errors.reason ? <p>{errors.reason}</p> : <p></p>}
                                <p className={styles.createEntityFieldTitle}>Характер посещение</p>
                                <Field id="reason" as="select" className={styles.createEntityInput} name="reason" placeholder="Выберите характер посещения">
                                    <option value={EVisitReasons.PROPH}>{EVisitReasons.PROPH}</option>
                                    <option value={EVisitReasons.THERAP}>{EVisitReasons.THERAP}</option>
                                </Field>
                            </div>
                        </div>

                        <div className={styles.createEntityLine}>
                            <div className={styles.createEntityField}>
                                {touched.clinicData && errors.clinicData ? <p>{errors.clinicData}</p> : <p></p>}
                                <p className={styles.createEntityFieldTitle}>Клинические данные	</p>
                                <Field as="textarea" className={styles.createEntityInput} name="clinicData" type="text" />
                            </div>
                        </div>
                        <div className={styles.createEntityLine}>
                            <div className={styles.createEntityField}>
                                {touched.conclusion && errors.conclusion ? <p>{errors.conclusion}</p> : <p></p>}
                                <p className={styles.createEntityFieldTitle}>Заключение</p>
                                <Field as="textarea" className={styles.createEntityInput} name="conclusion" type="text" />
                            </div>
                        </div>

                        <div className={styles.createEntityLine}>
                            <div className={styles.createEntityField}>
                                {touched.appointment && errors.appointment ? <p>{errors.appointment}</p> : <p></p>}
                                <p className={styles.createEntityFieldTitle}>Назначение</p>
                                <Field as="textarea" className={styles.createEntityInput} name="appointment" type="text" />
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

export default CreateVisitForm;