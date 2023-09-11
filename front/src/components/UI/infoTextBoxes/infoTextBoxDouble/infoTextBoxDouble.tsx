import {IBoxesDoubleText} from "../../../../interfaces/IBoxes/IBoxesDoubleText.ts";
import styles from "./infoTextBoxDouble.module.css";
import {FC} from "react";

export const InfoTextBoxDouble: FC<IBoxesDoubleText> = (props) => {
    return (
        <div className={styles.cardBoxGap}>
            <p className={styles.cardBoxText}>{props.textOne}</p>
            <p className={styles.cardBoxText}>{props.textTwo}</p>
        </div>
    );
};