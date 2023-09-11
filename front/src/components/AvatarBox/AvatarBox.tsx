import { FC, ReactElement, useState } from "react";
import styles from "./AvatarBox.module.css";
import AvatarUploader from "./AvatarUploader/AvatarUploader";
import Modal from "../UI/Modal/Modal";
import IAvatarBoxProps from "./IAvatarBoxProps";
import AccessControl from "../../permissionRoutes/AccessControl";

const AvatarBox: FC<IAvatarBoxProps> = (props): ReactElement => {
    const {role, avatar, directoryName, height, id, width, defaultImg, useMutation} = props;
    
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const editAvatarModalCloser = () => {
        setShowAvatarModal(false);
    };
    
    return (
        <>
            <Modal show={showAvatarModal} close={editAvatarModalCloser}>
                <AvatarUploader 
                    id = {id}
                    width={width}
                    height={height}
                    modalCloser={editAvatarModalCloser}
                    useMutation={useMutation}
                />
            </Modal>
            <div 
                className={styles.avatar}
                style={{width: `${props.width}px`}}
            >
                <AccessControl allowedRoles={[role]}>
                    <div className={styles.backdrop} onClick={() => {setShowAvatarModal(true);}} />
                </AccessControl>
                
                {props.avatar !== undefined ? 
                    <img 
                        className={styles.avatarImg}
                        onError={(e) => { e.currentTarget.src = defaultImg;}}
                        src={avatar !== "" ? `${import.meta.env.VITE_BASE_URL}/uploads/${directoryName}/${avatar}` : defaultImg} alt={"avatar"}
                    /> : <img className={styles.doctorImage} src={defaultImg} alt={"avatar"}/>
                }
            </div>
        </>
        
    );
};

export default AvatarBox;