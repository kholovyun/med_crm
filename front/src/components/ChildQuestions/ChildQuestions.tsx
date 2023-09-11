import { FunctionComponent, ReactElement } from "react";
import styles from "./ChildQuestions.module.css";
import IChildQuestionsProps from "./IChildQuestionsProps";
import Question from "./Question/Question";

const ChildQuestions: FunctionComponent<IChildQuestionsProps> = (props: IChildQuestionsProps): ReactElement => {

    return (
        <div className={styles.questionsList}>
            {props.questions && props.questions.length && props.questions?.map(q => {
                return (
                    <Question
                        childData={props.childData}
                        key={q.id}
                        question={q}
                    />
                );
            })}
        </div>
    );
};

export default ChildQuestions;