import styles from "./Home.module.css";
import { Container } from "../../components/UI/Container/Container";
import { useNavigate } from "react-router-dom";
import { EBtnSize } from "../../enums/EBtnSize";
import Btn from "../../components/UI/Btn/Btn";
import homePhoto from "../../assets/img/Home.png";
import { EBtnClass } from "../../enums/EBtnClass";
import TransparentLink from "../../components/UI/TransparentLink/TransparentLink";
import { FunctionComponent, ReactElement, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { useLazyCheckTokenQuery } from "../../app/services/users";
import { getTokenFromStorage } from "../../helpers/getTokenFromStorage";

export const Home: FunctionComponent = (): ReactElement => {
    const navigate = useNavigate();
    const { user } = useAppSelector(state => state.auth);
    const [getNewToken] = useLazyCheckTokenQuery();    
    const localToken = getTokenFromStorage();

    useEffect(() => {
        if (localToken) getNewToken();
    }, []);

    useEffect(() => {
        user && navigate("/login");
    }, [user]);

    return (
        <Container>
            <div className={styles.home_img_box}>
                <img src={homePhoto} className={styles.img} alt="home image" />
                <div className={styles.home_content_row}>
                    <h1 className={styles.homeTitle}>Надежный партнер в заботе о Вашем ребенке</h1>
                    <div className={styles.btn_group}>
                        <Btn title={"Вход"} 
                            onclick={() => navigate("/login")}
                            size={EBtnSize.big}
                            btnClass={EBtnClass.dark_active}/>
                        <TransparentLink title={"Подписка"} pathTo={"/"} size={EBtnSize.big} />
                    </div>
                </div>
            </div>
        </Container>
    );
};
