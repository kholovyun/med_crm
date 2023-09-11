import { FunctionComponent, ReactElement } from "react";
import IDoctorCardProps from "./IDoctorCardProps";
import styles from "../Cards.module.css";
import defaultImage from "../../../../assets/img/default-doctor.svg";
import { useNavigate } from "react-router-dom";
import Btn from "../../../../components/UI/Btn/Btn";
import { EBtnSize } from "../../../../enums/EBtnSize";
import { EBtnClass } from "../../../../enums/EBtnClass";

const DoctorCard: FunctionComponent<IDoctorCardProps> = (props: IDoctorCardProps): ReactElement => {
    const navigate = useNavigate();

    return (
        <div className={styles.card_box}>
            <div className={styles.data_column}>
                <h1 className={styles.h1_title}>Данные о враче</h1>
                <div className={styles.card_row}>
                    <div className={styles.image_box_row}>
                        <div className={styles.image_box}>
                            <img
                                className={styles.doctor_img}
                                onError={(e) => {
                                    e.currentTarget.src = defaultImage;
                                }}
                                src={`${import.meta.env.VITE_BASE_URL}/uploads/doctorsImgs/${props.doctor.photo}`}
                                alt={"изображение"}
                            />
                        </div>
                        <div className={styles.doctor_name_column}>
                            <p className={`${styles.body_text} ${styles.overflow_text}`}>{props.doctor.users.surname}</p>
                            <p className={`${styles.body_text} ${styles.overflow_text}`}>{props.doctor.users.name}</p>
                            <p className={`${styles.body_text} ${styles.overflow_text}`}>{props.doctor.users.patronim}</p>
                        </div>
                    </div>
                </div>
                {props.doctor.degree ?
                    <div className={styles.card_row}>
                        <p className={`${styles.body_text} ${styles.gray_text}`}>Степень </p>
                        <p className={`${styles.body_text}`}>{props.doctor.degree}</p>
                    </div> :
                    <div className={styles.card_row}>
                        <p className={`${styles.body_text} ${styles.gray_text}`}>Специализация </p>
                        <p className={`${styles.body_text}`}>{props.doctor.speciality}</p>
                    </div>
                }
                <div className={styles.card_row}>
                    <p className={`${styles.body_text} ${styles.gray_text}`}>Стаж работы </p>
                    <p className={`${styles.body_text}`}>{props.doctor.experience}</p>
                </div>
            </div>
            <div className={styles.btn_row}>
                <Btn title={"На страницу врача"}
                    size={EBtnSize.small} btnClass={EBtnClass.white_active}
                    onclick={() => navigate(`/doctor-cabinet/${props.doctor.userId}`)}
                />
            </div>
        </div>
    );
};

export default DoctorCard;