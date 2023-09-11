import { FunctionComponent, ReactElement } from "react";
import styles from "./ChildCard.module.css";
import IChildCardProps from "./IChildCardProps";
import defaultImage from "../../../../assets/img/default-child-photo.svg";
import { useNavigate } from "react-router-dom";
import { EBtnSize } from "../../../../enums/EBtnSize";
import Btn from "../../../../components/UI/Btn/Btn";
import { EBtnClass } from "../../../../enums/EBtnClass";

const ChildCard: FunctionComponent<IChildCardProps> = ({child, doctorId}): ReactElement => {
    const navigate = useNavigate();

    return (
        <div className={styles.childCard}>
            <div className={styles.childCard_top}>
                <div className={styles.childCard_image}>
                    <img
                        onError={(e) => {
                            e.currentTarget.src = defaultImage;
                        }}
                        src={`${import.meta.env.VITE_BASE_URL}/uploads/childrenImgs/${child.photo}`}
                        alt={"child_photo"}
                    />
                </div>
                <div className={styles.childCard_information}>
                    <p>{child.surname}</p>
                    <p>{child.name}</p>
                    <p>{child.patronim}</p>
                    <p className={styles.birthday}>{new Date(child.dateOfBirth).toLocaleDateString()}</p>
                </div>
            </div>
            <div className={styles.childCard_bottom}>
                <Btn
                    btnClass={EBtnClass.white_active}
                    title="Подробнее"
                    size={EBtnSize.small}
                    onclick={() => navigate(`/child-cabinet/${child.id}`, { state: { doctorId: doctorId } })} />
            </div>
        </div>
    );
};

export default ChildCard;