import {FunctionComponent, ReactElement, useEffect} from "react";
import styles from "./Modal.module.css";
import IModalProps from "./IModalProps";

const Modal: FunctionComponent<IModalProps> = (props: IModalProps): ReactElement => {
    useEffect(() => {
        const escapeHandler = (event: { keyCode: number; }): void => {
            if (event.keyCode === 27) {
                props.close();
            }
        };

        if (props.show) {
            document.addEventListener("keydown", escapeHandler);
        }

        return () => {
            document.removeEventListener("keydown", escapeHandler);
        };
    }, [props.show, props.close]);

    return (
        <>
            {props.show ? <div onClick={props.close} className={styles.modal_bg} /> : null}
            <div className={styles.modal_box}
                style={{
                    transform: props.show ? "translate(-50%, -50%)" : "translate(-50%, -200vh)",
                    opacity: props.show ? "1" : "0"
                }}
            >
                <div className={styles.modal_content}>
                    {props.children}
                </div>

            </div>
        </>
    );
};

export default Modal;
