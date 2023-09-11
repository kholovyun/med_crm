import { FC, ReactElement, useState } from "react";
import styles from "./DoctorInformation.module.css";
import Modal from "../../../components/UI/Modal/Modal";
import EditDoctorForm from "./EditDoctorForm/EditDoctorForm";
import IDoctorWithUser from "../../../interfaces/IDoctor/IDoctorWithUser";
import Btn from "../../../components/UI/Btn/Btn";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnTypes } from "../../../enums/EBtnTypes";
import AvatarBox from "../../../components/AvatarBox/AvatarBox";
import { ERoles } from "../../../enums/ERoles";
import { EBtnClass } from "../../../enums/EBtnClass";
import AccessControl from "../../../permissionRoutes/AccessControl";
import ageTextFormatter from "../../../helpers/ageTextFormatter";
import defaultImg from "../../../assets/img/default-doctor.svg";
import { useEditDoctorMutation } from "../../../app/services/doctors";
import { EImageDirectories } from "../../../enums/EImageDirectories";

interface IDoctorInformationProps {
    doctor: IDoctorWithUser
    role: ERoles
}

const DoctorInformation: FC<IDoctorInformationProps> = ({ doctor, role }): ReactElement => {
    const [showEditUserModal, setShowEditUserModal] = useState(false);

    const editPersonalInformationModalCloser = () => {
        setShowEditUserModal(false);
    };

    return (
        <div className={styles.doctorInformationBlock}>
            <Modal show={showEditUserModal} close={editPersonalInformationModalCloser}>
                <EditDoctorForm
                    modalCloser={editPersonalInformationModalCloser}
                    doctorData={doctor!}
                />
            </Modal>
            <AvatarBox
                role={ERoles.DOCTOR}
                height={320}
                width={300}
                avatar={doctor?.photo}
                id={doctor?.id}
                directoryName={EImageDirectories.doctor}
                defaultImg={defaultImg}
                useMutation={useEditDoctorMutation}
            />
            <div className={styles.personalInformationBox}>
                <div className={styles.personalInformationLine}>
                    <div className={styles.personalInformationField}>
                        <p className={styles.fieldTitle}>ФИО</p>
                        <p className={styles.fieldText}>{doctor?.users.name} {doctor?.users.surname} {doctor?.users.patronim}</p>
                    </div>
                </div>
                <div className={styles.personalInformationLine}>
                    <div className={styles.personalInformationField}>
                        <p className={styles.fieldTitle}>Специальность</p>
                        <p className={styles.fieldText}>{doctor?.speciality}</p>
                    </div>
                    <div className={styles.personalInformationField}>
                        <p className={styles.fieldTitle}>Стаж</p>
                        <p className={styles.fieldText}>
                            {doctor.experience} {ageTextFormatter(doctor.experience)}
                        </p>
                    </div>
                </div>
                <div className={styles.personalInformationLine}>
                    <div className={styles.personalInformationField}>
                        <p className={styles.fieldTitle}>Степень</p>
                        <p className={styles.fieldText}>{doctor?.degree}</p>
                    </div>
                    {
                        role === ERoles.DOCTOR ||
                            role === ERoles.ADMIN ||
                            role === ERoles.SUPERADMIN ?
                            <div className={styles.personalInformationField}>
                                {<p className={styles.fieldTitle}>Моб.телефон</p>}
                                <p className={styles.fieldText}>{doctor?.users.phone}</p>
                            </div> : null}
                </div>
                <div className={styles.personalInformationLine}>
                    <div className={styles.personalInformationField}>
                        <p className={styles.fieldTitle}>Достижения</p>
                        <p className={styles.fieldText}>{doctor?.achievements}</p>
                    </div>
                </div>
                <div className={styles.personalInformationLine}>
                    <div className={styles.personalInformationField}>
                        <p className={styles.fieldTitle}>Место работы</p>
                        <p className={styles.fieldText}>{doctor?.placeOfWork}</p>
                    </div>
                    <AccessControl allowedRoles={[ERoles.DOCTOR]}>
                        <div className={styles.personalInformationButton}>
                            <Btn onclick={() => setShowEditUserModal(true)}
                                btnClass={EBtnClass.dark_active}
                                size={EBtnSize.tiny}
                                types={EBtnTypes.submit}
                                title="Редактировать" />
                        </div>
                    </AccessControl>
                </div>  
            </div>
        </div>
    );
};

export default DoctorInformation;