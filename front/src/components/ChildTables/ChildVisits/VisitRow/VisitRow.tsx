import { FunctionComponent, MouseEventHandler, ReactElement } from "react";
import styles from "../../../../containers/AdminPage/AdminTables/AllTables.module.css";
import IVisitRowProps from "./IVisitRowProps";
import { useAppSelector } from "../../../../app/hooks";
import { ERoles } from "../../../../enums/ERoles";
import IconBtn from "../../../UI/IconBtn/IconBtn";

const VisitsRow: FunctionComponent<IVisitRowProps> = (props): ReactElement => {
    const { user } = useAppSelector(state => state.auth);
    return (
        <tr className={styles.table_tr}>
            <td className={styles.table_td_right}>{new Date(props.visit.date).toLocaleDateString()}</td>
            <td className={styles.table_td_right}>{props.visit.place}</td>
            <td className={styles.table_td_right}>{props.visit.reason}</td>
            <td className={styles.table_td_right}>{props.visit.clinicData}</td>
            <td className={styles.table_td_right}>{props.visit.conclusion}</td>
            <td className={user?.role === ERoles.DOCTOR ? styles.table_td_right: styles.table_td}>{props.visit.appointment}</td>
            {user?.role === ERoles.DOCTOR ? <td className={styles.table_td}><IconBtn onclick={props.showModaldeleteVisit as MouseEventHandler<HTMLButtonElement>} btnClass={"delete_btn"} /></td> : null}
        </tr>
    );
};

export default VisitsRow;