import { FunctionComponent, ReactElement } from "react";
import styles from "./Header.module.css";
import Logo from "../Logo/Logo";
import { MenuBurger } from "../MenuBurger/MenuBurger";
import { DesctopMenu } from "../DesktopMenu/DesctopMenu";

const Header: FunctionComponent = (): ReactElement => {
    return (
        <header className={styles.header_bg_container}>
            <div className={styles.header_content_container}>
                <Logo />
                <MenuBurger />
                <DesctopMenu />
            </div>
        </header>
    );
};

export default Header;