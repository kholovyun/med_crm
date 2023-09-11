import { FunctionComponent, ReactElement } from "react";
import styles from "./AddChildForm.module.css";
import { Formik, Form, Field, ErrorMessage, FormikValues } from "formik";
import { ESex } from "../../../../enums/ESex";
import IAddChildFormProps from "./IAddChildFormProps";
import Btn from "../../../../components/UI/Btn/Btn";
import { EBtnTypes } from "../../../../enums/EBtnTypes";
import { EBtnSize } from "../../../../enums/EBtnSize";
import { EBtnClass } from "../../../../enums/EBtnClass";
import { FormBox } from "../../../UserForms/FormBox/FormBox";
import errorHandler from "../../../../helpers/errorHandler";
import successHandler from "../../../../helpers/successHandler";
import { useCreateChildMutation } from "../../../../app/services/children";
import { validationScremasCreateChild } from "../../../../schemas/validationScremasCreateChild";
import IChildCreateDto from "../../../../interfaces/IChild/IChildCreateDto";

const AddChildForm: FunctionComponent<IAddChildFormProps> = ({parentId, closeModal}): ReactElement => {
    const [createChild, { isSuccess, isError, error }] = useCreateChildMutation();

    errorHandler(isError, error);
    successHandler(isSuccess, "Ребенок добавлен");
    
    return (
        <FormBox>
            <Formik
                initialValues={{
                    parentId: parentId,
                    photo: "",
                    name: "",
                    surname: "",
                    patronim: "",
                    dateOfBirth: "",
                    sex: "",
                    height: "",
                    weight: "",
                }}
                onSubmit={ async (values: FormikValues) => {
                    await createChild(values as IChildCreateDto);
                }}
                validateOnBlur
                validationSchema={validationScremasCreateChild}
            >
                {({ isValid, handleSubmit }) => (
                    <Form>
                        <div className={styles.form_column}>
                            <h1 className={styles.titleTxt}>Добавить ребенка</h1>
                            <div className={styles.two_inputs_row}>
                                <div className={styles.input_flex_column}>
                                    <ErrorMessage className={styles.error_text} name="name" component="div" />
                                    <Field
                                        className={styles.login_input}
                                        name="name"
                                        type="text"
                                        placeholder="Имя" />
                                </div>
                                <div className={styles.input_flex_column}>
                                    <ErrorMessage className={styles.error_text} name="surname" component="div" />
                                    <Field
                                        className={styles.login_input}
                                        name="surname"
                                        type="text"
                                        placeholder="Фамилия" />
                                </div>
                            </div>
                            <ErrorMessage className={styles.error_text} name="patronim" component="div" />
                            <Field
                                className={styles.login_input}
                                name="patronim"
                                type="text"
                                placeholder="Отчество" />
                            <div className={styles.two_inputs_row}>
                                <div className={styles.input_flex_column}>
                                    <ErrorMessage className={styles.error_text} name="dateOfBirth" component="div" />
                                    <Field 
                                        name="dateOfBirth" 
                                        type="date" 
                                        className={styles.login_input} />
                                </div>
                                <div className={styles.input_flex_column}>
                                    <ErrorMessage className={styles.error_text} name="sex" component="div" />
                                    <div className={styles.select_wrapper}>
                                        <Field
                                            as="select"
                                            className={styles.custom_select}
                                            name="sex"
                                            placeholder="Пол"
                                            id="sex"
                                            default=""
                                        >
                                            <option className={styles.custom_option} value="" disabled hidden>Пол</option>
                                            <option className={styles.custom_option} value={ESex.FEMALE}>{ESex.FEMALE}</option>
                                            <option className={styles.custom_option} value={ESex.MALE}>{ESex.MALE}</option>
                                        </Field>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.two_inputs_row}>
                                <div className={styles.input_flex_column}>
                                    <ErrorMessage className={styles.error_text} name="height" component="div" />
                                    <div className={styles.text_select_box}>
                                        
                                        <Field
                                            className={styles.num_input}
                                            name="height"
                                            type="number"
                                            min="0"
                                            placeholder="Рост" />
                                        
                                        <p className={styles.label_text}>см</p>
                                    </div>
                                </div>
                                <div className={styles.input_flex_column}>
                                    <ErrorMessage className={styles.error_text} name="weight" component="div" />
                                    <div className={styles.text_select_box}>
                                        <Field
                                            className={styles.num_input}
                                            name="weight"
                                            type="number"
                                            min="0"
                                            placeholder="Вес" />
                                        <p className={styles.label_text}>кг</p>
                                    </div>
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
                                    title={"Создать"}
                                    size={EBtnSize.big}
                                    btnClass={EBtnClass.dark_active}
                                    onclick={handleSubmit}
                                />
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </FormBox>
    );
};

export default AddChildForm;