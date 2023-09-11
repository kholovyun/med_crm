import { FunctionComponent, ReactElement, useState } from "react";
import styles from "./ChildrenCardsBlock.module.css";
import IChildrenCardsBlockProps from "./IChildrenCardsBlockProps";
import ChildCard from "./ChildCard/ChildCard";
import Modal from "../../../components/UI/Modal/Modal";
import AddChildForm from "./AddChildForm/AddChildForm";

const ChildrenCardsBlock: FunctionComponent<IChildrenCardsBlockProps> = (props): ReactElement => {
    const {parentChildren, doctorId, parentId} = props;
    const [addChild, setAddChild] = useState(false);

    const openModal = () => {
        setAddChild(true);
    };

    const closeModal = () => {
        setAddChild(false);
    };
    
    return (
        <div className={styles.childrenCardsBlock}>
            {parentChildren.map(child => {
                return <ChildCard 
                    key={child.id}
                    child={child}
                    doctorId={doctorId}
                />;
            })}
            <div className={styles.addChildCard} onClick={openModal}>
                <p className={styles.addChildCardTitle}>Добавить ребенка</p>
                <div className={styles.plusIcon} />
            </div>
            <Modal show={addChild} close={closeModal} >
                <AddChildForm parentId={parentId} closeModal={closeModal}/>
            </Modal>
        </div>
    );
};

export default ChildrenCardsBlock;