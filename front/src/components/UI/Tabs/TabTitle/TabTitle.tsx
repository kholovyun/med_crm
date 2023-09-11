import { FunctionComponent, ReactElement } from "react";
import ITabTitleProps from "./ITabTitleProps";
import styles from "./TabTitle.module.css";

const TabTitle: FunctionComponent<ITabTitleProps> = (props: ITabTitleProps): ReactElement => {
    return (
        <div
            className={props.activeIndex === props.index ? `${styles.tab_title_item} ${styles.active}` : `${styles.tab_title_item}`}
            onClick={(e) => props.changeTab(e, props.index)}
        >
            {props.title}
        </div>
    );
};

export default TabTitle;