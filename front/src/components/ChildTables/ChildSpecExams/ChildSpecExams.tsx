import { FunctionComponent, MouseEvent, ReactElement, useState } from "react";
import IChildSpecExamsProps from "./IChildSpecExamsProps";
import stylesTable from "../../../containers/AdminPage/AdminTables/AllTables.module.css";
import styles from "../ChildTables.module.css";
import Modal from "../../UI/Modal/Modal";
import Btn from "../../UI/Btn/Btn";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnTypes } from "../../../enums/EBtnTypes";
import { EBtnClass } from "../../../enums/EBtnClass";
import SpecExamRow from "./SpecExamsRow/SpecExamsRow";
import CreateExam from "./CreateExam/CreateExam";
import ISpecialistExamsGetDto from "../../../interfaces/ISpecialistExams/ISpecialistExamsGetDto";
import { useDeleteExamMutation } from "../../../app/services/specExams";
import successHandler from "../../../helpers/successHandler";
import errorHandler from "../../../helpers/errorHandler";

const ChildSpecExams: FunctionComponent<IChildSpecExamsProps> = (props): ReactElement => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showModalDeleteExam, setShowModalDeleteExam] = useState(false);
    const [thisExam, setThisExam] = useState<ISpecialistExamsGetDto | null>(null);
    
    const addModalCloser = () => {
        setShowAddModal(false);
    };

    const deleteModalCloser = () => {
        setShowModalDeleteExam(false);
    };

    const [deleteExam, {
        isSuccess: isSuccessDeleteExam,
        isError: isErrorDeleteExam,
        error: errorDeleteExam
    }] = useDeleteExamMutation();

    const clickDeleteHandler = (e: MouseEvent<HTMLButtonElement>, thisExam: ISpecialistExamsGetDto) => {
        e.stopPropagation();
        setThisExam({...thisExam});
        setShowModalDeleteExam(true);
    };

    const clearModalState = () => {
        setThisExam(null);
    };

    const deleteThisExam = async () => {
        thisExam && await deleteExam(thisExam.id);
        setShowModalDeleteExam(false);
        clearModalState();
    };

    errorHandler(isErrorDeleteExam, errorDeleteExam);
    successHandler(isSuccessDeleteExam, "Запись об осмотре удалена");
    
    return (
        <>
            <Modal show={showAddModal} close={addModalCloser}>
                <div>
                    <CreateExam childId={props.childId} modalCloser={addModalCloser} />
                </div>
            </Modal>
            <Modal show={showModalDeleteExam} close={deleteModalCloser}>
                <div className={stylesTable.modal_flex_column}>
                    <div className={stylesTable.title_box}>
                        <p className={stylesTable.modal_title}>
                            Вы уверены, что хотите удалить запись об осмотре?
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
                            onclick={() => deleteThisExam()}
                        />
                    </div>
                </div>
            </Modal>
            <div className={styles.child_table}>
                <div className={stylesTable.table_box}>
                    <table className={stylesTable.table}>
                        <thead>
                            <tr className={stylesTable.table_tr}>
                                <th className={stylesTable.table_td_right}>Специальность</th>
                                <th className={stylesTable.table_td_right}>ФИО врача</th>
                                <th className={stylesTable.table_td_right}>Дата</th>
                                <th className={stylesTable.table_td_right}>Заключение</th>
                                <th className={stylesTable.table_td_right}>Рекомендации</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.specExams && props.specExams.map((exam) => {
                                return <SpecExamRow
                                    key={exam.id}
                                    specExam={exam}
                                    showModalDeleteExam={(e) => clickDeleteHandler(e, exam)}/>;
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

export default ChildSpecExams;