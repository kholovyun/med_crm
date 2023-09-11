import { FunctionComponent, ReactElement } from "react";
import styles from "./IconBtn.module.css";
import IIconBtnProps from "./IIconBtnProps";

const IconBtn: FunctionComponent<IIconBtnProps> = (props: IIconBtnProps): ReactElement => {
    return (
        <button
            onClick={props.onclick === undefined ? undefined : props.onclick}
            className={props.btnClass === undefined ? `${styles.icon_btn}` : `${styles.icon_btn} ${styles[props.btnClass]}`}
            disabled={props.disabled === undefined ? false : props.disabled}
        >
        </button>
    );
};

export default IconBtn;