import { FunctionComponent, ReactElement, useState, MouseEvent } from "react";
import stylesTable from "../../../containers/AdminPage/AdminTables/AllTables.module.css";
import styles from "../ChildTables.module.css";
import IChildVisitsProps from "./IChildVisitsProps";
import VisitsRow from "./VisitRow/VisitRow";
import Btn from "../../UI/Btn/Btn";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnTypes } from "../../../enums/EBtnTypes";
import { EBtnClass } from "../../../enums/EBtnClass";
import Modal from "../../UI/Modal/Modal";
import { ERoles } from "../../../enums/ERoles";
import { useAppSelector } from "../../../app/hooks";
import { useDeleteVisitMutation } from "../../../app/services/visits";
import CreateVisitForm from "./CreateVisitForm/CreateVisitForm";
import IVisitGetDto from "../../../interfaces/IVisit/IVisitGetDto";
import errorHandler from "../../../helpers/errorHandler";
import successHandler from "../../../helpers/successHandler";

const ChildVisits: FunctionComponent<IChildVisitsProps> = (props): ReactElement => {
    const { user } = useAppSelector(state => state.auth);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showModalDeleteVisit, setShowModalDeleteVisit] = useState(false);
    const [thisVisit, setThisVisit] = useState<IVisitGetDto | null>(null);

    const addModalCloser = () => {
        setShowAddModal(false);
    };

    const deleteModalCloser = () => {
        setShowModalDeleteVisit(false);
    };

    const [deleteVisit, {
        isSuccess: isSuccessDeleteVisit,
        isError: isErrorDeleteVisit,
        error: errorDeleteVisit
    }] = useDeleteVisitMutation();

    const clickDeleteHandler = (e: MouseEvent<HTMLButtonElement>, thisVisit: IVisitGetDto) => {
        e.stopPropagation();
        setThisVisit({...thisVisit});
        setShowModalDeleteVisit(true);
    };

    const clearModalState = () => {
        setThisVisit(null);
    };

    const deleteThisVisit = async () => {
        thisVisit && await deleteVisit(thisVisit.id);
        setShowModalDeleteVisit(false);
        clearModalState();
    };

    errorHandler(isErrorDeleteVisit, errorDeleteVisit);
    successHandler(isSuccessDeleteVisit, "Запись о приеме у врача удалена");

    return (
        <>
            {user?.role === ERoles.DOCTOR ? <Modal show={showAddModal} close={addModalCloser}>
                <div>
                    <CreateVisitForm childId={props.childId} modalCloser={addModalCloser} />
                </div>
            </Modal> :null}
            <Modal show={showModalDeleteVisit} close={deleteModalCloser}>
                <div className={stylesTable.modal_flex_column}>
                    <div className={stylesTable.title_box}>
                        <p className={stylesTable.modal_title}>
                            Вы уверены, что хотите удалить запись о приеме у врача?
                        </p>
                    </div>
                    <div className={stylesTable.modal_btn_group}>
                        <Btn
                            size={EBtnSize.tiny}
                            title={"Отмена"}
                            btnClass={EBtnClass.white_active}
                            onclick={deleteModalCloser}
                        />
                        <Btn
                            size={EBtnSize.tiny}
                            title={"Да"}
                            btnClass={EBtnClass.dark_active}
                            onclick={() => deleteThisVisit()}
                        />
                    </div>
                </div>
            </Modal>
            
            <div className={styles.child_table}>
                <div className={stylesTable.table_box}>
                    <table className={stylesTable.table}>
                        <thead>
                            <tr className={stylesTable.table_tr}>
                                <th className={stylesTable.table_td_right}>Дата осмотра</th>
                                <th className={stylesTable.table_td_right}>Место осмотра</th>
                                <th className={stylesTable.table_td_right}>Характер посещение</th>
                                <th className={stylesTable.table_td_right}>Клинические данные</th>
                                <th className={stylesTable.table_td_right}>Заключение</th>
                                <th className={user?.role === ERoles.DOCTOR ? stylesTable.table_td_right : stylesTable.table_td}>Назначение</th>
                                {user?.role === ERoles.DOCTOR ? <th className={stylesTable.table_td}></th> : null}
                            </tr>
                        </thead>
                        <tbody>
                            {props.visits && props.visits.map((visit) => {
                                return <VisitsRow 
                                    key={visit.id} 
                                    visit={visit}
                                    showModaldeleteVisit={(e) => clickDeleteHandler(e, visit)} />;
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {user?.role === ERoles.DOCTOR ? <div className={styles.add_btn_row}>
                <Btn
                    onclick={() => setShowAddModal(true)}
                    title="Добавить"
                    size={EBtnSize.small}
                    types={EBtnTypes.button}
                    btnClass={EBtnClass.dark_active} />
            </div> : null}
            
        </>
    );
};

export default ChildVisits;