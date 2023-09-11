import { FunctionComponent, ReactElement } from "react";
import { Container } from "../../../../components/UI/Container/Container";
import { Title } from "../../Title/Title";
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import Btn from "../../../../components/UI/Btn/Btn";
import { EBtnSize } from "../../../../enums/EBtnSize";
import { EBtnTypes } from "../../../../enums/EBtnTypes";
import { EBtnClass } from "../../../../enums/EBtnClass";
import styles from "./NewBornDataForm.module.css";
import { ESex } from "../../../../enums/ESex";

export const NewBornDataForm: FunctionComponent = (): ReactElement => {
    return (
        <Container>
            <Formik
                initialValues={{
                    childId: "string",
                    dischargedDate: "",
                    pregnancyN: 0,
                    pregnancyDescript: "",
                    birthN: 0,
                    gestAge: 0,
                    period1: 0,
                    period2: 0,
                    amnAbsPeriod: 0,
                    amnDescript: "",
                    anesthesia: "",
                    postBirthPeriod: "",
                    motherState: "",
                    birthWeight: 0,
                    birthHeight: 0,
                    newbornState: "",
                    apgarScore: "",
                    reanimation: "",
                    breastTry: true,
                    feeding: "",
                    diagnosis: "",
                    examination: "",
                    treatment: "",
                    eyes: "",
                    reflexes: "",
                    skin: "",
                    organs: "",
                    stool: "",
                    diuresis: "",
                    umbilicalCord: "",
                    examedBy: "",
                    notes: "",
                    feedingReason: "",
                }}
                onSubmit={(values) => {
                    console.log(values);
                    toast.info("Данные корректны");
                }}
            >
                {({ isValid, errors, touched, handleSubmit }) => (
                    <Form className={styles.form_container}>
                        <Title text="Сведения о новорожденном" />
                        <div className={styles.date_block}>
                            <label className={styles.label_flex}>
                                <p className={styles.near_input_text}>Родился</p>
                                <Field className={styles.born_data_input} name="name" type="date" />
                            </label>
                            <label className={styles.label_flex}>
                                <p className={styles.near_input_text}>Выписан</p>
                                <Field className={styles.born_data_input} name="dischargedDate" type="date" />
                            </label>
                        </div>
                        <div className={styles.date_block}>
                            <label className={styles.label_flex}>
                                <p className={styles.near_input_text}>Ребенок от</p>
                                <Field className={styles.number_select} as="select" id="number" name="pregnancyN">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
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
                                <p className={styles.near_input_text} >Роды</p>
                                <Field className={styles.number_select} as="select" id="number" name="birthN">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                </Field>
                            </label>
                            <label className={styles.label_flex}>
                                <p className={styles.near_input_text}>в сроки</p>
                                <Field className={styles.born_data_input} name="gestAge" type="text" />
                            </label>
                        </div>
                        <div className={styles.date_block_short}>
                            <label className={styles.label_flex}>
                                <p className={styles.near_input_text}>1 период</p>
                                <Field className={styles.born_data_input} name="period1" type="text" />
                                <p className={styles.near_input_text}>2 период</p>
                                <Field className={styles.born_data_input} name="period2" type="text" />
                            </label>
                        </div>
                        <div className={styles.date_block_short}>
                            <label className={styles.label_flex}>
                                <p className={styles.near_input_text}>Безводный период</p>
                                <Field className={styles.born_data_input} name="amnAbsPeriod" type="text" />
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
                                    <Field type="radio" className={styles.radio_input} name="picked" value={ESex.MALE} />
                                    Мужской
                                </label>
                                <label className={styles.radio_label_flex}>
                                    <Field type="radio" className={styles.radio_input} name="picked" value={ESex.FEMALE} />
                                    Женский
                                </label>
                            </div>
                        </div>
                        <div className={styles.date_block_tiny}>
                            <label className={styles.label_flex}>
                                <p className={styles.near_input_text}>Масса при рождении</p>
                                <Field className={styles.born_data_input} name="birthWeight" type="number" />
                            </label>
                        </div>
                        <div className={styles.date_block_tiny}>
                            <label className={styles.label_flex}>
                                <p className={styles.near_input_text}>Рост при рождении</p>
                                <Field className={styles.born_data_input} name="birthHeight" type="number" />
                            </label>
                        </div>
                        <div className={styles.date_block}>
                            <label className={styles.label_flex}>
                                <p className={styles.near_input_text}>Состояние ребенка при рождении</p>
                                <Field className={styles.born_data_input} name="newbornState" type="text" />
                            </label>
                        </div>
                        <div className={styles.date_block_tiny}>
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
                                <label className={styles.radio_label_flex} id="yes">
                                    <Field className={styles.radio_input} type="radio" name="breastTry" value="true" />
                                    К груди приложен
                                </label>
                                <label className={styles.radio_label_flex} id="no">
                                    <Field className={styles.radio_input} type="radio" name="breastTry" value="false" />
                                    К груди не приложен
                                </label>
                            </div>
                        </div>
                        <div className={styles.date_block}>
                            <div className={styles.radio_btns_feed}>
                                <p className={styles.near_input_text}>Вскармливание</p>
                                <label className={styles.radio_label_flex}>
                                    <Field className={styles.radio_input} type="radio" name="feeding" value="грудное" />
                                    исключительно грудное
                                </label>
                                <label className={styles.radio_label_flex}>
                                    <Field className={styles.radio_input} type="radio" name="feeding" value="смешанное" />
                                    смешанное
                                </label>
                                <label className={styles.radio_label_flex}>
                                    <Field className={styles.radio_input} type="radio" name="feeding" value="искусственное" />
                                    искусственное
                                </label>
                            </div>
                        </div>
                        <div className={styles.date_block}>
                            <label className={styles.label_flex}>
                                <p className={styles.near_input_text}>Причина вскармливания</p>
                                <Field className={styles.born_data_input} name="feeding" type="text" />
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
                        <p className={styles.near_input_text}>При выписке состояние:</p>
                        <div className={styles.right_block}>
                            <div className={`${styles.date_block_short} ${styles.no_margin}`}>
                                <label className={styles.label_flex}>
                                    <p className={styles.near_input_text}>глаза</p>
                                    <Field className={styles.born_data_input} name="eyes" type="text" />
                                </label>
                            </div>
                            <div className={`${styles.date_block_short} ${styles.no_margin}`}>
                                <label className={styles.label_flex}>
                                    <p className={styles.near_input_text}>физиологические рефлексы</p>
                                    <Field className={styles.born_data_input} name="reflexes" type="text" />
                                </label>
                            </div>
                            <div className={`${styles.date_block_short} ${styles.no_margin}`}>
                                <label className={styles.label_flex}>
                                    <p className={styles.near_input_text}>цвет кожи</p>
                                    <Field className={styles.born_data_input} name="skin" type="text" />
                                </label>
                                <label className={styles.label_flex}>
                                    <p className={styles.near_input_text}>по органам</p>
                                    <Field className={styles.born_data_input} name="organs" type="text" />
                                </label>
                            </div>
                            <div className={`${styles.date_block_short} ${styles.no_margin}`}>
                                <label className={styles.label_flex}>
                                    <p className={styles.near_input_text}>стул</p>
                                    <Field className={styles.born_data_input} name="stool" type="text" />
                                </label>
                                <label className={styles.label_flex}>
                                    <p className={styles.near_input_text}>диурез</p>
                                    <Field className={styles.born_data_input} name="diuresis" type="text" />
                                </label>
                            </div>
                            <div className={`${styles.date_block_short} ${styles.no_margin}`}>
                                <label className={styles.label_flex}>
                                    <p className={styles.near_input_text}>пуповинный остаток</p>
                                    <Field className={styles.born_data_input} name="umbilicalCord" type="text" />
                                </label>
                            </div>
                        </div>

                        <div className={styles.date_block}>
                            <label className={styles.label_flex_long}>
                                <p className={styles.near_input_text}>Особые заменчания</p>
                                <Field className={styles.born_data_input} name="notes" type="text" />
                            </label>
                        </div>
                        <div className={styles.date_block}>
                            <label className={styles.label_flex_long}>
                                <p className={styles.near_input_text}>Заключение составил</p>
                                <Field className={styles.born_data_input} name="examedBy" type="text" />
                            </label>
                        </div>
                        {touched.pregnancyDescript && errors.pregnancyDescript ? <p>{errors.pregnancyDescript}</p> : <p></p>}
                        <div className={styles.flex_end}>
                            <Btn disabled={!isValid} title="Сохранить" onclick={handleSubmit} size={EBtnSize.small} types={EBtnTypes.submit} btnClass={EBtnClass.dark_active} />
                        </div>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};