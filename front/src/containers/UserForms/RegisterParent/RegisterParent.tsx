import styles from "../UserForms.module.css";
import { Formik, Field, Form, FormikConfig, FormikValues, ErrorMessage, FieldProps } from "formik";
import MaskedInput from "react-text-mask";
import { Container } from "../../../components/UI/Container/Container";
import { Title } from "../Title/Title";
import { ERoles } from "../../../enums/ERoles";
import Btn from "../../../components/UI/Btn/Btn";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnTypes } from "../../../enums/EBtnTypes";
import { useEffect, Children, FunctionComponent, ReactElement, ReactNode, useState, ChangeEvent } from "react";
import { ESex } from "../../../enums/ESex";
import { ESubscriptionType } from "../../../enums/ESubscriptionType";
import { EPaymentType } from "../../../enums/EPaymentType";
import { useCreateUserParentMutation } from "../../../app/services/users";
import {KGMask, KZMask, RUMask} from "../../../helpers/countryRegexs";
import IUserCreateParentWithChildDto from "../../../interfaces/IUser/IUserCreateParentWithChildDto";
import { validationFirst, validationSec } from "../../../schemas/validationScremasRegisterParent";
import { FormikStepProps } from "./IFormikInterface";
import { FormBox } from "../FormBox/FormBox";
import { EBtnClass } from "../../../enums/EBtnClass";
import { useNavigate, useParams } from "react-router-dom";
import KZFlag from "../../../assets/img/kz.png";
import RUFlag from "../../../assets/img/ru.png";
import KGFlag from "../../../assets/img/kg.png";
import errorHandler from "../../../helpers/errorHandler";
import successHandler from "../../../helpers/successHandler";
import { useGetDoctorByDoctorIdQuery } from "../../../app/services/doctors";

