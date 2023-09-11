import { ReactNode } from "react";
import styles from "./InfoTableChild.module.css";

export const InfoTableChild = ({ children }: { children: ReactNode }) => {
    return (
        <div className={styles.infoTableChild}>
            {children}
        </div>
    );
};