import { FC, ReactElement } from "react";
import { Container } from "../../components/UI/Container/Container";
import { useAppSelector } from "../../app/hooks";
import "react-alice-carousel/lib/alice-carousel.css";
import { useGetDoctorByUserIdQuery } from "../../app/services/doctors";
import { useNavigate, useParams } from "react-router-dom";
import { ERoles } from "../../enums/ERoles";
import DoctorRecommendations from "./DoctorRecommendations/DoctorRecommendations";
import CarouselBlock from "../../components/CarouselBlock/CarouselBlock";
import DoctorInformation from "./DoctorInformation/DoctorInformation";
import AccessControl from "../../permissionRoutes/AccessControl";
import { useCreateDiplomaMutation, useDeleteDiplomaMutation, useGetDiplomasByDoctorQuery } from "../../app/services/diplomas";
import { EDocumentsDirectories } from "../../enums/EDocumentsDirectories";
import DoctorQuestions from "./DoctorQuestions/DoctorQuestions";
import styles from "./DoctorCabinetPage.module.css";

const DoctorCabinetPage:FC = ():ReactElement => {
    const params = useParams();
    const { user } = useAppSelector(state => state.auth);
    const { data: doctor } = useGetDoctorByUserIdQuery({ id: user?.role === ERoles.DOCTOR ? user?.id : String(params.id) });
    const navigate = useNavigate();    

    return (
        <Container>
            {doctor && <DoctorInformation doctor={doctor} role={user!.role} />}

            {doctor && <CarouselBlock 
                id={doctor.id}
                directoryName={EDocumentsDirectories.doctor}
                carouselTitle={"Сертификаты о дополнительном образовании"} 
                noElementsText={"Сертификаты еще не добавлены"}
                addElementText={"Добавить новый сертификат"}
                initialState={{ doctorId: doctor.id, url: undefined }}
                useGetElementsQuery={useGetDiplomasByDoctorQuery}
                useCreateMutation={useCreateDiplomaMutation}
                useDeleteMuatation={useDeleteDiplomaMutation}
                role={ERoles.DOCTOR}
            />}

            {doctor && <DoctorRecommendations role={user!.role} doctorId={doctor.id} />}
            
            <AccessControl allowedRoles={[ERoles.DOCTOR]}>
                <div className={styles.adminPanelBtn} onClick={() => navigate("/admin-page/children")}>
                    <p>Перейти в админ панель</p>
                    <div className={styles.arrow}/>
                </div>
                {doctor && <DoctorQuestions id={doctor.id}/>}
            </AccessControl>
            
        </Container>
    );
};

export default DoctorCabinetPage;