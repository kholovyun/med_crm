import { FunctionComponent, ReactElement, useState, MouseEvent } from "react";
import IChildVaccinationsProps from "./IChildVaccinationsProps";
import styles from "../ChildTables.module.css";
import stylesTable from "../../../containers/AdminPage/AdminTables/AllTables.module.css";
import VaccinationRow from "./VaccinationRow/VaccinationRow";
import { useDeleteVaccinationMutation } from "../../../app/services/vaccinations";
import Modal from "../../UI/Modal/Modal";
import Btn from "../../UI/Btn/Btn";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnTypes } from "../../../enums/EBtnTypes";
import { EBtnClass } from "../../../enums/EBtnClass";
import CreateVaccination from "./CreateVaccination/CreateVaccination";
import IVaccinationGetDto from "../../../interfaces/IVaccination/IVaccinationGetDto";
import errorHandler from "../../../helpers/errorHandler";
import successHandler from "../../../helpers/successHandler";

const ChildVaccinations: FunctionComponent<IChildVaccinationsProps> = (props): ReactElement => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showModalDeleteVaccination, setShowModalDeleteVaccination] = useState(false);
    const [thisVaccination, setThisVaccination] = useState<IVaccinationGetDto | null>(null);
    
    const createModalCloser = () => {
        setShowAddModal(false);
    };

    const deleteModalCloser = () => {
        setShowModalDeleteVaccination(false);
    };

    const [deleteVaccination, {
        isSuccess: isSuccessDeleteVaccination,
        isError: isErrorDeleteVaccination,
        error: errorDeleteVaccination
    }] = useDeleteVaccinationMutation();

    const clickDeleteHandler = (e: MouseEvent<HTMLButtonElement>, thisVac: IVaccinationGetDto) => {
        e.stopPropagation();
        setThisVaccination({...thisVac});
        setShowModalDeleteVaccination(true);
    };

    const clearModalState = () => {
        setThisVaccination(null);
    };

    const deleteThisVaccination = async () => {
        thisVaccination && await deleteVaccination(thisVaccination.id);
        setShowModalDeleteVaccination(false);
        clearModalState();
    };

    errorHandler(isErrorDeleteVaccination, errorDeleteVaccination);
    successHandler(isSuccessDeleteVaccination, "Запись о вакцинации удалена");

    return (
        <>
            <Modal show={showAddModal} close={createModalCloser}>
                <div>
                    <CreateVaccination modalCloser={createModalCloser} childId={props.childId} />
                </div>
            </Modal> 
            <Modal show={showModalDeleteVaccination} close={deleteModalCloser}>
                <div className={stylesTable.modal_flex_column}>
                    <div className={stylesTable.title_box}>
                        <p className={stylesTable.modal_title}>
                            Вы уверены, что хотите удалить запись о вакцине?
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
                            onclick={() => deleteThisVaccination()}
                        />
                    </div>
                </div>
            </Modal>
            <div className={styles.child_table}>
                <div className={stylesTable.table_box}>
                    <table className={stylesTable.table}>
                        <thead>
                            <tr className={stylesTable.table_tr}>
                                <th className={stylesTable.table_td_right}>
                                    <p className={styles.no_wrap}>Инфекция, против которой</p> 
                                    <p className={styles.no_wrap}>ставится прививка</p></th>
                                <th className={stylesTable.table_td_right}>Вид вакцины</th>
                                <th className={stylesTable.table_td_right}>Возраст ребенка</th>
                                <th className={stylesTable.table_td_right}>Дата</th>
                                <th className={stylesTable.table_td_right}>Доза</th>
                                <th className={stylesTable.table_td_right}>Серия</th>
                                <th className={stylesTable.table_td_right}>Производитель</th>
                                <th className={stylesTable.table_td_right}>Реакция</th>
                                <th className={stylesTable.table_td_right}>Медотвод</th>
                                <th className={stylesTable.table_td_right}>Примечание</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.vaccinations && props.vaccinations.map((vac) => {
                                return <VaccinationRow
                                    key={vac.id}
                                    vaccination={vac}
                                    showModaldeleteVaccination={(e) => clickDeleteHandler(e, vac)} />;
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={styles.add_btn_row}>
                <Btn
                    onclick={() => setShowAddModal(true)}
                    title="Добавить"
                    size={EBtnSize.small}
                    types={EBtnTypes.button}
                    btnClass={EBtnClass.dark_active} />
            </div>
        </>
    );
};

export default ChildVaccinations;