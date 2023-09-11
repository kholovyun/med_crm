import { FunctionComponent, ReactElement, MouseEventHandler } from "react";
import styles from "../../../AllTables.module.css";
import IAdminRowProps from "./IAdminRowProps";
import { ERoles } from "../../../../../../enums/ERoles";
import SwitchDiv from "../../../../../../components/UI/SwitchDiv/SwitchDiv";

const AdminRow: FunctionComponent<IAdminRowProps> = (props: IAdminRowProps): ReactElement => {
    return (  
        <tr className={styles.table_tr}>
            <td className={styles.table_td_right}>{props.admin.surname} {props.admin.name} {props.admin.patronim ? props.admin.patronim : ""}</td>
            <td className={styles.table_td_right}>{props.admin.email}</td>
            <td className={styles.table_td_right}>{props.admin.phone}</td>
            <td className={styles.table_td_right}>
                {props.admin.role === ERoles.SUPERADMIN ? 
                    <p></p>
                    :
                    props.admin.isBlocked ?
                        <div className={styles.switch_td} onClick={props.clickBlock as MouseEventHandler<HTMLDivElement>}>
                            <SwitchDiv key={`bl-${props.admin.id}`} isOn={true} />
                        </div>
                        :
                        <div className={styles.switch_td} onClick={props.clickBlock as MouseEventHandler<HTMLDivElement>}>
                            <SwitchDiv key={`notbl-${props.admin.id}`} isOn={false}/>
                        </div>
                }                                                
            </td>
            <td className={styles.table_td}>{props.admin.role}</td>
        </tr>           
    );
};

export default AdminRow;