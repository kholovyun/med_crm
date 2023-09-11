import { ChangeEvent, FunctionComponent, ReactElement, useEffect, useState } from "react";
import styles from "../AllTables.module.css";
import { NavLink } from "react-router-dom";
import AllParentsTable from "./AllParentsTable/AllParentsTable";
import { ERoles } from "../../../../enums/ERoles";
import { useLazyGetParentsByDoctorQuery } from "../../../../app/services/parents";
import TransparentLink from "../../../../components/UI/TransparentLink/TransparentLink";
import { EBtnSize } from "../../../../enums/EBtnSize";
import Loader from "../../../../components/UI/Loader/Loader";
import Pagination from "../../../../components/UI/Pagination/Pagination";
import AccessControl from "../../../../permissionRoutes/AccessControl";
import formStyles from "../../../UserForms/UserForms.module.css";
import { useGetDoctorsQuery } from "../../../../app/services/doctors";
import IDoctorWithUser from "../../../../interfaces/IDoctor/IDoctorWithUser";
import { useAppSelector } from "../../../../app/hooks";
import errorHandler from "../../../../helpers/errorHandler";

const AllParents: FunctionComponent = (): ReactElement => {
    const { user } = useAppSelector(state => state.auth);
    const limit = 10;
    const [pages, setPages] = useState<number>(0);
    const [offset, setOffset] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(1);
    const { data: doctors, refetch } = useGetDoctorsQuery({});
    const [thisDoctor, setThisDoctor] = useState<IDoctorWithUser | null>(null);
    const [getParents,
        { data: parents, error: getParentsError, isError: isParentsGetError, isLoading }
    ] = useLazyGetParentsByDoctorQuery();

    const getParentsByDoctor = async () => {
        if (thisDoctor) {
            await getParents({ offset, limit, id: thisDoctor.id });
        }
    };

    useEffect(() => {
        doctors && setThisDoctor(doctors.rows[0]);
    }, [doctors]);

    useEffect(() => {
        if (parents && parents.rows) {
            parents.count % limit !== 0
                ? setPages(Math.floor(parents.count / limit) + 1)
                : setPages(parents.count / limit);
        }
    }, []);

    useEffect(() => {
        getParentsByDoctor();
    }, [thisDoctor]);

    useEffect(() => {
        refetch();
    }, [user]);

    useEffect(() => {
        setOffset((currentPage - 1) * limit);
    }, [currentPage]);

    const selectHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
        if (doctors) {
            const doctor: IDoctorWithUser[] = doctors.rows.filter((doc) => doc.id === e.target.value);
            setThisDoctor(doctor[0]);
        }
    };

    errorHandler(isParentsGetError, getParentsError);

    return (
        <div className={styles.list_container}>
            <div className={styles.group_row}>
                <h1 className={styles.h1_title}>Список родителей пациентов</h1>
                <div className={styles.add_link_colappsed}>
                    <NavLink
                        className={`${styles.add_icon} ${styles.add_parent_icon}`}
                        to={`/admin-page/register-parent/${thisDoctor?.id}`}
                    ></NavLink>
                </div>
                <div className={styles.collapsing_link}>
                    <TransparentLink
                        title={"Зарегистрировать родителя"}
                        size={EBtnSize.tiny}
                        pathTo={`/admin-page/register-parent/${thisDoctor?.id}`}
                    />
                </div>
            </div>
            {isLoading && <Loader />}
            <AccessControl allowedRoles={[ERoles.ADMIN, ERoles.SUPERADMIN]}>
                <div className={styles.group_row}>
                    <label htmlFor={"doctor"} className={formStyles.label_text}>Врач</label>
                    <div className={formStyles.input_flex_column}>
                        <div className={formStyles.tiny_select_wraper}>
                            <select className={formStyles.tiny_select} id={"doctor"} name="doctor" onChange={selectHandler}>
                                {doctors && doctors.rows.map((doctor) => {
                                    return (
                                        <option key={doctor.id} className={formStyles.custom_option} value={doctor.id}>
                                            {doctor.users.surname}{" "}{doctor.users.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                </div>
            </AccessControl>
            {parents === undefined || !parents.rows.length ?
                <p>Нет данных</p>
                :
                <div className={styles.list_table_box}>
                    <AllParentsTable parents={parents.rows} />
                    {pages > 1 ? (
                        <Pagination
                            currentPage={currentPage}
                            lastPage={pages}
                            maxLength={7}
                            setCurrentPage={setCurrentPage}
                        />
                    ) : null}
                </div>
            }
        </div>
    );
};

export default AllParents;