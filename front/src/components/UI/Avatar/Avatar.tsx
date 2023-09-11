import { FunctionComponent, ReactElement } from "react";
import styles from "./Avatar.module.css";
import { useNavigate } from "react-router-dom";

type TAvatar = {
    link: string,
    style?: {[key: string]: string}
};

export const Avatar: FunctionComponent<TAvatar> = (props): ReactElement => {
    const navigator = useNavigate();

    return (
        <div style={props.style} className={styles.header_avatar_img} onClick={() => navigator(`/${props.link}`)}/>
    );
};
