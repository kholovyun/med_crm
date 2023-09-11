import styles from "./InfoTableContent.module.css";
import {ReactNode} from "react";

export const InfoTableContent = ({children}: {children: ReactNode}) => {
    return (
        <div className={styles.infotableContent}>
            {children}
        </div>
    );
};