const RegisterParent: FunctionComponent = (): ReactElement => {
    const navigate = useNavigate();
    const [phoneMask, setPhoneMask] = useState(KZMask);
    const [placeholder, setPlaceholder] = useState("+7(___)___-__-__");
    const [flag, setFlag] = useState(KZFlag);
    const params = useParams();
    const {data: doctor} = useGetDoctorByDoctorIdQuery({ id: String(params.id) });
    const [doctorId, setDoctorId] = useState<{ doctorId: string }>({ doctorId: String(params.id) });
    const [createUserParent, { isError, isSuccess, error: createUserParentError }] = useCreateUserParentMutation();

    const phoneMaskOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
        switch (e.target.value) {
        case "RU":
            setPhoneMask(RUMask);
            setPlaceholder("+7(___)___-__-__");
            setFlag(RUFlag);
            break;
        case "KG":
            setPhoneMask(KGMask);
            setPlaceholder("+996(___)__-__-__");
            setFlag(KGFlag);
            break;
        case "KZ":
            setPhoneMask(KZMask);
            setPlaceholder("+7(___)___-__-__");
            setFlag(KZFlag);
            break;
        default:
            setPhoneMask(KZMask);
            break;
        }
    };

    useEffect(() => {
        setDoctorId({ doctorId: String(params.id) });
    }, []);

    errorHandler(isError, createUserParentError);

    const successRegisterHandler = () => {
        navigate(-1);
    };

    successHandler(isSuccess, "Пользователь успешно создан", successRegisterHandler);

    return (
        <Container>
            <FormBox>
                <FormikStepper
                    initialValues={{
                        role: ERoles.PARENT,
                        email: "",
                        phone: "",
                        name: "",
                        surname: "",
                        patronim: "",
                        doctorId: doctorId.doctorId,
                        paymentType: "",
                        subscrType: "",
                        child: {
                            name: "",
                            surname: "",
                            patronim: "",
                            dateOfBirth: "",
                            sex: "",
                            height: "",
                            weight: ""
                        }
                    }}
                    onSubmit={(values: FormikValues) => {
                        createUserParent(values as IUserCreateParentWithChildDto);
                    }}
                >
                    <FormikStep label="1" validationSchema={validationFirst}>
                        <p className={styles.subtitle}>Лечащий врач: <span className={styles.bold}>{doctor?.users.surname} {doctor?.users.name.charAt(0)}.
                            {doctor?.users.patronim ? `${doctor.users.patronim.charAt(0)}.` : null}</span></p>
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
                                <ErrorMessage className={styles.error_text} name="surname" component="div" /><Field
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
                        <ErrorMessage className={styles.error_text} name="email" component="div" />
                        <Field
                            className={styles.login_input}
                            name="email"
                            type="text"
                            placeholder="Email" />
                        <ErrorMessage className={styles.error_text} name="phone" component="div" />
                        <div className={styles.two_inputs_row}>
                            <div className={styles.select_flag_wrapper}>
                                <div className={styles.flag_wrapper}><img className={styles.flag_image} src={flag} alt="" /></div>
                                <div className={styles.select_wrapper}>
                                    <select className={styles.country_select} defaultValue={"KZ"} onChange={phoneMaskOnChange}>
                                        <option className={styles.custom_option} value={"KZ"}>KZ</option>
                                        <option className={styles.custom_option} value={"KG"}>KG</option>
                                        <option className={styles.custom_option} value={"RU"}>RU</option>
                                    </select>
                                </div>
                            </div>
                            <Field
                                name="phone"
                                type="text">
                                {({ field , form}: FieldProps<string>) => (
                                    <MaskedInput
                                        {...field }
                                        mask={phoneMask}
                                        placeholder={placeholder}
                                        type="text"
                                        onBlur={field.onBlur}
                                        onChange={async (e) => {
                                            try {
                                                await form.setFieldValue(field.name, e.target.value);
                                            } catch (error) {
                                                console.error(error);
                                            }
                                        }}
                                        value={field.value}
                                        className={styles.login_input}
                                    />
                                )}
                            </Field>
                        </div>
                        <div className={styles.two_inputs_row}>
                            <Field
                                hidden readOnly={true}
                                className={styles.login_input}
                                name="doctorId"
                                type="text"
                                placeholder="ID Врача" />
                        </div>
                    </FormikStep>
                    <FormikStep label="2" validationSchema={validationSec}>
                        <div className={styles.form_column}>
                            <div className={styles.two_inputs_row}>
                                <div className={styles.input_flex_column}>
                                    <ErrorMessage className={styles.error_text} name="child.name" component="div" />
                                    <Field
                                        className={styles.login_input}
                                        name="child.name"
                                        type="text"
                                        placeholder="Имя" />
                                </div>
                                <div className={styles.input_flex_column}>
                                    <ErrorMessage className={styles.error_text} name="child.surname" component="div" />
                                    <Field
                                        className={styles.login_input}
                                        name="child.surname"
                                        type="text"
                                        placeholder="Фамилия" />
                                </div>
                            </div>
                            <ErrorMessage className={styles.error_text} name="child.patronim" component="div" />
                            <Field
                                className={styles.login_input}
                                name="child.patronim"
                                type="text"
                                placeholder="Отчество" />
                            <div className={styles.two_inputs_row}>
                                <div className={styles.input_flex_column}>
                                    <ErrorMessage className={styles.error_text} name="child.dateOfBirth" component="div" />
                                    <Field name="child.dateOfBirth" type="date" className={styles.login_input} />
                                </div>
                                <div className={styles.input_flex_column}>
                                    <ErrorMessage className={styles.error_text} name="child.sex" component="div" />
                                    <div className={styles.select_wrapper}>
                                        <Field
                                            as="select"
                                            className={styles.custom_select}
                                            name="child.sex"
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
                                    <ErrorMessage className={styles.error_text} name="child.height" component="div" />
                                    <div className={styles.text_select_box}>
                                        <div className={styles.select_wrapper}>
                                            <Field
                                                className={styles.num_input}
                                                name="child.height"
                                                type="number"
                                                placeholder="Рост" />
                                        </div>
                                        <p className={styles.label_text}>см</p>
                                    </div>
                                </div>
                                <div className={styles.input_flex_column}>
                                    <ErrorMessage className={styles.error_text} name="child.weight" component="div" />
                                    <div className={styles.text_select_box}>
                                        <div className={styles.select_wrapper}>
                                            <Field
                                                className={styles.num_input}
                                                name="child.weight"
                                                type="number"
                                                placeholder="Вес" />
                                        </div>
                                        <p className={styles.label_text}>кг</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FormikStep>
                    <FormikStep label="3">
                        <div className={styles.two_inputs_row}>
                            <div className={styles.input_subscribe_column}>
                                <label htmlFor={"subsribe"} className={styles.label_text}>Тип подписки</label>
                                <div className={styles.select_wrapper}>
                                    <Field
                                        as="select"
                                        className={styles.custom_select}
                                        name="subscrType"
                                        id="subsribe"
                                    >
                                        <option className={styles.custom_option} value="" disabled hidden>Выберите</option>
                                        <option className={styles.custom_option} value={ESubscriptionType.MOUNTH}>{ESubscriptionType.MOUNTH} месяц</option>
                                        <option className={styles.custom_option} value={ESubscriptionType.HALF_YEAR}>{ESubscriptionType.HALF_YEAR} месяцев</option>
                                        <option className={styles.custom_option} value={ESubscriptionType.YEAR}>год</option>
                                    </Field>
                                </div>
                            </div>
                            <div className={styles.input_subscribe_column}>
                                <label htmlFor={"payment"} className={styles.label_text}>Способ оплаты</label>
                                <div className={styles.select_wrapper}>
                                    <Field
                                        as="select"
                                        className={styles.custom_select}
                                        name="paymentType"
                                        id="payment"
                                    >
                                        <option className={styles.custom_option} value="" disabled hidden>Выберите</option>
                                        <option className={styles.custom_option} value={EPaymentType.AQUIR}>{EPaymentType.AQUIR}</option>
                                        <option className={styles.custom_option} value={EPaymentType.CASH}>{EPaymentType.CASH}</option>
                                    </Field>
                                </div>
                            </div>
                        </div>
                    </FormikStep>
                </FormikStepper>
            </FormBox>
        </Container>
    );
};

