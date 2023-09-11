import { FunctionComponent, ReactElement, useRef, useState } from "react";
import styles from "./Recommendation.module.css";
import IRecommendationProps from "./IRecommendationProps";
import Modal from "../../../../components/UI/Modal/Modal";
import AccessControl from "../../../../permissionRoutes/AccessControl";
import { ERoles } from "../../../../enums/ERoles";
import { EBtnSize } from "../../../../enums/EBtnSize";
import { EBtnClass } from "../../../../enums/EBtnClass";
import Btn from "../../../../components/UI/Btn/Btn";
import defaultImg from "../../../../assets/img/default-any-image.svg";
import { Formik, Form, Field } from "formik";
import { validationSchemaRecommendation } from "../../../../schemas/validationSchemaRecommendation";
import InputFileForMessage from "../../../../components/ChatMessages/AddChatMessageFrom/InputFileForMessage/InputFileForMessage";
import IconBtn from "../../../../components/UI/IconBtn/IconBtn";
import { EBtnTypes } from "../../../../enums/EBtnTypes";
import { fileToDataString } from "../../../../helpers/fileToDataString";
import { useEditRecommendationMutation } from "../../../../app/services/recommendations";
import successHandler from "../../../../helpers/successHandler";
import errorHandler from "../../../../helpers/errorHandler";
import IRecommendationCreateDto from "../../../../interfaces/IRecommendation/IRecommendationCreateDto";

const Recommendation: FunctionComponent<IRecommendationProps> = ({ recommendation, deleteRecommendation }): ReactElement => {
    const [updateRecommendation, {isSuccess, isError, error}] = useEditRecommendationMutation();
    
    successHandler(isSuccess, "Рекомендация изменена", () => setEditRecommendation(false));
    errorHandler(isError, error);

    const [showModal, setShowModal] = useState(false);
    const closeModal = () => {
        setShowModal(false);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const [showFullImageModal, setShowFullImageModal] = useState(false);

    const openFullImageModal = () => {
        setShowFullImageModal(true);
    };
    const closeFullImageModal = () => {
        setShowFullImageModal(false);
        
    };
    const fileInput = useRef<HTMLInputElement>(null);
    const [previewImageSrc, setPreviewImageSrc] = useState<string>("");
    const [fileName, setFileName] = useState<string>(String(recommendation.url));

    const resetFileInput = () => {
        if (fileInput.current) {
            setFileName("");
            fileInput.current.value = "";
        }
    };

    const handleSubmit = async (id: string, values: IRecommendationCreateDto) => {
        const formData = new FormData();
        Object.entries(values).forEach(entry => {
            const [key, value] = entry;
            formData.append(key, value);
        });
        await updateRecommendation({id: id, recommendation: formData});
    };
    
    const [editRecommendation, setEditRecommendation] = useState(false);

    return (
        <>
            <Modal show={showFullImageModal} close={closeFullImageModal}>
                <div className={styles.fullImage}>
                    <img
                        onError={(e) => { e.currentTarget.src = defaultImg;}}
                        src={recommendation.url !== "" ? `${import.meta.env.VITE_BASE_URL}/uploads/docRecommends/${recommendation.url}` : defaultImg} alt={"recommendationImg"} />
                </div>
            </Modal>
            <Modal
                show={showModal}
                close={closeModal}>
                <div className={styles.modal_flex_column}>
                    <div className={styles.title_box}>
                        <p className={styles.modal_title}>
                            Вы уверены, что хотите <span className={styles.violet}>удалить</span> эту рекомендацию?
                        </p>
                    </div>
                    <div className={styles.modal_btn_group}>
                        <Btn
                            size={EBtnSize.tiny}
                            title={"Отмена"}
                            btnClass={EBtnClass.white_active}
                            onclick={closeModal}
                        />
                        <Btn
                            size={EBtnSize.tiny}
                            title={"Да"}
                            btnClass={EBtnClass.dark_active}
                            onclick={deleteRecommendation}
                        />
                    </div>
                </div>
            </Modal>
            <Formik
                initialValues={{
                    doctorId: recommendation.doctorId || "",
                    text: recommendation.text,
                    url: recommendation.url
                }}
                    
                onSubmit={async (values) => {
                    await handleSubmit(recommendation.id, values);
                }}
                validateOnBlur
                validationSchema={validationSchemaRecommendation} 
            >
                {({ isValid, errors, touched, handleSubmit, setFieldValue, values, resetForm }) => (
                    <div className={styles.recommendation}>
                        <div className={styles.recommendationTop}>
                            <b className={styles.recommendationDatetime}>{new Date(recommendation.createdAt).toLocaleDateString()}{" "}</b>
                            <AccessControl allowedRoles={[ERoles.DOCTOR]}>
                                <div className={styles.buttons}>
                                    {!editRecommendation && <div className={styles.editBtn} onClick={() => setEditRecommendation(true)}></div>}
                                    {editRecommendation && <div className={styles.deleteBtn} onClick={openModal}></div>}
                                </div>
                            </AccessControl>
                        </div>
                        <Form className={styles.recommendationBottom}>
                            {touched.text && errors.text ? <p className={styles.errorText}>{errors.text}</p> : <p></p>}
                            <div className={styles.rerecommendationFormTop}>
                                {fileName !== "" ? <div className={styles.recommendationImg} onClick={openFullImageModal}>
                                    <img 
                                        onError={(e) => { e.currentTarget.src = defaultImg;}}
                                        src={previewImageSrc === "" ? `${import.meta.env.VITE_BASE_URL}/uploads/docRecommends/${values.url}` : previewImageSrc} alt={"recommendationImg"}
                                    />
                                    {editRecommendation && <div className={styles.removeImage}>
                                        <IconBtn
                                            btnClass={"x_btn"}
                                            onclick={(e) => {
                                                e.stopPropagation();
                                                resetFileInput();
                                                setFieldValue("url", "");
                                            }}
                                        />
                                    </div>}
                                </div> : null}
                                <Field 
                                    as={"textarea"} 
                                    name="text" 
                                    className={styles.textarea} 
                                    placeholder={"Написать рекомендацию"} 
                                    maxLength={250}
                                    disabled={!editRecommendation}
                                />
                               
                                {editRecommendation && <span className={styles.countOftext}>{values.text.length}/250</span>}
                            </div>
                            {editRecommendation && <div className={styles.recommendationFormBottom}>
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
                                    iconClass={values.url === "" ? "file_icon" : "reload_image_icon"}
                                    tooltipLabel={values.url === "" ? "Загрузить изображение" : "Выбрать другой файл"}
                                />
                                <div className={styles.publicationBtn}>
                                    <Btn disabled={!isValid} size={EBtnSize.small} onclick={handleSubmit} types={EBtnTypes.submit} title="Сохранить" />
                                    <Btn 
                                        size={EBtnSize.small} 
                                        onclick={() => {
                                            setFileName(String(recommendation.url));
                                            resetForm();
                                            setEditRecommendation(false);
                                            setPreviewImageSrc("");
                                        }} 
                                        types={EBtnTypes.reset} title="Отмена" />
                                </div>
                            </div>}
                    
                        </Form>
                    </div>
                )}
            </Formik>
        </>
    );
};

export default Recommendation;