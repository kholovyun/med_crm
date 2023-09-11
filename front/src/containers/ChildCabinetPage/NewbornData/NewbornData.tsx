import { FunctionComponent, ReactElement } from "react";
import INewbornDataProps from "./INewbornDataProps";
import { Field, Form, Formik } from "formik";
import { useGetNewbornDatasByChildIdQuery, useUpdateNewbornDataMutation } from "../../../app/services/newbornDatas";
import errorHandler from "../../../helpers/errorHandler";
import { validationSchemaEditNewbornData } from "../../../schemas/validationSchemaEditNewbornData";
import successHandler from "../../../helpers/successHandler";
import styles from "../../UserForms/RegisterChild/NewBornDataForm/NewBornDataForm.module.css";
import Btn from "../../../components/UI/Btn/Btn";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnTypes } from "../../../enums/EBtnTypes";
import { ESex } from "../../../enums/ESex";
import { Container } from "../../../components/UI/Container/Container";

const NewbornData: FunctionComponent<INewbornDataProps> = (props): ReactElement => {
    const {
        data: newbornData,
        isError: isErrorGetNewbornDatas,
        error: errorGetNewbornDatas,
    } = useGetNewbornDatasByChildIdQuery(props.child.id);

    const [updateNewbornData, {
        isError: isErrorUpdateNewbornData,
        isSuccess: isSuccesUpdateNewbornData,
        error: errorUpdateNewbornData
    }] = useUpdateNewbornDataMutation();

    successHandler(isSuccesUpdateNewbornData, "Сведение о новорожденном изменено");
    errorHandler(isErrorGetNewbornDatas, errorGetNewbornDatas);
    errorHandler(isErrorUpdateNewbornData, errorUpdateNewbornData);
    const pregnancyNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <div className={styles.newbornData_block}>
            {newbornData &&
                <Container>
                    <Formik
                        initialValues={{
                            childId: props.child.id,
                            dischargedDate: newbornData[0].dischargedDate,
                            pregnancyN: newbornData[0].pregnancyN,
                            pregnancyDescript: newbornData[0].pregnancyDescript,
                            birthN: newbornData[0].birthN,
                            gestAge: newbornData[0].gestAge,
                            period1: newbornData[0].period1,
                            period2: newbornData[0].period2,
                            amnAbsPeriod: newbornData[0].amnAbsPeriod,
                            amnDescript: newbornData[0].amnDescript,
                            anesthesia: newbornData[0].anesthesia,
                            postBirthPeriod: newbornData[0].postBirthPeriod,
                            motherState: newbornData[0].motherState,
                            birthWeight: newbornData[0].birthWeight,
                            birthHeight: newbornData[0].birthHeight,
                            newbornState: newbornData[0].newbornState,
                            apgarScore: newbornData[0].apgarScore,
                            reanimation: newbornData[0].reanimation,
                            breastTry: newbornData[0].breastTry,
                            feeding: newbornData[0].feeding,
                            diagnosis: newbornData[0].diagnosis,
                            examination: newbornData[0].examination,
                            treatment: newbornData[0].treatment,
                            eyes: newbornData[0].eyes,
                            reflexes: newbornData[0].reflexes,
                            skin: newbornData[0].skin,
                            organs: newbornData[0].organs,
                            stool: newbornData[0].stool,
                            diuresis: newbornData[0].diuresis,
                            umbilicalCord: newbornData[0].umbilicalCord,
                            examedBy: newbornData[0].examedBy,
                            notes: newbornData[0].notes,
                            feedingReason: newbornData[0].feedingReason
                        }}
                        validateOnBlur
                        onSubmit={(values) => {
                            updateNewbornData({ id: props.child.id, newbornData: values });
                        }}
                        validationSchema={validationSchemaEditNewbornData}
                    >
                        {({ isValid, errors, touched, handleSubmit }) => (
                            <Form className={styles.form_container}>
                                <div className={styles.date_block}>
                                    <label className={styles.label_flex}>
                                        <p className={styles.near_input_text}>Родился</p>
                                        <p className={styles.born_data_input}>{new Date(props.child.dateOfBirth).toLocaleDateString()}</p>
                                    </label>
                                    <label className={styles.label_flex}>
                                        <p className={styles.near_input_text}>Выписан</p>
                                        <Field className={styles.born_data_input} name="dischargedDate" type="date" />
                                    </label>
                                </div>

                                <div className={styles.date_block}>
                                    <label className={styles.label_flex}>
                                        <p className={styles.near_input_text}>Ребенок от</p>
                                        <Field id="pregnancyN" as="select" className={styles.number_select} name="pregnancyN">
                                            {pregnancyNumber.map(num => {
                                                return <option className={styles.createEntityOption} key={num} value={num}>{num}</option>;
                                            })}
                                        </Field>
                                        <p className={styles.near_input_text}>беременности</p>
                                    </label>
                                </div>

                                <div className={styles.date_block}>
                                    <label className={styles.label_flex_long}>
                                        <p className={styles.near_input_text}>Протекающей</p>
                                        <Field className={styles.born_data_input} name="pregnancyDescript" type="text" />
                                    </label>
                                </div>

                                <div className={styles.date_block_short}>
                                    <label className={styles.label_flex}>
                                        <p className={styles.near_input_text}>Роды</p>
                                        <Field id="birthN" as="select" className={styles.number_select} name="birthN">
                                            {pregnancyNumber.map(num => {
                                                return <option key={num} value={num}>{num}</option>;
                                            })}
                                        </Field>
                                    </label>
                                    <label className={styles.label_flex}>
                                        <p className={styles.near_input_text}>в сроки</p>
                                        <Field className={styles.born_data_input} name="gestAge" type="number" />
                                    </label>
                                </div>

                                <div className={styles.date_block_short}>
                                    <label className={styles.label_flex}>
                                        <p className={styles.near_input_text}>1 период</p>
                                        <Field className={styles.born_data_input} name="period1" type="number" />
                                        <p className={styles.near_input_text}>2 период</p>
                                        <Field className={styles.born_data_input} name="period2" type="number" />
                                    </label>
                                </div>

                                <div className={styles.date_block_short}>
                                    <label className={styles.label_flex}>
                                        <p className={styles.near_input_text}>Безводный период</p>
                                        <Field className={styles.born_data_input} name="amnAbsPeriod" type="number" />
                                    </label>
                                </div>

                                <div className={styles.date_block}>
                                    <label className={styles.label_flex_long}>
                                        <p className={styles.near_input_text}>Характер околоплодных вод</p>
                                        <Field className={styles.born_data_input} name="amnDescript" type="text" />
                                    </label>
                                </div>

                                <div className={styles.date_block}>
                                    <label className={styles.label_flex_long}>
                                        <p className={styles.near_input_text}>Обезболивание применялось, нет, какое</p>
                                        <Field className={styles.born_data_input} name="anesthesia" type="text" />
                                    </label>
                                </div>

                                <div className={styles.date_block}>
                                    <label className={styles.label_flex_long}>
                                        <p className={styles.near_input_text}>Течение послеродового периода</p>
                                        <Field className={styles.born_data_input} name="postBirthPeriod" type="text" />
                                    </label>
                                </div>

                                <div className={styles.date_block}>
                                    <label className={styles.label_flex_long}>
                                        <p className={styles.near_input_text}>Состояние матери при выписке</p>
                                        <Field className={styles.born_data_input} name="motherState" type="text" />
                                    </label>
                                </div>

                                <div className={styles.date_block_tiny}>
                                    <div className={styles.radio_btns_feed}>
                                        <p className={styles.near_input_text}>Пол ребенка</p>
                                        <label className={styles.radio_label_flex}>
                                            <Field checked={props.child.sex === ESex.FEMALE} type="radio" name="sex" value={ESex.FEMALE} className={styles.radio_input} /> женский
                                        </label>
                                        <label className={styles.radio_label_flex}>
                                            <Field checked={props.child.sex === ESex.MALE} type="radio" name="sex" value={ESex.MALE} className={styles.radio_input} /> мужской
                                        </label>
                                    </div>
                                </div>

                                <div className={styles.date_block_tiny}>
                                    <label className={styles.label_flex}>
                                        <p className={styles.near_input_text}>Масса при рождении</p>
                                        <Field className={styles.born_data_input} name="birthWeight" type="number" />
                                        <p className={styles.near_input_text}>кг</p>
                                    </label>
                                </div>

                                <div className={styles.date_block_tiny}>
                                    <label className={styles.label_flex}>
                                        <p className={styles.near_input_text}>Рост при рождении</p>
                                        <Field className={styles.born_data_input} name="birthHeight" type="number" />
                                        <p className={styles.near_input_text}>см</p>
                                    </label>
                                </div>

                                <div className={styles.date_block}>
                                    <label className={styles.label_flex}>
                                        <p className={styles.near_input_text}>Состояние ребенка при рождении</p>
                                        <Field className={styles.born_data_input} name="newbornState" type="text" />
                                    </label>
                                </div>

                                <div className={styles.date_block}>
                                    <label className={styles.label_flex}>
                                        <p className={styles.near_input_text}>Оценка по шкале Апгар</p>
                                        <Field className={styles.born_data_input} name="apgarScore" type="text" />
                                    </label>
                                </div>

                                <div className={styles.date_block}>
                                    <label className={styles.label_flex}>
                                        <p className={styles.near_input_text}>Проводились ли меры по оживлению</p>
                                        <Field className={styles.born_data_input} name="reanimation" type="text" />
                                    </label>
                                </div>

                                <div className={styles.date_block_short}>
                                    <div className={styles.radio_btns_feed}>
                                        <label className={styles.radio_label_flex} id="yes">К груди приложен
                                            <Field type="radio" value={true} name="breastTry" className={styles.radio_input} />
                                        </label>
                                        <label className={styles.radio_label_flex} id="no"> К груди не приложен
                                            <Field type="radio" value={false} name="breastTry" className={styles.radio_input} />
                                        </label>
                                    </div>
                                </div>

                                <div className={styles.date_block}>
                                    <div className={styles.radio_btns_feed}>
                                        <p className={styles.near_input_text}>Вскармливание</p>
                                        <label className={styles.radio_label_flex}>
                                            <Field type="radio" name="feeding" value={"исключительно грудное"} className={styles.radio_input} /> исключительно грудное
                                        </label>
                                        <label className={styles.radio_label_flex}>
                                            <Field type="radio" name="feeding" value={"смешанное"} className={styles.radio_input} /> смешанное
                                        </label>
                                        <label className={styles.radio_label_flex}>
                                            <Field type="radio" name="feeding" value={"искусственное"} className={styles.radio_input} /> искусственное
                                        </label>
                                    </div>
                                </div>
                                <div className={styles.date_block}>
                                    <label className={styles.label_flex}>
                                        <p className={styles.near_input_text}>Причина вскармливания</p>
                                        <Field className={styles.born_data_input} name="feedingReason" type="text" />
                                    </label>
                                </div>

                                <div className={styles.date_block}>
                                    <label className={styles.label_flex}>
                                        <p className={styles.near_input_text}>Диагноз</p>
                                        <Field className={styles.born_data_input} name="diagnosis" type="text" />
                                    </label>
                                </div>

                                <div className={styles.date_block}>
                                    <label className={styles.label_flex}>
                                        <p className={styles.near_input_text}>Обследован</p>
                                        <Field className={styles.born_data_input} name="examination" type="text" />
                                    </label>
                                </div>

                                <div className={styles.date_block}>
                                    <label className={styles.label_flex}>
                                        <p className={styles.near_input_text}>Лечение</p>
                                        <Field className={styles.born_data_input} name="treatment" type="text" />
                                    </label>
                                </div>

                                <p className={styles.near_input_text}>При выписке состояние: </p>
                                <div className={styles.right_block}>
                                    <div className={`${styles.date_block_short} ${styles.no_margin}`}>
                                        <label className={styles.label_flex}>
                                            <p className={styles.near_input_text}>глаза</p>
                                            <Field className={`${styles.born_data_input}`} name="eyes" type="text" />
                                        </label>
                                    </div>
                                    <div className={`${styles.date_block_short} ${styles.no_margin}`}>
                                        <label className={styles.label_flex}>
                                            <p className={styles.near_input_text}>физиологические рефлексы</p>
                                            <Field className={`${styles.born_data_input}`} name="reflexes" type="text" />
                                        </label>
                                    </div>
                                    <div className={`${styles.date_block_short} ${styles.no_margin}`}>
                                        <label className={styles.label_flex}>
                                            <p className={styles.near_input_text}>цвет кожи</p>
                                            <Field className={styles.born_data_input} name="skin" type="text" />
                                        </label>
                                        <label>
                                            <p className={styles.near_input_text}>по органам</p>
                                            <Field className={`${styles.born_data_input}`} name="organs" type="text" />
                                        </label>
                                    </div>
                                    <div className={`${styles.date_block_short} ${styles.no_margin}`}>
                                        <label className={styles.label_flex}>
                                            {touched.stool && errors.stool ? <p>{errors.stool}</p> : <p></p>}
                                            <p className={styles.near_input_text}>стул</p>
                                            <Field className={`${styles.born_data_input}`} name="stool" type="text" />
                                        </label>
                                        <label className={styles.label_flex}>
                                            <p className={styles.near_input_text}>диурез</p>
                                            <Field className={`${styles.born_data_input}`} name="diuresis" type="text" />
                                        </label>
                                    </div>
                                    <div className={`${styles.date_block_short} ${styles.no_margin}`}>
                                        <div className={styles.label_flex}>
                                            <p className={styles.near_input_text}>пуповинный остаток</p>
                                            <Field className={`${styles.born_data_input}`} name="umbilicalCord" type="text" />
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.date_block}>
                                    <label className={styles.label_flex_long}>
                                        <p className={styles.near_input_text}>Особые замечания</p>
                                        <Field className={styles.born_data_input} name="notes" type="text" />
                                    </label>
                                </div>

                                <div className={styles.date_block}>
                                    <label className={styles.label_flex_long}>
                                        <p className={styles.near_input_text}>Заключение составил</p>
                                        <Field className={styles.born_data_input} name="examedBy" type="text" />
                                    </label>
                                </div>

                                <div className={styles.flex_end}>
                                    <Btn disabled={!isValid} title="Сохранить" onclick={handleSubmit} size={EBtnSize.tiny} types={EBtnTypes.submit} />
                                </div>
                            </Form>
                        )}

                    </Formik>
                </Container>}

        </div>
    );
};

export default NewbornData;

