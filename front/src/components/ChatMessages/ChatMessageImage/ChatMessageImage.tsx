import { FunctionComponent, ReactElement, MouseEvent, useState } from "react";
import styles from "../ChatMessage/ChatMessage.module.css";
import IChatMessageImageProps from "./IChatMessageImageProps";
import defaultPhoto from "../../../assets/img/default-any-image.svg";
import IconBtn from "../../UI/IconBtn/IconBtn";

export const ChatMessageImage: FunctionComponent<IChatMessageImageProps> = (props: IChatMessageImageProps): ReactElement => {
    const [showModal, setShowModal] = useState(false);

    const clickHandler = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setShowModal(true);
    };

    const closeModal = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setShowModal(false);
    };

    return (
        <>
            {showModal ?
                <div className={styles.image_modal_bg}>
                    <>
                        <div className={styles.image_modal_column}>
                            <div className={styles.modal_row}>
                                <IconBtn
                                    btnClass={"x_btn"}
                                    onclick={closeModal}
                                />

                            </div>
                            {props.url !== "" ?
                                <img className={styles.modal_full_image}
                                    onError={(e) => {
                                        e.currentTarget.src = defaultPhoto;
                                    }}
                                    src={`${import.meta.env.VITE_BASE_URL}/uploads/messagesFiles/${props.url}`} alt={"изображение"}
                                />
                                :
                                <img className={styles.modal_full_image} src={defaultPhoto} alt={"изображение"}
                                />
                            }
                        </div>
                    </>
                </div>
                : null
            }
            <div className={styles.image_box} onClick={clickHandler}>
                <img
                    className={styles.message_img}
                    onError={(e) => {
                        e.currentTarget.src = defaultPhoto;
                    }}
                    src={`${import.meta.env.VITE_BASE_URL}/uploads/messagesFiles/${props.url}`}
                    alt={"изображение"}
                />
            </div>
        </>
    );
};

export default ChatMessageImage;