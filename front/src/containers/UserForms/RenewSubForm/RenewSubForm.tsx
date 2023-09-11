import { FunctionComponent, ReactElement } from "react";
import styles from "../UserForms.module.css";
import { Formik, Field, Form, ErrorMessage, FormikValues } from "formik";
import Btn from "../../../components/UI/Btn/Btn";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnTypes } from "../../../enums/EBtnTypes";
import { toast } from "react-toastify";
import { FormBox } from "../FormBox/FormBox";
import { Title } from "../Title/Title";
import { useNavigate } from "react-router-dom";
import { EBtnClass } from "../../../enums/EBtnClass";
import errorHandler from "../../../helpers/errorHandler";
import IRenewSubFormProps from "./IRenewSubFormProps";
import { ESubscriptionType } from "../../../enums/ESubscriptionType";
import { EPaymentType } from "../../../enums/EPaymentType";
import { useRenewSubMutation } from "../../../app/services/subscription";
import ISubscriptionUpdateDto from "../../../interfaces/ISubscription/ISubscription";

const RenewSubForm: FunctionComponent<IRenewSubFormProps> = (props): ReactElement => {
    const navigate = useNavigate();
    const [renewSub, { isError, isSuccess, error: createUserError }] = useRenewSubMutation();

    const successHandler = () => {
        toast.info("Подписка продлена");
        navigate(-1);
    };

    errorHandler(isError, createUserError);
    isSuccess && successHandler();

    return (
        <FormBox>            
            <Formik
                initialValues={{
                    type: "",
                    paymentType: "",
                    payedBy: "",
                    userId: props.parent.userId
                }}
                validateOnBlur
                onSubmit={(values : FormikValues) => {
                    renewSub({sub: values as ISubscriptionUpdateDto});
                }}
            >
                {({ isValid, handleSubmit }) => (
                    <Form className={styles.form_column}>
                        <Title text="Продление подписки" />
                        <div className={styles.two_inputs_row}>
                            <div className={styles.input_flex_column}>
                                <ErrorMessage className={styles.error_text} name="name" component="div"/>
                                <Field disabled={true} className={styles.login_input} name="name" type="text" value={props.parent.users.name} />
                            </div>
                            <div className={styles.input_flex_column}>
                                <ErrorMessage className={styles.error_text} name="surname" component="div"/>
                                <Field disabled={true} className={styles.login_input} name="surname" type="text" value={props.parent.users.surname} />
                            </div>
                        </div>
                        <div className={styles.input_row}>
                            <label htmlFor={"type"} className={styles.label_text}>Срок подписки</label>
                            <div className={styles.input_flex_column}>
                                <div className={styles.select_wrapper}>                                    
                                    <Field className={styles.custom_select} id={"type"} name="type" as="select" placeholder="Выберите срок подписки">
                                        <option className={styles.custom_option} value="" disabled hidden>Выберите</option>
                                        <option className={styles.custom_option} value={ESubscriptionType.MOUNTH}>{ESubscriptionType.MOUNTH} месяц</option>
                                        <option className={styles.custom_option} value={ESubscriptionType.HALF_YEAR}>{ESubscriptionType.HALF_YEAR} месяцев</option>
                                        <option className={styles.custom_option} value={ESubscriptionType.YEAR}>Год</option>
                                    </Field>
                                </div>
                            </div>
                        </div> 
                        <div className={styles.input_row}>
                            <label htmlFor={"paymentType"} className={styles.label_text}>Тип оплаты</label>
                            <div className={styles.input_flex_column}>
                                <div className={styles.select_wrapper}>                                    
                                    <Field className={styles.custom_select} id={"paymentType"} name="paymentType" as="select" placeholder="Выберите тип оплаты">
                                        <option className={styles.custom_option} value="" disabled hidden>Выберите</option>
                                        <option className={styles.custom_option} value={EPaymentType.AQUIR}>{EPaymentType.AQUIR}</option>
                                        <option className={styles.custom_option} value={EPaymentType.CASH}>{EPaymentType.CASH}</option>
                                    </Field>
                                </div>
                            </div>
                        </div>                                                         
                        <Field hidden type="text" name="role" className={styles.login_input} />
                        <div className={styles.added_margin_top}>
                            <Btn disabled={!isValid} 
                                title="Создать" 
                                onclick={handleSubmit} size={EBtnSize.big} 
                                types={EBtnTypes.submit}
                                btnClass={EBtnClass.dark_active} />
                        </div>
                    </Form>
                )}
            </Formik>
        </FormBox>
    );
};

export default RenewSubForm;