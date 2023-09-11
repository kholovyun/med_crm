import { ReactNode} from "react";
import styles from "./ContentLinkRow.module.css";
export const ContentLinkRow = ({children}: { children: ReactNode }) => {
    return (
        <div className={styles.contentLinkRow}>
            {children}
        </div>
    );
};