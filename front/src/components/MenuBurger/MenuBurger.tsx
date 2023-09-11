import { FunctionComponent, ReactElement, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import AccessControl from "../../permissionRoutes/AccessControl";
import { NavLink } from "react-router-dom";
import { EBtnClass } from "../../enums/EBtnClass";
import { logout } from "../../features/authSlice";
import { EBtnSize } from "../../enums/EBtnSize";
import style from "../Header/Header.module.css";
import styles from "./MenuBurger.module.css";
import { ERoles } from "../../enums/ERoles";
import { toast } from "react-toastify";
import Btn from "../UI/Btn/Btn";
import { Avatar } from "../UI/Avatar/Avatar";

export const MenuBurger: FunctionComponent = (): ReactElement => {
    const { user } = useAppSelector(state => state.auth);
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useAppDispatch();

    const showMenuToogle = () => {
        setShowMenu(!showMenu);
    };

    const logoutHandler = () => {
        dispatch(logout());
        toast.info("Выход выполнен");
    };

    return (
        <div className={styles.menuBurger} onClick={showMenuToogle}>
            &#9776;
            {showMenu && <div className={styles.menuBurgerBox}>
                <div className={styles.closeBox}>
                    <p className={styles.close} onClick={showMenuToogle}></p>
                </div>
                {user ?
                    <div className={style.linkBox}>
                        <NavLink to={"/login"} className={styles.burgerLink}>
                            <strong>{user.name}</strong>
                        </NavLink>
                        <Avatar link="login" />
                    </div> :
                    <div className={style.linkBox}>
                        <NavLink style={{ whiteSpace: "nowrap", marginRight: "5px", marginBottom: "40px", textAlign: "center", fontSize: "1rem" }} to={"/login"} className={styles.burgerLink}>
                            Личный кабинет
                        </NavLink>
                        <Avatar style={{ marginBottom: "40px" }} link="login" />
                    </div>
                }
                <Btn
                    title="Поддержка"
                    onclick={() => toast.info("Функционал пока недоступен")}
                    size={EBtnSize.small}
                    btnClass={EBtnClass.dark_active}
                />
                <AccessControl
                    allowedRoles={[ERoles.ADMIN, ERoles.DOCTOR, ERoles.PARENT, ERoles.SUPERADMIN]}
                >
                    <Btn
                        title={"Выйти"}
                        size={EBtnSize.small}
                        btnClass={EBtnClass.dark_active}
                        onclick={logoutHandler} />
                </AccessControl>
            </div>
            }
        </div>
    );
};
