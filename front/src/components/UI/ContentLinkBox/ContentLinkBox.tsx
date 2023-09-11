import { ReactNode} from "react";
import styles from "./ContentLinkBox.module.css";
export const ContentLinkBox = ({children}: { children: ReactNode }) => {
    return (
        <div className={styles.contentLinkBox}>
            {children}
        </div>
    );
};