import { FunctionComponent, MouseEvent, ReactElement, useState } from "react";
import ITabsProps from "./ITabsProps";
import TabTitle from "./TabTitle/TabTitle";
import styles from "./Tabs.module.css";

const Tabs: FunctionComponent<ITabsProps> = ({ children, callbacks }: ITabsProps): ReactElement => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);

    const changeTab = (e: MouseEvent<HTMLDivElement>, index: number) => {
        e.stopPropagation();
        setSelectedTab(index);
        setActiveIndex(index);
        if (callbacks) {
            if (callbacks[index]) {
                callbacks[index]();
            }
        }
    };

    return (
        <>
            <div className={styles.tabs}>
                {children.map((item, index) => (
                    <TabTitle
                        key={index}
                        title={item.props.title}
                        index={index}
                        changeTab={changeTab}
                        activeIndex={activeIndex}
                    />
                ))}
            </div>
            <div className={styles.tab_content}>
                {children[selectedTab]}
            </div>
        </>
    );
};

export default Tabs;