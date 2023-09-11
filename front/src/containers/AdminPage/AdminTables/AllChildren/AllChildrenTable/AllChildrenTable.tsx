import { FunctionComponent, ReactElement, MouseEvent } from "react";
import IAllChildrenTableProps from "./IAllChildrenTableProps";
import styles from "../../AllTables.module.css";
import { useNavigate } from "react-router-dom";
import defaultChildPhoto from "../../../../../assets/img/default-child-photo.svg";

const AllChildrenTable: FunctionComponent<IAllChildrenTableProps> = (props: IAllChildrenTableProps): ReactElement => {
    const navigate = useNavigate();

    const navigateCabinetHandler = (e: MouseEvent<HTMLElement>, id: string) => {
        e.stopPropagation();
        navigate(`/child-cabinet/${id}`, {state: {doctorId: props.doctorId}});
    };

    return (
        <div className={styles.table_box}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.table_tr}>
                        <th className={styles.table_td_right}>Фото</th>
                        <th className={styles.table_td_right}>ФИО</th>
                        <th className={styles.table_td_right}>Дата рождения</th>
                        <th className={styles.table_td_right}>Пол</th>
                        <th className={styles.table_td}>Вес/Рост</th>
                    </tr>
                </thead>
                <tbody>
                    {props.allChildren.map(({ ...child }) => {
                        return (
                            <tr className={styles.table_tr} key={child.id}
                                onClick={(e) => navigateCabinetHandler(e, child.id)}>
                                <td className={`${styles.table_td_right} ${styles.td_for_image}`}>
                                    {child.photo !== "" ? (
                                        <img
                                            className={styles.childPhoto}
                                            onError={(e) => {
                                                e.currentTarget.src = defaultChildPhoto;
                                            }}
                                            src={`${import.meta.env.VITE_BASE_URL}uploads/childrenImgs/${child.photo}`}
                                            alt={"фото"}
                                        />
                                    ) : (
                                        <img
                                            className={styles.childPhoto}
                                            src={defaultChildPhoto}
                                            alt={"фото"}
                                        />
                                    )}
                                </td>
                                <td className={styles.table_td_right}>
                                    {child.surname} {child.name}{" "}
                                    {child.patronim ? child.patronim : ""}
                                </td>
                                <td className={styles.table_td_right}>
                                    {new Date(child.dateOfBirth).toLocaleDateString()}
                                </td>
                                <td className={styles.table_td_right}>{child.sex}</td>
                                <td className={styles.table_td}>
                                    {child.weight}кг/{child.height}см
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default AllChildrenTable;