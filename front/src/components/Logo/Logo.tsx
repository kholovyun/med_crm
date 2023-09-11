import { FunctionComponent, ReactElement } from "react";
import { Link } from "react-router-dom";
import styles from "./Logo.module.css";
import { useAppSelector } from "../../app/hooks";
import { ERoles } from "../../enums/ERoles";

const Logo: FunctionComponent = (): ReactElement => {
    const { user } = useAppSelector(state => state.auth);

    const linkRouting = () => {
        if (user) {
            return user.role === ERoles.ADMIN || user.role === ERoles.SUPERADMIN ?
                "/admin-page/doctors" : 
                user.role === ERoles.DOCTOR ?
                    "/cabinet" :
                    "/parent-cabinet";
        } else {
            return "/";
        }
    };

    return (
        <Link className={styles.Logo} to={linkRouting()} />
    );
};

export default Logo;