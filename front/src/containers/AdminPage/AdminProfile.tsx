import { NavLink } from "react-router-dom";
import styles from "./AdminPage.module.css";
import { useAppSelector } from "../../app/hooks";
import { FunctionComponent, ReactElement } from "react";

const AdminProfile: FunctionComponent = (): ReactElement => {
    const { user } = useAppSelector(state => state.auth);
    return (
        <>
            {user &&
                <div className={styles.Admin_personal_card}>
                    <div className={styles.Admin_first_card_row}>
                        <div className={styles.Admin_personal_card_column}>
                            <p className={styles.Admin_body_text}>{user.name} {user.surname} {user.patronim}</p>
                        </div>
                        <div className={styles.Admin_edit_link}>
                            <NavLink className={styles.pencil_icon}
                                to={"/admin-page/edit-profile"}></NavLink>
                        </div>
                    </div>
                    <div className={styles.Admin_second_card_row}>
                        <div className={styles.Admin_personal_card_column}>
                            <p className={styles.Admin_body_text}>{user.phone}</p>
                        </div>
                        <div className={styles.Admin_personal_card_column}>
                            <p className={styles.Admin_body_text}>{user.email}</p>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default AdminProfile;