import { FunctionComponent, ReactElement } from "react";
import IInputFileForMessageProps from "./IInputFileForMessageProps";
import styles from "./InputFileForMessage.module.css";
import Tooltip from "../../../UI/Tooltip/Tooltip";

export const InputFileForMessage: FunctionComponent<IInputFileForMessageProps> = (props: IInputFileForMessageProps): ReactElement => {
    return (
        <label className={styles.file_input_label}>
            <input
                className={styles.file_input}
                type="file"
                name={props.inputName}
                onChange={props.onChangeHandler}
                ref={props.fileReference}
            />
            <div className={`${styles[props.iconClass]} ${styles.tooltip}`}>
                <Tooltip top={"-25%"} left={"100%"} label={props.tooltipLabel} />
            </div>
        </label>
    );
};

export default InputFileForMessage;