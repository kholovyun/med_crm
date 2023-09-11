import { FunctionComponent, MouseEventHandler, ReactElement } from "react";
import IVaccinationRowProps from "./IVaccinationRowProps";
import styles from "../../../../containers/AdminPage/AdminTables/AllTables.module.css";
import IconBtn from "../../../UI/IconBtn/IconBtn";

const VaccinationRow: FunctionComponent<IVaccinationRowProps> = (props): ReactElement => {
    return (
        <tr className={styles.table_tr}>
            <td className={styles.table_td_right}>{props.vaccination.infection}</td>
            <td className={styles.table_td_right}>{props.vaccination.vaccine}</td>
            <td className={styles.table_td_right}>{props.vaccination.age}</td>
            <td className={styles.table_td_right}>{props.vaccination.date && new Date(props.vaccination.date).toLocaleDateString()}</td>
            <td className={styles.table_td_right}>{props.vaccination.dose}</td>
            <td className={styles.table_td_right}>{props.vaccination.serial}</td>
            <td className={styles.table_td_right}>{props.vaccination.manufacturer}</td>
            <td className={styles.table_td_right}>{props.vaccination.reaction}</td>
            <td className={styles.table_td_right}>{props.vaccination.conterindication}</td>
            <td className={styles.table_td_right}>{props.vaccination.notes}</td>
            <td className={styles.table_td}><IconBtn onclick={props.showModaldeleteVaccination as MouseEventHandler<HTMLButtonElement>} btnClass={"delete_btn"} /></td>
        </tr>
    );
};

export default VaccinationRow;