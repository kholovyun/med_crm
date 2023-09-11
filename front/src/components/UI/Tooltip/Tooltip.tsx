import { FunctionComponent, ReactElement } from "react";
import ITooltipProps from "./ITooltipProps";
import styles from "./Tooltip.module.css";

export const Tooltip: FunctionComponent<ITooltipProps> = (props: ITooltipProps): ReactElement => {
    return (
        <span className={styles.tooltip_text}
            style={{
                top: props.top,
                left: props.left
            }}
        >
            {props.label}</span>
    );
};

export default Tooltip;