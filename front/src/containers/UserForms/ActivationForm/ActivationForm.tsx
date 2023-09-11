import {Field, Form, Formik} from "formik";
import styles from "./ActivationForm.module.css";
import {validationSchemaActivateParent} from "../../../schemas/validationSchemaActivateParent.ts";
import Btn from "../../../components/UI/Btn/Btn.tsx";
import {EBtnTypes} from "../../../enums/EBtnTypes.ts";
import {EBtnSize} from "../../../enums/EBtnSize.ts";

type TActivationProps = {
    fn: () => void;
};
const ActivationForm = (props: TActivationProps) => {
    return (
        <Formik
            initialValues={{
                offerChecked: false,
                privacyChecked: false,
                childInfoChecked: false
            }}
            validationSchema={validationSchemaActivateParent}
            onSubmit={():void => {
                props.fn();
            }}
        >
            {({ values }) => (
                <Form className={styles.activationForm}>
                    <p className={styles.activationFormTitle}>
                        Активация вашего аккаунта произойдет после того, как вы ознакомитесь с договором оферты, политикой конфиденциальности и сведениями, внесенными в личный кабинет
                    </p>
                    <div className={`${styles.activationFormCheckBoxes}`}>
                        <p>С договором оферты ознакомлен и согласен</p>
                        <label className={`${styles.activationFormControls} ${values.offerChecked ? styles.activationFormControlsChecked:""}`}>
                            <Field type="checkbox" name="offerChecked" className={styles.checkBox} />
                        </label>
                    </div>
                    <div className={styles.activationFormCheckBoxes}>
                        <p>С политикой конфиденциальности ознакомлен и согласен</p>
                        <label className={`${styles.activationFormControls} ${values.privacyChecked ? styles.activationFormControlsChecked:""}`}>
                            <Field type="checkbox" name="privacyChecked" className={styles.checkBox} />
                        </label>
                    </div>
                    <div className={styles.activationFormCheckBoxes}>
                        <p>Сведения о ребенке внесены корректно</p>
                        <label className={`${styles.activationFormControls} ${values.childInfoChecked ? styles.activationFormControlsChecked:""}`}>
                            <Field type="checkbox" name="childInfoChecked" className={styles.checkBox} />
                        </label>
                    </div>
                    <Btn
                        title={"Сохранить"}
                        types={EBtnTypes.submit}
                        size={EBtnSize.big}
                        disabled={!values.offerChecked || !values.privacyChecked || !values.childInfoChecked}
                    />
                </Form>
            )}
        </Formik>
    );
};

export default ActivationForm;