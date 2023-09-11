import { FunctionComponent, MouseEvent, ReactElement, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./SideBar.module.css";
import "./SideBarNavLink.css";
import AccessControl from "../../../permissionRoutes/AccessControl";
import { SideBarLinksArray } from "./SideBarLinksArray";
import Tooltip from "../../../components/UI/Tooltip/Tooltip";

const SideBar: FunctionComponent = (): ReactElement => {
    const [isShowingMenu, setIsShowingMenu] = useState(false);

    const toogleMenu = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsShowingMenu(!isShowingMenu);
    };

    return (
        <>
            <div className={styles.sidebar_big_screen}>
                {isShowingMenu ? (
                    <div className={styles.sidebar_colappsed_icons_column}>
                        <div className={styles.sidebar_colappsed}>
                            <div onClick={toogleMenu} className={styles.open_btn}></div>
                        </div>
                        {SideBarLinksArray.map((link, i) => {
                            return (
                                <AccessControl key={`l-${i}`} allowedRoles={link.access}>
                                    <div className={`${styles.sidebar_colappsed} ${styles.tooltip}`}>
                                        <NavLink
                                            className={`icon ${link.iconClass}`}
                                            to={link.path}
                                        >
                                        </NavLink>
                                        <Tooltip top={"25%"} left={"100%"} label={link.label} />
                                    </div>
                                </AccessControl>
                            );
                        })}
                    </div>
                ) : (
                    <div className={styles.sidebar}>
                        <div className={styles.header_menu_row}>
                            <h3 className={styles.menu_text}>Меню</h3>
                            <div onClick={toogleMenu} className={styles.close_btn}></div>
                        </div>
                        {SideBarLinksArray.map((fullLink, i) => {
                            return (
                                <AccessControl key={`l-${i}`} allowedRoles={fullLink.access}>
                                    <NavLink className={"sidebar_link"} to={fullLink.path}>
                                        {fullLink.label}
                                    </NavLink>
                                </AccessControl>
                            );
                        })}
                    </div>
                )}
            </div>
            <div className={styles.sidebar_small_screen}>
                <div className={styles.sidebar_colappsed_icons_column}>
                    {SideBarLinksArray.map((link, i) => {
                        return (
                            <AccessControl key={`l-${i}`} allowedRoles={link.access}>
                                <div className={`${styles.sidebar_colappsed} ${styles.tooltip}`}>
                                    <NavLink
                                        className={`icon ${link.iconClass}`}
                                        to={link.path}
                                    >
                                    </NavLink>
                                    <Tooltip top={"25%"} left={"100%"} label={link.label} />
                                </div>
                            </AccessControl>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default SideBar;
