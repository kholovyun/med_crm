import { FunctionComponent, ReactElement, ChangeEvent, FormEvent, useRef, useState, useEffect } from "react";
import IAddChatMessageFormProps from "./IAddChatMessageFormProps";
import styles from "./AddChatMessageForm.module.css";
import { useCreateMessageMutation } from "../../../app/services/messages";
import { toast } from "react-toastify";
import IChatMessageCreateDto from "../../../interfaces/IChatMessages/IChatMessageCreateDto";
import IconBtn from "../../UI/IconBtn/IconBtn";
import Modal from "../../UI/Modal/Modal";
import Btn from "../../UI/Btn/Btn";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnClass } from "../../../enums/EBtnClass";
import { EBtnTypes } from "../../../enums/EBtnTypes";
import InputFileForMessage from "./InputFileForMessage/InputFileForMessage";
import errorHandler from "../../../helpers/errorHandler";

export const AddChatMessageFrom: FunctionComponent<IAddChatMessageFormProps> = (props: IAddChatMessageFormProps): ReactElement => {
    const fileInput = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string>("");
    const [count, setCount] = useState(0);
    const initStateValues: IChatMessageCreateDto = {
        text: "",
        url: undefined,
        questionId: props.questionId,
        authorId: props.userId
    };
    const [inputValues, setInputValues] = useState<IChatMessageCreateDto>(initStateValues);
    const [createMessage,
        { isError: isCreateMessageError,
            error: errorCreateMessage,
            isSuccess: isSuccesCreateMessage,
            reset: resetCreateMessage
        }
    ] = useCreateMessageMutation();

    const [showModalForm, setShowModalFrom] = useState<boolean>(false);
    const [image, setImage] = useState<File | undefined>();
    const [preview, setPreview] = useState<string | undefined>();

    useEffect(() => {
        if (inputValues.url && image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview((reader.result) as string);
            };
            reader.readAsDataURL(image);
        } else {
            setPreview(undefined);
        }
    }, [inputValues.url, image]);

    useEffect(() => {
        isSuccesCreateMessage && resetCreateMessage();
    }, [isSuccesCreateMessage]);

    errorHandler(isCreateMessageError, errorCreateMessage);

    const inputHandler = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setCount(e.target.value.length);
        setInputValues(prevState => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };

    const cancelFileHandler = () => {
        if (fileInput.current) {
            fileInput.current.value = "";
        }
        setFileName("");
        setInputValues(prevState => {
            return {
                ...prevState,
                url: undefined
            };
        });
        setShowModalFrom(false);
    };

    const inputFileHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            if (file.type.match("image.*") && /\.(jpg|jpeg|png|gif)$/i.test(file.name)) {
                setInputValues(prevState => {
                    return {
                        ...prevState,
                        url: e.target.files ? e.target.files[0] : undefined
                    };
                });
                setFileName(e.target.files && e.target.files[0] ? e.target.files[0].name : "");
                setImage(e.target.files ? e.target.files[0] : undefined);
            } else if (file.size > 5242880) {
                toast.error("Слишком большой размер файла");
            } else {
                toast.error("Пожалуйста выберите соответсвующий формат файла(jpg, jpeg, png, gif)");
            }
        }
        setShowModalFrom(true);
    };

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(inputValues).forEach(entry => {
            const [key, value] = entry;
            formData.append(key, value);
        });
        await createMessage({ newMessage: formData });
        setFileName("");
        setInputValues(initStateValues);
        setImage(undefined);
        setShowModalFrom(false);
        resetCreateMessage();
        props.scrollToLast();
    };

    return (
        <div className={styles.add_message_form_box}>
            <form onSubmit={submitHandler}>
                <div className={styles.textarea_row}>
                    <div className={styles.add_file_column}>
                        <InputFileForMessage
                            inputName={"url"}
                            onChangeHandler={inputFileHandler}
                            fileReference={fileInput}
                            iconClass={"file_icon"}
                            tooltipLabel={"Загрузить изображение"}
                        />
                        {image ? (
                            <Modal
                                show={showModalForm}
                                close={cancelFileHandler}>
                                <div className={styles.modal_flex_column}>
                                    <div className={styles.title_box}>
                                        <p className={styles.modal_title}>Отправить изображение</p>
                                        <div className={styles.reload_row}>
                                            <InputFileForMessage
                                                inputName={"url"}
                                                onChangeHandler={inputFileHandler}
                                                fileReference={fileInput}
                                                iconClass={"reload_image_icon"}
                                                tooltipLabel={"Выбрать другой файл"}
                                            />
                                            <p className={styles.file_name_text}>{fileName}</p>
                                        </div>
                                        <img className={styles.preview_img} src={preview} alt={"предварительный просмотр"} />
                                        <p className={styles.modal_title}>Текст сообщения</p>
                                        <textarea
                                            className={`${styles.add_message_textarea} ${styles.min_width}`}
                                            onChange={inputHandler}
                                            name={"text"}
                                            value={inputValues.text}
                                            maxLength={250}
                                        />
                                    </div>
                                    <div className={styles.modal_btn_group}>
                                        <Btn
                                            size={EBtnSize.tiny}
                                            title={"Отмена"}
                                            btnClass={EBtnClass.white_active}
                                            onclick={cancelFileHandler}
                                            types={EBtnTypes.reset}
                                        />
                                        <Btn
                                            size={EBtnSize.tiny}
                                            title={"Отправить"}
                                            btnClass={EBtnClass.dark_active}
                                            disabled={inputValues.text.trim() === "" && !image}
                                        />
                                    </div>
                                </div>
                            </Modal>
                        ) : null}
                    </div>
                    <textarea
                        className={styles.add_message_textarea}
                        onChange={inputHandler}
                        name={"text"}
                        value={inputValues.text}
                        maxLength={250}
                    />
                    <div className={styles.btn_column}>
                        <span className={styles.count_text}>{count}/250</span>
                        <IconBtn
                            disabled={inputValues.text.trim() === ""}
                            btnClass={"send_btn"}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddChatMessageFrom;