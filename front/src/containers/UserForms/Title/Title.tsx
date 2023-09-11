import { FunctionComponent, ReactElement } from "react";
import { ITitleProps } from "./ITitleProps";
import styles from "./Title.module.css";

export const Title: FunctionComponent<ITitleProps> = (props: ITitleProps): ReactElement => {
    return (
        <h1 className={styles.titleTxt}>{props.text}</h1>
    );
};
