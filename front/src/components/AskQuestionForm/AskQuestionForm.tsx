import { FunctionComponent, ReactElement } from "react";
import IAskQuestionFormProps from "./IAskQuestionFormProps";
import { useCreateQuestionMutation } from "../../app/services/questions";
import errorHandler from "../../helpers/errorHandler";
import AccessControl from "../../permissionRoutes/AccessControl";
import { ERoles } from "../../enums/ERoles";
import { Field, Formik, Form } from "formik";
import styles from "./AskQuestionForm.module.css";
import { validationSchemaCreateQuestion } from "../../schemas/validationSchemaCreateQuestion";
import Btn from "../UI/Btn/Btn";
import { EBtnSize } from "../../enums/EBtnSize";
import { EBtnTypes } from "../../enums/EBtnTypes";
import { EBtnClass } from "../../enums/EBtnClass";
import successHandler from "../../helpers/successHandler";

const AskQuestionForm: FunctionComponent<IAskQuestionFormProps> = (props): ReactElement => {
    const { childId, doctorId, parentId, transparent } = props;
    const [createQuestion, { isSuccess, isError, error }] = useCreateQuestionMutation();

    errorHandler(isError, error);
    successHandler(isSuccess, "Вопрос создан");

    return (
        <AccessControl allowedRoles={[ERoles.PARENT]}>
            <div className={`${styles.form_box} ${transparent && styles.transparent}`}>
                <Formik
                    initialValues={{
                        question: "",
                        childId: childId,
                        doctorId: doctorId,
                        parentId: parentId,
                    }}
                    validateOnBlur
                    onSubmit={async (values, { resetForm }) => {
                        await createQuestion(values);
                        resetForm();
                    }}
                    validationSchema={validationSchemaCreateQuestion}
                >
                    {({ isValid, handleSubmit }) => (
                        <Form className={styles.form_column}>
                            <Field as={"textarea"} type="text" name="question" className={styles.textarea}
                                placeholder={"Задать вопрос врачу..."} />
                            <div className={styles.btn_row}>
                                <Btn
                                    disabled={props.isParentActive !== undefined ? !isValid || isValid && !props.isParentActive : !isValid}
                                    title="Отправить"
                                    onclick={handleSubmit}
                                    size={EBtnSize.tiny}
                                    types={EBtnTypes.submit}
                                    btnClass={EBtnClass.dark_active} />
                            </div>
                        </Form>
                    )}
                </Formik >
            </div>
        </AccessControl>
    );
};

export default AskQuestionForm;