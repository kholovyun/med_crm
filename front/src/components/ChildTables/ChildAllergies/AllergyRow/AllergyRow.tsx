import { FunctionComponent, MouseEventHandler, ReactElement } from "react";
import IAllergyRowProps from "./IAllergyRowProps";
import styles from "../../../../containers/AdminPage/AdminTables/AllTables.module.css";
import IconBtn from "../../../UI/IconBtn/IconBtn";

const AllergyRow: FunctionComponent<IAllergyRowProps> = (props): ReactElement => {
    return (
        <tr className={styles.table_tr}>
            <td className={styles.table_td_right}>{props.allergy.type}</td>
            <td className={styles.table_td_right}>{props.allergy.symptom}</td>
            <td className={styles.table_td_right}>{props.allergy.factors}</td>
            <td className={styles.table_td}>
                <IconBtn onclick={props.showModalDeleteAllergy as MouseEventHandler<HTMLButtonElement>} btnClass={"delete_btn"} />
            </td>

        </tr>
    );
};

export default AllergyRow;