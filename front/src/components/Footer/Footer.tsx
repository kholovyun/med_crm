import { FunctionComponent, ReactElement } from "react";
import styles from "./Footer.module.css";
import { NavLink } from "react-router-dom";

const Footer: FunctionComponent = (): ReactElement => {
    function openGmailCompose():void {
        const email = "zabotik.help@yandex.ru";
        const subject:string = encodeURIComponent("Тема письма");
        const body:string = encodeURIComponent("Текст письма");

        const gmailComposeUrl:string = "https://mail.google.com/mail/?view=cm&fs=1&to=" + email + "&su=" + subject + "&body=" + body;
        window.open(gmailComposeUrl);
    }
    return (
        <div className={styles.Footer_bg}>
            <div className={styles.Footer_content_container}>
                <div className={styles.Footer_flex_column}>
                    <NavLink to={"/"} className={styles.FooterNavlink}>Договор оферты</NavLink>
                    <NavLink to={"/"} className={`${styles.FooterNavlink}`}>Политика конфеденциальности</NavLink>
                </div>
                <div className={styles.Footer_flex_column}>
                    <p className={styles.FooterContactsTitle}>Контакты для связи</p>
                    <div className={styles.icoContactBox}>
                        <div className={`${styles.icoContact}`}></div>
                        <a 
                            href="https://t.me/Alinaardamina" 
                            className={`${styles.icoContact} ${styles.icoContactItemTelegram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        />
                        <a 
                            href="#" 
                            onClick={openGmailCompose}
                            target={"_blank"}
                            className={`${styles.icoContact} ${styles.icoContactItemWhatsapp}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;