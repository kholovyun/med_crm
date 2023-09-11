import { FunctionComponent, ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import AccessControl from "../../permissionRoutes/AccessControl";
import { NavLink } from "react-router-dom";
import { EBtnClass } from "../../enums/EBtnClass";
import { logout } from "../../features/authSlice";
import { EBtnSize } from "../../enums/EBtnSize";
import style from "../Header/Header.module.css";
import styles from "./DesctopMenu.module.css";
import { ERoles } from "../../enums/ERoles";
import { toast } from "react-toastify";
import Btn from "../UI/Btn/Btn";
import { Avatar } from "../UI/Avatar/Avatar";

export const DesctopMenu: FunctionComponent = (): ReactElement => {
    const { user } = useAppSelector(state => state.auth);
    const dispatcher = useAppDispatch();

    return (
        <div className={styles.descMenu}>
            {user ?
                <div className={style.linkBox}>
                    <NavLink style={{maxWidth: "190px", overflow: "hidden", textOverflow: "ellipsis",  whiteSpace: "nowrap", textAlign: "center", fontSize: "1rem"}} to={"/login"} className={style.header_link}>
                        <strong>{user.name}</strong>
                    </NavLink>
                    <Avatar style={{marginLeft: "10px"}} link="login"/>
                </div> :
                <div className={style.linkBox}>
                    <NavLink style={{whiteSpace: "nowrap", textAlign: "center", fontSize: "1rem"}} to={"/login"} className={style.header_link}>
                        Личный кабинет
                    </NavLink>
                    <Avatar style={{margin: "0 10px"}} link="login"/>
                </div>
            }
            <Btn
                style={{marginLeft: "30px", marginBottom: "0px"}}
                title="Поддержка"
                onclick={() => toast.info("Функционал пока недоступен")}
                size={EBtnSize.small}
                btnClass={EBtnClass.dark_active}
            />
            <AccessControl
                allowedRoles={[ERoles.ADMIN, ERoles.DOCTOR, ERoles.PARENT, ERoles.SUPERADMIN]}
            >
                <Btn
                    style={{marginLeft: "30px", marginBottom: "0px"}}
                    title={"Выйти"}
                    size={EBtnSize.small}
                    btnClass={EBtnClass.dark_active}
                    onclick={() => dispatcher(logout())} />
            </AccessControl>
        </div>
    );
};
