import styles from "./FunctionalBox.module.css";
import { ReactNode } from "react";

export const FunctionalBox = ({ children }: { children: ReactNode }) => {
    return (
        <div className={styles.functionalBox}>
            {children}
        </div>
    );
};
