import { ChangeEvent, FunctionComponent, ReactElement, useEffect, useState } from "react";
import styles from "../AllTables.module.css";
import { useAppSelector } from "../../../../app/hooks";
import { useGetDoctorsQuery } from "../../../../app/services/doctors";
import IDoctorWithUser from "../../../../interfaces/IDoctor/IDoctorWithUser";
import { useLazyGetChildrenByDoctorQuery } from "../../../../app/services/children";
import Loader from "../../../../components/UI/Loader/Loader";
import AllChildrenTable from "./AllChildrenTable/AllChildrenTable";
import Pagination from "../../../../components/UI/Pagination/Pagination";
import AccessControl from "../../../../permissionRoutes/AccessControl";
import { ERoles } from "../../../../enums/ERoles";
import formStyles from "../../../UserForms/UserForms.module.css";
import errorHandler from "../../../../helpers/errorHandler";

const AllChildren: FunctionComponent = (): ReactElement => {
    const { user } = useAppSelector(state => state.auth);
    const limit = 10;
    const [pages, setPages] = useState<number>(0);
    const [offset, setOffset] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(1);
    const { data: doctors, refetch } = useGetDoctorsQuery({});
    const [thisDoctor, setThisDoctor] = useState<IDoctorWithUser | null>(null);
    const [getChildren,
        { data: children,
            isError: isChildrenGetError,
            error: getChildrenError,
            isLoading }
    ] = useLazyGetChildrenByDoctorQuery();

    const getChildrenByDoctor = async () => {
        thisDoctor && await getChildren({ offset, limit, id: thisDoctor.id });
    };

    useEffect(() => {
        doctors && setThisDoctor(doctors.rows[0]);
    }, [doctors]);

    useEffect(() => {
        if (children && children.rows) {
            children.count % limit !== 0
                ? setPages(Math.floor(children.count / limit) + 1)
                : setPages(children.count / limit);
        }
    }, []);

    useEffect(() => {
        getChildrenByDoctor();
    }, [thisDoctor]);

    useEffect(() => {
        refetch();
    }, [user]);

    useEffect(() => {
        setOffset((currentPage - 1) * limit);
    }, [currentPage]);

    errorHandler(isChildrenGetError, getChildrenError);

    const selectHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
        if (doctors) {
            const doctor: IDoctorWithUser[] = doctors.rows.filter((doc) => doc.id === e.target.value);
            setThisDoctor(doctor[0]);
        }
    };

    return (
        <div className={styles.list_container}>
            <div className={styles.group_row}>
                <h1 className={styles.h1_title}>Список пациентов</h1>
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
            {children === undefined || !children.rows.length ?
                <p>Нет данных</p>
                :
                <div className={styles.list_table_box}>
                    {thisDoctor && <AllChildrenTable
                        doctorId={thisDoctor.id} 
                        allChildren={children.rows} />}
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

export default AllChildren;