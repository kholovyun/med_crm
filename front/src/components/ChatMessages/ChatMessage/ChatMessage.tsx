import { FunctionComponent, ReactElement, MouseEvent, useEffect, useState } from "react";
import IChatMessageProps from "./IChatMessageProps";
import styles from "./ChatMessage.module.css";
import { useAppSelector } from "../../../app/hooks";
import { ERoles } from "../../../enums/ERoles";
import ChatMessageImage from "../ChatMessageImage/ChatMessageImage";
import { useCreateMessageStatusMutation, useGetMessagesStatusByMessageQuery } from "../../../app/services/messagesStatus";
import { useNavigate } from "react-router-dom";

const ChatMessage: FunctionComponent<IChatMessageProps> = (props: IChatMessageProps): ReactElement => {
    const { user } = useAppSelector(state => state.auth);
    const { data: statusArray } = useGetMessagesStatusByMessageQuery({ id: props.message.id }, { pollingInterval: 30000 });
    const [createStatus, { reset }] = useCreateMessageStatusMutation();
    const [isMessageRead, setIsMessageRead] = useState<boolean | null>(null);

    const navigate = useNavigate();

    const navigateCabinetHandler = (e: MouseEvent<HTMLSpanElement>, id: string, role: ERoles) => {
        e.stopPropagation();
        if (role === ERoles.PARENT) {
            navigate(`/parent-cabinet/${id}`);
        }
        if (role === ERoles.DOCTOR) {
            navigate(`/doctor-cabinet/${id}`);
        }
    };

    const addStatus = async () => {
        if (user && [ERoles.DOCTOR, ERoles.PARENT].includes(user.role)) {
            await createStatus({
                newStatus: {
                    isRead: true,
                    messageId: props.message.id,
                    userId: user.id
                }
            });
        }
    };

    useEffect(() => {
        if (statusArray) {
            const result = statusArray.find(s => s.userId !== props.message.authorId && s.isRead === true);
            result ? setIsMessageRead(true) : setIsMessageRead(false);
        }
    }, [statusArray, user]);

    useEffect(() => {
        setTimeout(() => {
            const result = statusArray?.find(s => s.userId === props.message.authorId && s.isRead === true);
            if (user && [ERoles.DOCTOR, ERoles.PARENT].includes(user.role) && user.id !== props.message.authorId && !result) {
                addStatus().then(() => {
                    reset();
                });
            }
        }, 300);
    }, []);

    return (
        <div className={`${styles.message_card_box} ${user && user.id === props.message.authorId ? styles.justify_end : ""}`}>
            <div className={`${styles.message_card} ${user && user.id === props.message.authorId ? styles.my_message : styles.not_my_message}`}>
                <div className={styles.message_top}>
                    <p className={styles.author_row}>
                        {user && user.id !== props.message.authorId || user && [ERoles.SUPERADMIN, ERoles.ADMIN].includes(user.role) ?
                            <span className={styles.author} 
                                onClick={(e: MouseEvent<HTMLSpanElement>) => navigateCabinetHandler(e, props.message.authorId, props.message.users.role)}>
                                {props.message.users.surname} {props.message.users.name}{" "}
                                {props.message.users.patronim ? props.message.users.patronim : ""}
                            </span>
                            :
                            null
                        }
                        {new Date(props.message.createdAt).toLocaleDateString()}{" "}
                    </p>
                    {user && user.id === props.message.authorId ?
                        <div className={styles.delete_btn}
                            onClick={(e: MouseEvent<HTMLDivElement>) => props.clickDelete(e, props.message)}>
                        </div> :
                        null
                    }
                </div>
                <div className={styles.message_body_row}>
                    {props.message.url !== "" ?
                        <ChatMessageImage url={props.message.url} />
                        : null}
                    <p className={styles.body_text}>{props.message.text}</p>
                </div>
                <p className={`${styles.author_row} ${styles.align_self_end}`}>
                    {new Date(props.message.createdAt).toLocaleTimeString().slice(0, -3)}
                    {user && user.id === props.message.authorId ?
                        isMessageRead ?
                            <span className={`${styles.icon_for_read} ${styles.is_read}`}></span>
                            :
                            <span className={`${styles.icon_for_read} ${styles.is_not_read}`}></span>
                        : null
                    }
                </p>
            </div>
        </div>
    );
};

export default ChatMessage;