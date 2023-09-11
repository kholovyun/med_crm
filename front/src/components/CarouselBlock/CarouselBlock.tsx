import { useState, useRef, FormEvent, ChangeEventHandler, FunctionComponent, ReactElement } from "react";
import styles from "./CarouselBlock.module.css";
import AliceCarousel from "react-alice-carousel";
import "./Carousel.css";
import "react-alice-carousel/lib/alice-carousel.css";
import Modal from "../UI/Modal/Modal";
import defaultDiplomaImg from "../../assets/img/default-diploma-photo.svg";
import IDiplomaCreateDto from "../../interfaces/IDiploma/IDiplomaCreateDto";
import ICarouselBlockProps from "./ICarouselBlockProps";
import errorHandler from "../../helpers/errorHandler";
import { fileToDataString } from "../../helpers/fileToDataString";
import IDocumentCreateDto from "../../interfaces/IDocument/IDocumentCreateDto";
import AccessControl from "../../permissionRoutes/AccessControl";
import successHandler from "../../helpers/successHandler";
import IconBtn from "../UI/IconBtn/IconBtn";
import Btn from "../UI/Btn/Btn";
import { EBtnSize } from "../../enums/EBtnSize";
import { EBtnClass } from "../../enums/EBtnClass";

const CarouselBlock: FunctionComponent<ICarouselBlockProps> = (props): ReactElement => {
    const {id, useGetElementsQuery, role, initialState, carouselTitle, useCreateMutation, useDeleteMuatation, directoryName, noElementsText, addElementText} = props;
    const [showModal, setShowModal] = useState(false);
    const { data: elements } = useGetElementsQuery(id);
    const openModal = () => {
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };

    const [showFullImageModal, setShowFullImageModal] = useState(false);
    const openFullImageModal = () => {
        setShowFullImageModal(true);
    };

    const closeFullImageModal = () => {
        deletionBlockCancel();
        setShowFullImageModal(false);
        setClickedImageUrl("");
        setClickedImageId("");
    };
    
    const [createElement, {isError, isSuccess, error}] = useCreateMutation();
    const [deleteElement, {isError: isErrorDelete, isSuccess: isSuccessDelete, error: errorDelete}] = useDeleteMuatation();
    errorHandler(isErrorDelete, errorDelete);
    errorHandler(isError, error);
    successHandler(isSuccess, ("Документ добавлен"));
    successHandler(isSuccessDelete,("Документ удален"), closeFullImageModal);
    
    const [inputValues, setInputValues] = useState<IDiplomaCreateDto | IDocumentCreateDto>(initialState);
    const [previewImageSrc, setPreviewImageSrc] = useState<string>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const [clickedImageUrl, setClickedImageUrl] = useState<string>("");
    const [clickedImageId, setClickedImageId] = useState<string>("");

    const handleClick = (url: string, id: string) => {
        openFullImageModal();
        setClickedImageUrl(url);
        setClickedImageId(id);
    };

    const items = (elements && elements.map(el => {
        return  <div className={styles.carouselItem} key={el.id} onClick={() => {handleClick(el.url, el.id);}}>
            <img 
                className={styles.diplomaImg}
                onError={(e) => { e.currentTarget.src = defaultDiplomaImg;}}
                src={el?.url !== "" ? `${import.meta.env.VITE_BASE_URL}/uploads/${directoryName}/${el?.url}` : defaultDiplomaImg} alt={"document"} />
        </div>; 
    }));

    const handleChangeFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if(file && /\.(jpg|jpeg|png)$/i.test(file.name) && file.size <= 5242880) {
            try {
                setPreviewImageSrc(await fileToDataString(file));
                setFileName(e.target.files && e.target.files[0] ? e.target.files[0].name : "");
                setInputValues(prevState => {
                    return {
                        ...prevState,
                        url: e.target.files ? e.target.files[0] : undefined
                    };
                }); 
            } catch (e) {
                console.error(e);
            }
        } else if (file.size > 5242880) {
            alert("Слишком большой размер файла");
        } else {
            alert("Пожалуйста выберите соответсвующий формат файла(jpg, jpeg, png)");
        }
    };

    const cancelFileHandler = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        setFileName("");
        closeModal();
    };

    const [fileName, setFileName] = useState<string>("");

    const uploadNewDiploma = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(inputValues).forEach(entry => {
            const [key, value] = entry;
            formData.append(key, value);
        });
        await createElement(formData);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        setFileName("");
        setInputValues(initialState);
        closeModal();
    };
    
    const deleteButtonHandler = (id: string) => {
        deleteElement(id);
        setClickedImageId("");
        setClickedImageUrl("");
    };

    const [deletionBlock, setDeletionBlock] = useState(false);

    const deletionBlockCancel = () => {
        setDeletionBlock(false);
    };

    return (
        <>         
            <Modal show={showFullImageModal} close={closeFullImageModal}>
                <div className={styles.fullImage}>
                    <div className={styles.fullImageTop}>
                        <div onClick={() => setDeletionBlock(true)} className={styles.deleteBtn}/>
                        <IconBtn
                            btnClass={"x_btn"}
                            onclick={closeFullImageModal}
                        />
                    </div>
                    <div className={styles.fullImageBottom}>
                        <div className={styles.deletionBlock} style={{display: deletionBlock ? "flex" : "none"}}>
                            <p>Удалить документ?</p>
                            <div className={styles.deletionBtns}>
                                <Btn
                                    size={EBtnSize.tiny}
                                    title={"Отмена"}
                                    btnClass={EBtnClass.white_active}
                                    onclick={deletionBlockCancel}
                                />
                                <Btn
                                    size={EBtnSize.tiny}
                                    title={"Да"}
                                    btnClass={EBtnClass.dark_active}
                                    onclick={() => deleteButtonHandler(clickedImageId)}
                                />
                            </div>
                        </div>
                        <img
                            onError={(e) => { e.currentTarget.src = defaultDiplomaImg;}}
                            src={clickedImageUrl !== "" ? `${import.meta.env.VITE_BASE_URL}/uploads/${directoryName}/${clickedImageUrl}` : defaultDiplomaImg} alt={"diploma"} />
                    </div>
                </div>
            </Modal>
            <Modal show={showModal} close={closeModal}>
                <div className={styles.diplomaUploaderBox}>
                    {fileName !== "" && <div className={styles.previewBox}>
                        <img src={previewImageSrc} alt="diploma" />
                    </div>}
                    <label className={styles.inputLabel}>
                        <input className={styles.diplomaInput} type="file" onChange={handleChangeFile} ref={fileInputRef}/> 
                        <p className={styles.diplomaBtn}>{"Выбрать файл"}</p>
                    </label>
                    {fileName !== "" ? <span className={styles.fileName}>{fileName}</span> : null}
                    <div className={styles.diplomaButtons}>
                        <button className={styles.diplomaBtn}
                            onClick={cancelFileHandler}>Отмена</button> 
                        <button 
                            className={styles.diplomaBtn}
                            disabled={fileName !== "" ? false : true}
                            onClick={uploadNewDiploma}>Установить</button> 
                    </div>   
                </div>
            </Modal>

            <div className={styles.carouselBlock}>
                <p className={styles.carouselTitle}>{carouselTitle}</p>
                {elements && elements.length === 0 ? <p className={styles.noElementsText}>{noElementsText}</p>
                    :
                    <AliceCarousel 
                        responsive={{0: {
                            items: 1,
                            itemsFit: "fill",
                        }, 420: {
                            items: 2,
                            itemsFit: "fill",
                        }, 700: {
                            items: 3,
                            itemsFit: "contain",
                        }, 900: {
                            items: 4,
                            itemsFit: "contain",
                        }}} 
                    
                        renderKey={1}
                        disableDotsControls 
                        items={items}
                    />
                }
                <AccessControl allowedRoles={[role]}>
                    <div className={styles.addElement}>
                        <div className={styles.addBtn} onClick={openModal}>
                        +
                        </div>
                        <p className={styles.addTitle}>{addElementText}</p>
                    </div>
                </AccessControl>      
            </div> 
        </>
    );
};

export default CarouselBlock;