import styles from "./CardChildPage.module.css";
import {FC, useState} from "react";
import IChildGetDto from "../../interfaces/IChild/IChildGetDto.ts";
import AvatarBox from "../AvatarBox/AvatarBox.tsx";
import {ERoles} from "../../enums/ERoles.ts";
import Modal from "../UI/Modal/Modal.tsx";
import EditChildForm from "./EditChildForm/EditChildForm.tsx";
import AccessControl from "../../permissionRoutes/AccessControl.tsx";
import Btn from "../UI/Btn/Btn.tsx";
import {EBtnSize} from "../../enums/EBtnSize.ts";
import {EBtnTypes} from "../../enums/EBtnTypes.ts";
import {EBtnClass} from "../../enums/EBtnClass.ts";
import ageTextFormatter from "../../helpers/ageTextFormatter.ts";
import defaultImg from "../../assets/img/default-child-photo.svg";
import { useEditChildMutation } from "../../app/services/children.ts";
import { EImageDirectories } from "../../enums/EImageDirectories.ts";
import { EMonths } from "../../enums/EMonths.ts";

type TChild = {
    data: IChildGetDto
};
export  const  CardChildPage: FC<TChild> = ( {data} ) => {
    const date:Date = new Date(data ? data.dateOfBirth : "");
    const dateNow:Date = new Date();
    const age:number = dateNow.getFullYear() - date.getFullYear();
    const [editChild, setEditChild] = useState(false);

    const openModal = () => {
        setEditChild(true);
    };

    const closeModal = () => {
        setEditChild(false);
    };
    return (
        <div className={styles.childBoxFirstTop}>
            <Modal show={editChild} close={closeModal}>
                <EditChildForm childData={data} closeModal={closeModal}/>
            </Modal>
            <AvatarBox 
                role={ERoles.PARENT}
                width={300}
                height={300}
                avatar={data.photo}
                id={data.id}
                directoryName={EImageDirectories.child}
                defaultImg={defaultImg}
                useMutation={useEditChildMutation}
            />
            <div className={styles.informationBox}>
                <div className={styles.line}>
                    <div className={styles.field}>
                        <p className={styles.fieldTitle}>Фамилия</p>
                        <p className={styles.fieldText}>{data.surname}</p>
                    </div>
                    <div className={styles.field}>
                        <p className={styles.fieldTitle}>Возраст</p>
                        <p className={styles.fieldText}>{age} {ageTextFormatter(age)}</p>
                    </div>
                </div>
                <div className={styles.line}>
                    <div className={styles.field}>
                        <p className={styles.fieldTitle}>Имя</p>
                        <p className={styles.fieldText}>{data.name}</p>
                    </div>
                    <div className={styles.field}>
                        <p className={styles.fieldTitle}>Рост</p>
                        <p className={styles.fieldText}>{data.height} см</p>
                    </div>
                </div>
                <div className={styles.line}>
                    <div className={styles.field}>
                        <p className={styles.fieldTitle}>Отчество</p>
                        <p className={styles.fieldText}>{data.patronim}</p>
                    </div>
                    <div className={styles.field}>
                        <p className={styles.fieldTitle}>Вес</p>
                        <p className={styles.fieldText}>{data.weight} кг</p>
                    </div>
                </div>
                <div className={styles.line}>
                    <div className={styles.field}>
                        <p className={styles.fieldTitle}>Дата рождения</p>
                        <div className={styles.fieldTextBirthday}>
                            <p>{date?.getDate()}</p>
                            <p>{EMonths[date?.getMonth()]}</p>
                            <p>{date?.getFullYear()}</p>
                        </div>
                        <p className={styles.fieldTextBirthdayTablet}>{new Date(data.dateOfBirth).toLocaleDateString()}{" "}</p>
                    </div>
                    <AccessControl allowedRoles={[ERoles.PARENT, ERoles.DOCTOR]}>
                        <div className={styles.fieldButton}>
                            <Btn 
                                onclick={openModal}
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