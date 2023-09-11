import { FunctionComponent, ReactElement } from "react";
import styles from "./SwitchDiv.module.css";
import ISwitchDivProps from "./ISwitchDivProps";

const SwitchDiv: FunctionComponent<ISwitchDivProps> = (props: ISwitchDivProps): ReactElement => {

    return (
        <>
            {props.isOn ?
                <div className={`${styles.switch_row} ${styles.on} 
                ${props.disabled !== undefined ? styles.disabled : ""}`}>
                    <div className={styles.text}></div>
                    <div className={styles.white_circle}></div>
                </div>
                :
                <div className={`${styles.switch_row} ${styles.off} ${props.disabled !== undefined ? styles.disabled : ""}`}>
                    <div className={styles.white_circle}></div>
                    <div className={styles.text}></div>
                </div>
            }
        </>
    );
};

export default SwitchDiv;