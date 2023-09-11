import { FunctionComponent, ReactElement, useState, useRef } from "react";
import styles from "./DoctorRecommendations.module.css";
import IDoctorRecommendationsProps from "./IDoctorRecommendationsProps";
import { Field, Formik, Form } from "formik";
import Btn from "../../../components/UI/Btn/Btn";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnTypes } from "../../../enums/EBtnTypes";
import { useCreateRecommendationMutation, useDeleteRecommendationMutation, useGetRecommendationsByDoctorQuery } from "../../../app/services/recommendations";
import Recommendation from "./Recommendation/Recommendation";
import { validationSchemaRecommendation } from "../../../schemas/validationSchemaRecommendation";
import AccessControl from "../../../permissionRoutes/AccessControl";
import { ERoles } from "../../../enums/ERoles";
import errorHandler  from "../../../helpers/errorHandler";
import successHandler from "../../../helpers/successHandler";
import IRecommendationCreateDto from "../../../interfaces/IRecommendation/IRecommendationCreateDto";
import InputFileForMessage from "../../../components/ChatMessages/AddChatMessageFrom/InputFileForMessage/InputFileForMessage";
import { fileToDataString } from "../../../helpers/fileToDataString";
import IconBtn from "../../../components/UI/IconBtn/IconBtn";

const DoctorRecommendations: FunctionComponent<IDoctorRecommendationsProps> = ({ doctorId, role }): ReactElement => {
    const {data: recommendations} = useGetRecommendationsByDoctorQuery(doctorId);

    const [createRecommendation, {
        isSuccess: isSuccessCreateRecommendation,
        isError: isErrorCreateRecommendation,
        error: errorCreateRecommendation
    }] = useCreateRecommendationMutation();

    const [deleteRecommendation, {
        isSuccess: isSuccessDeleteRecommendation,
        isError: isErrorDeleteRecommendation,
        error: errorDeleteRecommendation
    }] = useDeleteRecommendationMutation();

    successHandler(isSuccessDeleteRecommendation, "Рекомендация удалена");
    successHandler(isSuccessCreateRecommendation, "Новая рекомендация создана");
    errorHandler(isErrorCreateRecommendation, errorCreateRecommendation);
    errorHandler(isErrorDeleteRecommendation, errorDeleteRecommendation);

    const [showList, setShowList] = useState(false);
    const handleShowList = () => {
        setShowList(!showList);
    };

    const handleSubmit = async (values: IRecommendationCreateDto) => {
        const formData = new FormData();
        Object.entries(values).forEach(entry => {
            const [key, value] = entry;
            formData.append(key, value);
        });
        await createRecommendation(formData);
    };

    const fileInput = useRef<HTMLInputElement>(null);
    const [previewImageSrc, setPreviewImageSrc] = useState<string>();
    const [fileName, setFileName] = useState<string>("");

    const resetFileInput = () => {
        if (fileInput.current) {
            setFileName("");
            fileInput.current.value = "";
        }
    };

    return (
        <div className={styles.recommendationBlock}>
            <AccessControl allowedRoles={[ERoles.DOCTOR]}>
                <Formik
                    initialValues={{
                        doctorId: doctorId || "",
                        text: "",
                        url: undefined
                    }}
                    
                    onSubmit={async (values, {resetForm}) => {
                        await handleSubmit(values);
                        resetForm();
                        resetFileInput();
                    }}
                    validateOnBlur
                    validationSchema={validationSchemaRecommendation} 
                >
                    {({ isValid, errors, touched, handleSubmit, setFieldValue, values }) => (
                        <Form className={styles.recommendationForm}>
                            {touched.text && errors.text ? <p className={styles.errorText}>{errors.text}</p> : <p></p>}
                            <div className={styles.rerecommendationFormTop}>
                                {fileName !== "" && <div className={styles.previewBox}>
                                    <img src={previewImageSrc} alt="recommendation" />
                                    <div className={styles.removeImage}>
                                        <IconBtn
                                            btnClass={"x_btn"}
                                            onclick={() => {
                                                setFieldValue("url", undefined);
                                                resetFileInput();
                                            }}
                                        />
                                    </div>
                                </div>}
                                <Field 
                                    as={"textarea"} 
                                    type="text" name="text" 
                                    className={styles.textarea} 
                                    placeholder={"Написать рекомендацию"} 
                                    maxLength={250}
                                />
                                <span className={styles.countOftext}>{values.text.length}/250</span>
                            </div>
                            <div className={styles.recommendationFormBottom}>
                                <InputFileForMessage 
                                    inputName={"url"}
                                    onChangeHandler={async (event: React.ChangeEvent<HTMLInputElement>) => {
                                        const file = event.currentTarget.files && event.currentTarget.files[0];
                                        if (!file) return;
                                        if(file && /\.(jpg|jpeg|png)$/i.test(file.name) && file.size <= 5242880) {
                                            try {
                                                setPreviewImageSrc(await fileToDataString(file));
                                                setFileName(event.target.files && event.target.files[0] ? event.target.files[0].name : "");
                                                setFieldValue("url", file);
                                            } catch (e) {
                                                console.error(e);
                                            }
                                        } else if (file.size > 5242880) {
                                            alert("Слишком большой размер файла");
                                        } else {
                                            alert("Пожалуйста выберите соответсвующий формат файла(jpg, jpeg, png)");
                                        }
                                    }}
                                    fileReference={fileInput}
                                    iconClass={values.url === undefined ? "file_icon" : "reload_image_icon"}
                                    tooltipLabel={values.url === undefined ? "Загрузить изображение" : "Выбрать другой файл"}
                                />
                                <div className={styles.publicationBtn}>
                                    <Btn disabled={!isValid} size={EBtnSize.small} onclick={handleSubmit} types={EBtnTypes.submit} title="Опубликовать" />
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </AccessControl>
            <div className={styles.recommendationsBottom}>
                <p>{role === ERoles.DOCTOR ? "Мои рекомендации" : "Рекомендации доктора"}</p>
                <button
                    className={styles.recommendationBtn}
                    onClick={handleShowList}
                ><div className={`${showList ? styles.arrowUp : styles.arrowDown}`}></div></button>
            </div>
            {showList ? <div className={styles.recommendationsList}>
                {!recommendations?.length && <p className={styles.noRecommendations} >Рекомендации еще нет</p>}
                {
                    recommendations && recommendations.map(el => {
                        return <Recommendation
                            key={el.id}
                            recommendation={el}
                            deleteRecommendation={() => deleteRecommendation(el.id)} />;
                    })
                }
            </div> : null}
        </div>
    );
};

export default DoctorRecommendations;