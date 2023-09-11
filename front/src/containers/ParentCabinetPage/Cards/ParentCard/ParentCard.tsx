import { FunctionComponent, MouseEvent, ReactElement, useState } from "react";
import IParentCardProps from "./IParentCardProps";
import styles from "../Cards.module.css";
import Btn from "../../../../components/UI/Btn/Btn";
import { EBtnSize } from "../../../../enums/EBtnSize";
import { EBtnClass } from "../../../../enums/EBtnClass";
import Modal from "../../../../components/UI/Modal/Modal";
import EditUserForm from "../../../UserForms/EditUserForm/EditUserForm";
import { useAppSelector } from "../../../../app/hooks";
import { ERoles } from "../../../../enums/ERoles";
import RenewSubForm from "../../../UserForms/RenewSubForm/RenewSubForm";

const ParentCard: FunctionComponent<IParentCardProps> = (props: IParentCardProps): ReactElement => {
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [showSubModal, setShowSubModal] = useState<boolean>(false);
    const { user } = useAppSelector(state => state.auth);

    const closeEditModal = () => {
        setShowEditUserModal(false);
    };

    const openModal = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setShowEditUserModal(true);
    };
    const showSubModalToogle = () => {
        setShowSubModal(!showSubModal);
    };

    return (
        <div className={styles.card_box}>
            <Modal show={showEditUserModal} close={closeEditModal}>
                <EditUserForm closeModal={closeEditModal} />
            </Modal>
            {showSubModal && <Modal show={showSubModal} close={() => setShowSubModal(false)}>
                <RenewSubForm parent={props.parent}/>
            </Modal>}
            <div className={styles.data_column}>
                <h1 className={styles.h1_title}>Личные данные</h1>
                <div className={styles.card_row}>
                    <div className={styles.card_column}>
                        <p className={`${styles.body_text} ${styles.overflow_text}`}>{props.parent.users.surname} {props.parent.users.name} {props.parent.users.patronim}</p>
                    </div>
                </div>
                <div className={styles.card_row}>
                    <div className={styles.card_column}>
                        <p className={styles.body_text}>{props.parent.users.phone}</p>
                    </div>
                    {user && user.role === ERoles.PARENT &&
                    <div className={styles.btn_edit}>
                        <div className={styles.pencil_icon} onClick={(e: MouseEvent<HTMLDivElement>) => openModal(e)}>
                        </div>
                    </div>
                    }
                </div>
                <div className={styles.card_row}>
                    <p className={`${styles.body_text} ${styles.gray_text} ${styles.flex_grow}`}>Дата регистрации </p>
                    <p className={`${styles.body_text} ${styles.flex_date}`}>{new Date(props.parent.registerDate).toLocaleDateString()}</p>
                </div>
                <div className={styles.card_row}>
                    <p className={`${styles.body_text} ${styles.gray_text} ${styles.flex_grow}`}>Дата окончания подписки </p>
                    <p className={`${styles.body_text} ${styles.flex_date}`}>{new Date(props.parent.subscriptionEndDate).toLocaleDateString()}</p>
                </div>
            </div>
            <div className={styles.btn_row}>
                <Btn title={"Продлить подписку"}
                    size={EBtnSize.small} btnClass={EBtnClass.white_active} onclick={() => showSubModalToogle()}
                />
            </div>
        </div>
    );
};

export default ParentCard;