export function FormikStep({ children }: FormikStepProps) {
    return <>{children}</>;
}

export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
    const childrenArray = Children.toArray(children as ReactNode) as ReactElement<FormikStepProps>[];
    const [step, setStep] = useState(0);
    const currentChild = childrenArray[step];
    const frorward = () => {
        setStep((s) => s +1);
    };
    const back = () => {
        setStep((s) => s -1);
    };

    function isLastStep() {
        return step === childrenArray.length - 1;
    }
    function TitlePicker() {
        if (step === 0)
            return "Регистрация родителя пациента";
        else if (step === 1)
            return "Регистрация пациента";
        else
            return "Оформление подписки";
    }

    return (
        <Formik
            {...props}
            validationSchema={currentChild.props.validationSchema}
            onSubmit={async (values, helpers) => {
                if (isLastStep()) {
                    await props.onSubmit(values, helpers);
                } else {
                    frorward();
                    helpers.setTouched({});
                }
            }}
        >
            <Form className={styles.form_column}>
                <Title text={TitlePicker()} />
                {currentChild}
                <div className={styles.two_inputs_row}>
                    {step > 0 ? (
                        <Btn
                            onclick={() => back()}
                            title="Назад"
                            size={EBtnSize.small}
                            btnClass={EBtnClass.white_active}
                        />
                    ) : null}
                    <Btn
                        types={EBtnTypes.submit}
                        title={isLastStep() ? "Создать" : "Продолжить"}
                        size={EBtnSize.small}
                        btnClass={EBtnClass.dark_active}
                    />
                </div>
            </Form>
        </Formik>
    );
}

export default RegisterParent;