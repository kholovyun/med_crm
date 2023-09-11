import styles from "./infoTextBoxTriple.module.css";
import {FC} from "react";
import {IBoxTriple} from "../../../../interfaces/IBoxes/IBoxTriple.ts";

export const InfoTextBoxTriple: FC<IBoxTriple> = (props) => {
    return (
        <div className={styles.cardBoxOneTriple}>
            <p className={styles.cardBoxDateText}>{props.day}</p>
            <p className={styles.cardBoxDateText}>{props.month}</p>
            <p className={styles.cardBoxDateText}>{props.year}</p>
        </div>
    );
};
