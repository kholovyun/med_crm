import { FunctionComponent, ReactElement, useState, MouseEvent } from "react";
import styles from "./Question.module.css";
import IQuestionProps from "./IQuestionProps";
import ChatMessages from "../../ChatMessages/ChatMessages";
import { useAppSelector } from "../../../app/hooks";
import { useLocation, useNavigate } from "react-router-dom";

const Question: FunctionComponent<IQuestionProps> = (props: IQuestionProps): ReactElement => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showFullQuestion, setShowFullQuestion] = useState(false);
    const { user } = useAppSelector(state => state.auth);

    const handleShowFullQuestion = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setShowFullQuestion(!showFullQuestion);
    };

    const navigateCabinetHandler = (e: MouseEvent<HTMLParagraphElement>, id: string) => {
        e.stopPropagation();
        navigate(`/child-cabinet/${id}`, { state: { doctorId: props.doctorId } });
    };

    return (
        <div className={styles.question_box}>
            {showFullQuestion && !location.pathname.startsWith("/child-cabinet/") ?
                <p className={styles.child_data_text}>
                    {new Date(props.question.createdAt).toLocaleDateString()}{" "}
                    <span className={styles.author} onClick={(e: MouseEvent<HTMLParagraphElement>) => navigateCabinetHandler(e, props.question.childId)}>{props.childData.surname} {props.childData.name}{" "}
                        {props.childData.patronim ? props.childData.patronim : null}</span>
                    :
                </p> : null}
            <div className={styles.question_top_row} onClick={handleShowFullQuestion}>
                <p className={styles.question_body_text}>
                    {showFullQuestion ? props.question.question :
                        props.question.question.length > 65 ?
                            `${props.question.question.slice(0, 65)}${"..."}`
                            :
                            props.question.question
                    }
                </p>
                <div className={`${styles.arrow_icon} ${showFullQuestion ? styles.arrow_up : styles.arrow_down}`}></div>
            </div>
            {showFullQuestion ?
                <div className={styles.fullQuestionBlock}>
                    {user && <ChatMessages questionId={props.question.id} userId={user.id} />}
                </div>
                : null}
        </div>
    );
};

export default Question;