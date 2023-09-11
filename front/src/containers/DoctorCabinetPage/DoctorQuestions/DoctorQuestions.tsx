import { FC, ReactElement, useState, useEffect, ChangeEvent } from "react";
import styles from "./DoctorQuestions.module.css";
import { useGetQuestionsByDoctorIdQuery } from "../../../app/services/questions";
import { useGetChildrenForDoctorQuery } from "../../../app/services/children";
import IChildGetDto from "../../../interfaces/IChild/IChildGetDto";
import Question from "../../../components/ChildQuestions/Question/Question";
import IQuestionGetDto from "../../../interfaces/IQuestion/IQuestionGetDto";

interface IDoctorQuestionsProps {
    id: string
}

const DoctorQuestions: FC<IDoctorQuestionsProps> = ({id}): ReactElement => {
    const [questionsList, setQuestionsList] = useState(false);
    const showQuestionList = (): void => {
        setQuestionsList(!questionsList);
    };
    const {data: questions, isSuccess: isSuccessGetQuestions} = useGetQuestionsByDoctorIdQuery(id);
    const {data: childrenData, isSuccess} = useGetChildrenForDoctorQuery(id);

    const [children, setChildren] = useState<{ [key: string]: IChildGetDto } >({});

    const transformData = () => {
        const transformedData: { [key: string]: IChildGetDto } = childrenData!.reduce((acc, obj) => {
            acc[obj.id] = obj;
            return acc;
        }, {} as { [key: string]: IChildGetDto });
        setChildren(transformedData);
    };

    useEffect(() => {
        isSuccess && transformData();
    }, [isSuccess]);

    useEffect(() => {
        isSuccessGetQuestions && setFiltredQuestions(questions);
    }, [isSuccessGetQuestions]);

    const [filtredQuestion, setFiltredQuestions] = useState<IQuestionGetDto[]>([]);

    const selectHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
        if (questions) {
            if (e.target.value === "all") {
                setFiltredQuestions(questions);
                return;
            }
            const filtredData: IQuestionGetDto[] = questions.filter((q) => q.childId === e.target.value);
            setFiltredQuestions(filtredData);
        }
    };

    return (
        <div className={styles.questionsBlock}>
            <div className={styles.button} onClick={showQuestionList}>
                <p>Вопросы</p>
                <div className={`${styles.arrow} ${questionsList && styles.arrowUp}`}/>
            </div>
            {questionsList && 
            
            <div className={styles.group_row}>
                <label htmlFor={"doctor"} className={styles.label_text}>Пациенты</label>
                <div className={styles.input_flex_column}>
                    <div className={styles.tiny_select_wraper}>
                        <select className={styles.tiny_select} id={"doctor"} name="doctor" 
                            onChange={selectHandler}
                        >
                            <option className={styles.custom_option} value={"all"}>
                                Все
                            </option>
                            {childrenData && childrenData.map((child) => {
                                return (
                                    <option key={child.id} className={styles.custom_option} value={child.id}>
                                        {child.surname}{" "}{child.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
            </div>}
            {questionsList && <div className={styles.questionsList}>
                {filtredQuestion && filtredQuestion?.map((q) => {
                    return <Question 
                        doctorId={id}
                        childData={children[(q.childId)]}
                        question={q}
                        key={q.id}
                    />;
                })}
            </div>}
        </div>
    );
};

export default DoctorQuestions;