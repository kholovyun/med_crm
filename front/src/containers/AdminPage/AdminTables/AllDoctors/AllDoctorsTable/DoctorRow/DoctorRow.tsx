import { FunctionComponent, ReactElement, MouseEventHandler } from "react";
import styles from "../../../AllTables.module.css";
import IDoctorRowProps from "./IDoctorRowProps";
import { useNavigate } from "react-router-dom";
import SwitchDiv from "../../../../../../components/UI/SwitchDiv/SwitchDiv";

const DoctorRow: FunctionComponent<IDoctorRowProps> = (props: IDoctorRowProps): ReactElement => {
    const navigate = useNavigate();
    const navigateCabinetHandler = (e: React.MouseEvent<HTMLElement>, id: string) => {
        e.stopPropagation();
        navigate(`/doctor-cabinet/${id}`);
    };

    return (  
        <tr className={styles.table_tr} onClick={(e) => navigateCabinetHandler(e, props.doctor.userId)}>
            <td className={styles.table_td_right}>{props.doctor.users.surname} {props.doctor.users.name} {props.doctor.users.patronim ? props.doctor.users.patronim : ""}</td>
            <td className={styles.table_td_right}>{props.doctor.users.email}</td>
            <td className={styles.table_td_right}>{props.doctor.users.phone}</td>
            <td className={styles.table_td_right}>{props.doctor.speciality}</td>
            <td className={styles.table_td_right}>
                {props.doctor.price}
                <div className={styles.btn_edit}>
                    <div className={styles.pencil_icon} onClick={props.clickOpenPriceModal}>
                    </div>
                </div>
            </td>
            <td className={styles.table_td_right}>
                {props.doctor.users.isBlocked ?
                    <div className={styles.switch_td} key={`bl-${props.doctor.id}`} onClick={props.clickBlock as MouseEventHandler<HTMLDivElement>}>
                        <SwitchDiv isOn={true} />
                    </div>
                    :
                    <div className={styles.switch_td} key={`bl-${props.doctor.id}`} onClick={props.clickBlock as MouseEventHandler<HTMLDivElement>}>
                        <SwitchDiv isOn={false}/>
                    </div>
                }
            </td>
            <td className={styles.table_td}>
                {props.doctor.isActive ?
                    <div className={styles.switch_td} key={`ac-${props.doctor.id}`} onClick={props.clickActivate as MouseEventHandler<HTMLDivElement>}>
                        <SwitchDiv isOn={true} />
                    </div>
                    :
                    <div className={styles.switch_td} key={`notac-${props.doctor.id}`} onClick={props.clickActivate as MouseEventHandler<HTMLDivElement>}>
                        <SwitchDiv isOn={false}/>
                    </div>
                }
            </td>
        </tr>           
    );
};

export default DoctorRow;