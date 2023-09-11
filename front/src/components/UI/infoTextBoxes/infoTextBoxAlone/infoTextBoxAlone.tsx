import styles from "./infoTextBoxAlone.module.css";
import {FC} from "react";
import {IBoxesDoubleText} from "../../../../interfaces/IBoxes/IBoxesDoubleText.ts";

export const InfoTextBoxAlone: FC<IBoxesDoubleText> = (props) => {
    return (
        <div className={styles.infoTextBoxAlone}>
            <p className={styles.infoTextBoxAlone}>{props.textOne}</p>
            <p className={styles.infoTextBoxAlone}>{props.textTwo}</p>
        </div>
    );
};