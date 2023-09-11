import { FunctionComponent, ReactElement, MouseEvent, useState, useEffect } from "react";
import IChatMessagesProps from "./IChatMessagesProps";
import { useDeleteMessageMutation, useGetMessagesByQuestionQuery } from "../../app/services/messages";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IErrorResponse } from "../../interfaces/IUser/IErrorResponse";
import { IMessage } from "../../interfaces/IUser/IMessage";
import { toast } from "react-toastify";
import Loader from "../UI/Loader/Loader";
import styles from "./ChatMessages.module.css";
import ChatMessage from "./ChatMessage/ChatMessage";
import AddChatMessageFrom from "./AddChatMessageFrom/AddChatMessageFrom";
import AccessControl from "../../permissionRoutes/AccessControl";
import { ERoles } from "../../enums/ERoles";
import Modal from "../UI/Modal/Modal";
import IChatMessageWithUserGetDto from "../../interfaces/IChatMessages/IChatMessageWithUserGetDto";
import Btn from "../UI/Btn/Btn";
import { EBtnSize } from "../../enums/EBtnSize";
import { EBtnClass } from "../../enums/EBtnClass";
import stylesAdminTables from "../../containers/AdminPage/AdminTables/AllTables.module.css";

export const ChatMessages: FunctionComponent<IChatMessagesProps> = (props: IChatMessagesProps): ReactElement => {
    const {
        data: messages,
        error: getMessagesError,
        isError: isMessagesGetError,
        isLoading
    } = useGetMessagesByQuestionQuery({ id: props.questionId }, { pollingInterval: 30000 });

    const [deleteIt, { error: deleteMessageError, isError: isDeleteMessageError }] = useDeleteMessageMutation();
    const [stateMessage, setStateMessage] = useState<IChatMessageWithUserGetDto | null>(null);
    const [showModal, setShowModal] = useState(false);

    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message}`);
    };

    const clickDelete = (e: MouseEvent<HTMLDivElement>, message: IChatMessageWithUserGetDto) => {
        e.stopPropagation();
        setShowModal(true);
        setStateMessage(message);
    };

    const deleteMessage = async () => {
        stateMessage && await deleteIt({ id: stateMessage.id });
        setShowModal(false);
        setStateMessage(null);
    };

    const modalCancelHandler = () => {
        setShowModal(false);
        setStateMessage(null);
    };

    useEffect(() => {
        isMessagesGetError && errorHandler(getMessagesError);
    }, [isMessagesGetError]);

    useEffect(() => {
        isDeleteMessageError && errorHandler(deleteMessageError);
    }, [isDeleteMessageError]);

    const scrollToLast = () => {
        const element = document.getElementById(`scrollHere_${props.questionId}`);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <div className={styles.list_container}>
                <Modal
                    show={showModal}
                    close={modalCancelHandler}>
                    <div className={stylesAdminTables.modal_flex_column}>
                        <div className={stylesAdminTables.title_box}>
                            <p className={stylesAdminTables.modal_title}>
                                Вы уверены, что хотите <span className={stylesAdminTables.violet}>удалить</span> сообщение?
                            </p>
                            <p className={styles.body_text}>{stateMessage && ` ${stateMessage.text}`}</p>
                        </div>
                        <div className={stylesAdminTables.modal_btn_group}>
                            <Btn
                                size={EBtnSize.tiny}
                                title={"Отмена"}
                                btnClass={EBtnClass.white_active}
                                onclick={modalCancelHandler}
                            />
                            <Btn
                                size={EBtnSize.tiny}
                                title={"Да"}
                                btnClass={EBtnClass.dark_active}
                                onclick={() => deleteMessage()}
                            />
                        </div>
                    </div>
                </Modal>
                {isLoading && <Loader />}
                {messages === undefined || !messages.length ?
                    <p>Соощений пока нет</p>
                    :
                    <div className={styles.messages_list_box}>
                        {messages && messages.map((m) => {
                            return (
                                <ChatMessage key={m.id}
                                    message={m}
                                    clickDelete={(e: MouseEvent<HTMLDivElement>) => clickDelete(e, m)}
                                />
                            );
                        })}
                        <p id={`scrollHere_${props.questionId}`}></p>
                    </div>
                }
            </div>
            <AccessControl allowedRoles={[ERoles.DOCTOR, ERoles.PARENT]}>
                <AddChatMessageFrom
                    questionId={props.questionId}
                    userId={props.userId}
                    scrollToLast={scrollToLast}
                />
            </AccessControl>
        </>

    );
};

export default ChatMessages;