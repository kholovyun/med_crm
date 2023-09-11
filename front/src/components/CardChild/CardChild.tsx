import { InfoTableChild } from "../UI/InfoTableChild/InfoTableChild";
import { FunctionalBox } from "../UI/FunctionalBox/FunctionalBox";
import { EBtnSize } from "../../enums/EBtnSize";
import styles from "./CardChild.module.css";
import Btn from "../UI/Btn/Btn";
import { FunctionComponent, ReactElement } from "react";
import defaultImage from "../../assets/img/icon_children_sidebar.svg";
import { useNavigate } from "react-router-dom";
import IChildGetDto from "../../interfaces/IChild/IChildGetDto";

type TChildCard = {
    child: IChildGetDto;
    doctorId: string
};

export const CardChild: FunctionComponent<TChildCard> = (props): ReactElement => {
    const navigate = useNavigate();

    return (
        <InfoTableChild>
            <FunctionalBox>
                <img
                    className={styles.childAvatar}
                    onError={(e) => {
                        e.currentTarget.src = defaultImage;
                    }}
                    src={`${import.meta.env.VITE_BASE_URL}/uploads/childrenImgs/${props.child.photo}`}
                    alt={"childPhoto"}
                />
                <div className={styles.docInfoBlock}>
                    <p>{props.child.name}</p>
                    <p>{props.child.surname}</p>
                    <p>{props.child.patronim || ""}</p>
                </div>
            </FunctionalBox>
            <FunctionalBox>
                <p >Дата рождения</p>
                <p className={styles.dateChildStyle}>{new Date(props.child.dateOfBirth).toLocaleDateString()}</p>
            </FunctionalBox>
            <Btn
                title="Подробнее"
                size={EBtnSize.tiny}
                onclick={() => navigate(`/child-cabinet/${props.child.id}`, { state: { doctorId: props.doctorId } })} />
        </InfoTableChild>
    );
};
