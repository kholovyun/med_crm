import { FunctionComponent, ReactElement } from "react";
import styles from "./NotFoundPage.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Btn from "../../components/UI/Btn/Btn";
import { EBtnSize } from "../../enums/EBtnSize";
import { EBtnClass } from "../../enums/EBtnClass";
import { logout } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { ERoles } from "../../enums/ERoles";

const NotFoundPage: FunctionComponent = (): ReactElement => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector(state => state.auth);

    const onClickHandler = () => {
        if (user) {
            user.role === ERoles.ADMIN || user.role === ERoles.SUPERADMIN ?
                navigate("/admin-page/doctors") :
                user.role === ERoles.DOCTOR ?
                    navigate("/cabinet") :
                    navigate("/parent-cabinet");
        } else {
            dispatch(logout());
            navigate("/");
        }
    };

    return (
        <div className={styles.not_found_bg}>
            <div className={styles.not_found_column}>
                <h1 className={styles.title}>404</h1>
                <p className={styles.subtitle}>Ничего не найдено...</p>
                <Btn
                    title={user ? "В личный кабинет" : "На главную"}
                    size={EBtnSize.small}
                    btnClass={EBtnClass.white_active}
                    onclick={onClickHandler} />
            </div>
        </div>
    );
};

export default NotFoundPage;
