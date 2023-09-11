import { FunctionComponent, ReactElement } from "react";
import { Outlet } from "react-router-dom";
import styles from "./AdminPage.module.css";
import SideBar from "./SideBar/SideBar";

const AdminPage: FunctionComponent = (): ReactElement => {
    return (
        <div className={styles.AdminPage_row}>
            <SideBar />
            <div className={styles.Admin_page_content}>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminPage;
