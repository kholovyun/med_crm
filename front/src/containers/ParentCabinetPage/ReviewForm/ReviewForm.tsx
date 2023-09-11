import { FunctionComponent, ReactElement } from "react";
import styles from "./ReviewForm.module.css";
import { Field, Formik, Form } from "formik";
import { ERoles } from "../../../enums/ERoles";
import Btn from "../../../components/UI/Btn/Btn";
import { EBtnSize } from "../../../enums/EBtnSize";
import { validationSchemaCreateReview } from "../../../schemas/validationSchemaCreateReview";
import { EBtnTypes } from "../../../enums/EBtnTypes";
import { EBtnClass } from "../../../enums/EBtnClass";
import { useCreateReviewMutation } from "../../../app/services/reviews";
import AccessControl from "../../../permissionRoutes/AccessControl";
import IReviewFormProps from "./IReviewFormProps";
import errorHandler from "../../../helpers/errorHandler";
import successHandler from "../../../helpers/successHandler";

export const ReviewForm: FunctionComponent<IReviewFormProps> = (props: IReviewFormProps): ReactElement => {
    const [createReview,
        { isError: isCreateReviewError,
            isSuccess: isSuccesCreateReview,
            error: errorCreateReview,
            reset: resetCreateReview }
    ] = useCreateReviewMutation();

    errorHandler(isCreateReviewError, errorCreateReview);
    successHandler(isSuccesCreateReview, "Ваш отзыв отправлен", resetCreateReview);

    return (
        <AccessControl allowedRoles={[ERoles.PARENT]}>
            <div className={styles.review_form_box}>
                <Formik
                    initialValues={{
                        userId: props.userId,
                        text: ""
                    }}
                    validateOnBlur
                    onSubmit={async (values, { resetForm }) => {
                        await createReview({ review: values });
                        resetForm();
                    }}
                    validationSchema={validationSchemaCreateReview}
                >
                    {({ isValid, handleSubmit }) => (
                        <Form className={styles.form_column}>
                            <Field as={"textarea"} type="text" name="text" className={styles.textarea}
                                placeholder={"Поделитесь впечатлениями или пожеланиями по работе сервиса..."} />
                            <div className={styles.btn_row}>
                                <Btn disabled={!isValid}
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

export default ReviewForm;