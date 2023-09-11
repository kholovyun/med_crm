import { FC, ReactElement} from "react";
import styles from "./ContentLink.module.css";

type TContentLink = {
    text: string,
    fn: () => void,
    contentArrowRight?: boolean
};

const ContentLink: FC<TContentLink> = (props): ReactElement  => {
    return (
        <div className={styles.contentBox} onClick={props.fn}>
            <p className={styles.contentText}>{props.text}</p>
            <div className={`${styles.contentArrow} ${props.contentArrowRight && styles.contentArrowRight}`}></div>
        </div>
    );
};

export  default ContentLink;