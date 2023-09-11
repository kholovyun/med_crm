import { NavLink } from "react-router-dom";
import ITransparentLinkProps from "./ITransparentLinkProps";
import styles from "./TransparentLink.module.css";
import { FunctionComponent, ReactElement } from "react";

const TransparentLink: FunctionComponent<ITransparentLinkProps> = (props: ITransparentLinkProps): ReactElement => {
    return (
        <NavLink to={props.pathTo} className={`${styles.transparent_link} ${styles[props.size || ""]}`}>
            {props.title}
        </NavLink>
    );
};

export default TransparentLink;