import { FunctionComponent, MouseEvent, ReactElement, useState } from "react";
import IAllDoctorsTableProps from "./IAllDoctorsTableProps";
import styles from "../../AllTables.module.css";
import IDoctorWithUser from "../../../../../interfaces/IDoctor/IDoctorWithUser";
import { useActivateDoctorMutation, useBlockDoctorMutation } from "../../../../../app/services/doctors";
import Modal from "../../../../../components/UI/Modal/Modal";
import Btn from "../../../../../components/UI/Btn/Btn";
import { EBtnSize } from "../../../../../enums/EBtnSize";
import { EBtnClass } from "../../../../../enums/EBtnClass";
import DoctorRow from "./DoctorRow/DoctorRow";
import errorHandler from "../../../../../helpers/errorHandler";
import EditPriceForm from "./EditPriceForm/EditPriceForm";

const AllDoctorsTable: FunctionComponent<IAllDoctorsTableProps> = (props: IAllDoctorsTableProps): ReactElement => {
    const [blockThisUser, { error: blockUserError, isError: isBlockError }] = useBlockDoctorMutation();
    const [activateThisDoctor, { error: activateError, isError: isActivateError }] = useActivateDoctorMutation();
    const [stateDoctor, setDoctor] = useState<IDoctorWithUser | null>(null);
    const [modalTitle, setModalTitle] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showPriceModal, setShowPriceModal] = useState(false);

    errorHandler(isBlockError, blockUserError);
    errorHandler(isActivateError, activateError);

    const clearModalStates = () => {
        setDoctor(null);
        setModalTitle("");
    };

    const openPriceModal = (e: MouseEvent<HTMLDivElement>, thisDoctor: IDoctorWithUser) => {
        e.stopPropagation();
        setDoctor({...thisDoctor});
        setShowPriceModal(true);
    };

    const closePriceModal = () => {
        setShowPriceModal(false);
        clearModalStates();
    };

    const clickBlockHandler = (e: MouseEvent<HTMLDivElement>, thisDoctor: IDoctorWithUser, text: string) => {
        e.stopPropagation();
        setDoctor({...thisDoctor});
        setShowModal(true);
        setModalTitle(text);
    };

    const clickActivateHandler = (e: MouseEvent<HTMLDivElement>, thisDoctor: IDoctorWithUser, text: string) => {
        e.stopPropagation();
        setDoctor({...thisDoctor});
        setShowModal(true);
        setModalTitle(text);
    };

    const blockUser = async () => {
        stateDoctor && await blockThisUser(stateDoctor);
        setShowModal(false);
        clearModalStates();
    };

    const activateDoctor = async () => {
        stateDoctor && await activateThisDoctor(stateDoctor);
        setShowModal(false);
        clearModalStates();
    };

    const modalCancelHandler = () => {
        setShowModal(false);
        clearModalStates();
    };

    return (
        <div className={styles.table_box}>
            <Modal show={showPriceModal} close={closePriceModal}>
                {stateDoctor && <EditPriceForm doctor={stateDoctor} closeModal={closePriceModal} />}
            </Modal>
            <Modal
                show={showModal}
                close={modalCancelHandler}>
                <div className={styles.modal_flex_column}>
                    <div className={styles.title_box}>
                        <p className={styles.modal_title}>
                            Вы уверены, что хотите <span className={styles.violet}>{modalTitle}</span></p>
                        <p className={styles.modal_title}>пользователя по имени <span className={styles.violet}>{stateDoctor && ` ${stateDoctor.users.surname} ${stateDoctor.users.name}`}</span>?
                        </p>
                    </div>                    
                    <div className={styles.modal_btn_group}>
                        <Btn
                            size={EBtnSize.tiny}
                            title={"Отмена"}
                            btnClass={EBtnClass.white_active}
                            onclick={modalCancelHandler}
                        />
                        {modalTitle === "разблокировать" || modalTitle === "заблокировать" ?
                            <Btn
                                size={EBtnSize.tiny}
                                title={"Да"}
                                btnClass={EBtnClass.dark_active}
                                onclick={() => blockUser()}
                            />
                            :
                            <Btn
                                size={EBtnSize.tiny}
                                title={"Да"}
                                btnClass={EBtnClass.dark_active}
                                onclick={() => activateDoctor()}
                            />
                        }                        
                    </div>
                </div>
            </Modal>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.table_tr}>
                        <th className={styles.table_td_right}>ФИО</th>
                        <th className={styles.table_td_right}>Email</th>
                        <th className={styles.table_td_right}>Tел.</th>
                        <th className={styles.table_td_right}>Специализация</th>
                        <th className={styles.table_td_right}>Базовая цена подписки</th>
                        <th className={styles.table_td_right}>Блок</th>                        
                        <th className={styles.table_td}>Активация</th>
                    </tr>
                </thead>
                <tbody>
                    {props.doctors.map(({...doctor}) => {
                        return (
                            <DoctorRow key={doctor.id}
                                doctor={doctor}
                                clickBlock={(e: MouseEvent<HTMLDivElement>) => clickBlockHandler(e, doctor, doctor.users.isBlocked ? "разблокировать" : "заблокировать")}
                                clickActivate={(e: MouseEvent<HTMLDivElement>) => clickActivateHandler(e, doctor, doctor.isActive ? "дезактивировать" : "активировать")}
                                clickOpenPriceModal={(e: MouseEvent<HTMLDivElement>) => openPriceModal(e, doctor)}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default AllDoctorsTable;