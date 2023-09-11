import { FunctionComponent, MouseEventHandler, ReactElement } from "react";
import styles from "../../../../containers/AdminPage/AdminTables/AllTables.module.css";
import IconBtn from "../../../UI/IconBtn/IconBtn";
import ISpecExamsRowProps from "./ISpecExamsRowProps";

const SpecExamRow: FunctionComponent<ISpecExamsRowProps> = (props): ReactElement => {
    return (
        <tr className={styles.table_tr}>
            <td className={styles.table_td_right}>{props.specExam.specialist}</td>
            <td className={styles.table_td_right}>{props.specExam.name}</td>
            <td className={styles.table_td_right}>{props.specExam.date && new Date(props.specExam.date).toLocaleDateString()}</td>
            <td className={styles.table_td_right}>{props.specExam.conclusion}</td>
            <td className={styles.table_td_right}>{props.specExam.recommend}</td>
            <td className={styles.table_td}><IconBtn onclick={props.showModalDeleteExam as MouseEventHandler<HTMLButtonElement>} btnClass={"delete_btn"} /></td>
        </tr>
    );
};

export default SpecExamRow;