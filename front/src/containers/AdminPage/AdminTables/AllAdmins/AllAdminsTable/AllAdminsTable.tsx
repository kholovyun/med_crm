import { FunctionComponent, ReactElement, MouseEvent, useState } from "react";
import IAllAdminsTableProps from "./IAllAdminsTableProps";
import styles from "../../AllTables.module.css";
import { ERoles } from "../../../../../enums/ERoles";
import { useBlockUserMutation } from "../../../../../app/services/users";
import Modal from "../../../../../components/UI/Modal/Modal";
import { EBtnSize } from "../../../../../enums/EBtnSize";
import Btn from "../../../../../components/UI/Btn/Btn";
import { EBtnClass } from "../../../../../enums/EBtnClass";
import IUserGetDto from "../../../../../interfaces/IUser/IUserGetDto";
import AdminRow from "./AdminRow/AdminRow";
import errorHandler from "../../../../../helpers/errorHandler";

const AllAdminsTable: FunctionComponent<IAllAdminsTableProps> = (props: IAllAdminsTableProps): ReactElement => {
    const [blockThisUser, { error: blockUserError, isError: isBlockError }] = useBlockUserMutation();

    const [stateUser, setUser] = useState<IUserGetDto | null>(null);
    const [modalTitle, setModalTitle] = useState("");
    const [showModal, setShowModal] = useState(false);

    errorHandler(isBlockError, blockUserError);
    
    const clearModalStates = () => {
        setUser(null);
        setModalTitle("");
    };

    const clickBlockHandler = (e: MouseEvent<HTMLDivElement>, thisUser: IUserGetDto, text: string) => {
        e.stopPropagation();
        setUser({...thisUser});
        setShowModal(true);
        setModalTitle(text);
    };

    const blockUser = async () => {
        if(stateUser && stateUser.role !== ERoles.SUPERADMIN) {
            await blockThisUser(stateUser);
        }        
        setShowModal(false);
        clearModalStates();
    };

    const modalCancelHandler = () => {
        setShowModal(false);
        clearModalStates();
    };

    return (
        <div className={styles.table_box}>
            <Modal
                show={showModal}
                close={modalCancelHandler}>
                <div className={styles.modal_flex_column}>
                    <div className={styles.title_box}>
                        <p className={styles.modal_title}>
                            Вы уверены, что хотите <span className={styles.violet}>{modalTitle}</span></p>
                        <p className={styles.modal_title}>пользователя по имени<span className={styles.violet}>{stateUser && ` ${stateUser.surname} ${stateUser.name}`}</span>?
                        </p>
                    </div>                    
                    <div className={styles.modal_btn_group}>
                        <Btn
                            size={EBtnSize.tiny}
                            title={"Отмена"}
                            btnClass={EBtnClass.white_active}
                            onclick={modalCancelHandler}
                        />
                        <Btn
                            size={EBtnSize.tiny}
                            title={"Да"}
                            btnClass={EBtnClass.dark_active}
                            onclick={() => blockUser()}
                        />
                    </div>
                </div>
            </Modal>            
            <table className={styles.table}>
                <thead>
                    <tr className={styles.table_tr}>
                        <th className={styles.table_td_right}>ФИО</th>
                        <th className={styles.table_td_right}>Email</th>
                        <th className={styles.table_td_right}>Tел.</th>                                        
                        <th className={styles.table_td_right}>Блок</th>
                        <th className={styles.table_td}>Роль</th>
                    </tr>
                </thead>
                <tbody>
                    {props.users.map((admin) => {
                        return (
                            <AdminRow key={admin.id} 
                                admin={admin}
                                clickBlock={(e: MouseEvent<HTMLDivElement>) => clickBlockHandler(e, admin, admin.isBlocked ? "разблокировать" : "заблокировать")}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>        
    );
};

export default AllAdminsTable;