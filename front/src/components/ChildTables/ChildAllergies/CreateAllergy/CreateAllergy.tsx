import { FunctionComponent, ReactElement, useEffect } from "react";
import ICreateAllergyProps from "./ICreateAllergyProps";
import { Field, Form, Formik } from "formik";
import { useCreateAllergyMutation } from "../../../../app/services/allergies";
import { validationSchemaCreateAllergy } from "../../../../schemas/validationSchemaCreateAllergy";
import Btn from "../../../UI/Btn/Btn";
import { EBtnSize } from "../../../../enums/EBtnSize";
import { EBtnTypes } from "../../../../enums/EBtnTypes";
import styles from "./CreateAllergy.module.css";
import { toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IErrorResponse } from "../../../../interfaces/IUser/IErrorResponse";
import { IMessage } from "../../../../interfaces/IUser/IMessage";

const CreateAllergy: FunctionComponent<ICreateAllergyProps> = (props): ReactElement => {
    const [createAllergy, { isError, isSuccess, error: createAllergyError }] = useCreateAllergyMutation();

    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message} Статус: ${err.status}`);
    };

    useEffect(() => {
        isError && errorHandler(createAllergyError);
    }, [isError]);

    useEffect(() => {
        isSuccess && toast.info("Создана запись о новай аллергии");
    }, [isSuccess]);

    return (
        <div className={styles.form_box}>
            <Formik
                initialValues={{
                    childId: props.childId,
                    type: "",
                    symptom: "",
                    factors: ""
                }}
                validateOnBlur
                onSubmit={(values, {resetForm}) => {
                    createAllergy(values);
                    resetForm();
                }}
                validationSchema={validationSchemaCreateAllergy}
            >
                {({ isValid, errors, touched, handleSubmit }) => (
                    <Form className={styles.createEntityForm}>
                        <div className={styles.createEntityLine}>
                            <div className={styles.createEntityField}>
                                {touched.type && errors.type ? <p>{errors.type}</p> : <p></p>}
                                <p className={styles.createEntityFieldTitle}>Вид аллергии</p>
                                <Field className={styles.createEntityInput} name="type" type="text" />
                            </div>
                            <div className={styles.createEntityField}>
                                {touched.symptom && errors.symptom ? <p>{errors.symptom}</p> : <p></p>}
                                <p className={styles.createEntityFieldTitle}>Симптомы</p>
                                <Field className={styles.createEntityInput} name="symptom" type="text" />
                            </div>
                        </div>

                        <div className={styles.createEntityLine}>
                            <div className={styles.createEntityField}>
                                {touched.factors && errors.factors ? <p>{errors.factors}</p> : <p></p>}
                                <p className={styles.createEntityFieldTitle}>Провоцирующие факторы</p>
                                <Field className={styles.createEntityInput} name="factors" type="text" />
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
                                    types={EBtnTypes.button} />
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateAllergy;