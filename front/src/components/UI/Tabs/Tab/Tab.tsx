import { FunctionComponent, ReactElement } from "react";
import ITabProps from "./ITabProps";
import styles from "./Tab.module.css";

const Tab: FunctionComponent<ITabProps> = ({children}: ITabProps): ReactElement => {
    return (
        <div className={styles.content_item}>{children}</div>
    );
};

export default Tab;