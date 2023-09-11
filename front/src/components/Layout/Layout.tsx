import { FunctionComponent, ReactElement } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";

const Layout: FunctionComponent = (): ReactElement => {
    return (
        <>
            <Header />
            <main className={styles.main_container}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;