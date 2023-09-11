import { FunctionComponent, ReactElement, useEffect } from "react";
import { Container } from "../../components/UI/Container/Container";
import { CardChildPage } from "../../components/CardChildPage/CardChildPage.tsx";
import { useGetChildrenByIdQuery } from "../../app/services/children.ts";
import { useLocation, useParams } from "react-router-dom";
import ChildQuestions from "../../components/ChildQuestions/ChildQuestions.tsx";
import { useLazyGetQuestionsByChildIdQuery } from "../../app/services/questions.ts";
import { ContentLinkRow } from "../../components/UI/ContentLinkRow/ContentLinkRow.tsx";
import LinkWithChildren from "../../components/UI/LinkWithChildren/LinkWithChildren.tsx";
import { ERoles } from "../../enums/ERoles.ts";
import CarouselBlock from "../../components/CarouselBlock/CarouselBlock.tsx";
import AskQuestionForm from "../../components/AskQuestionForm/AskQuestionForm.tsx";
import { useLazyGetVisitsByChildIdQuery } from "../../app/services/visits.ts";
import ChildVisits from "../../components/ChildTables/ChildVisits/ChildVisits.tsx";
import ChildAllergies from "../../components/ChildTables/ChildAllergies/ChildAllergies.tsx";
import { useLazyGetAllergiesByChildIdQuery } from "../../app/services/allergies.ts";
import ChildVaccinations from "../../components/ChildTables/ChildVaccinations/ChildVaccinations.tsx";
import { useLazyGetVaccinationsByChildIdQuery } from "../../app/services/vaccinations.ts";
import { useLazyGetSpecExamsByChildIdQuery } from "../../app/services/specExams.ts";
import NewbornData from "./NewbornData/NewbornData.tsx";
import ChildSpecExams from "../../components/ChildTables/ChildSpecExams/ChildSpecExams.tsx";
import { useCreateDocumentMutation, useDeleteDocumentMutation, useGetDocumentsByChildIdQuery } from "../../app/services/documents.ts";
import { EDocumentsDirectories } from "../../enums/EDocumentsDirectories.ts";

export const ChildCabinetPage: FunctionComponent = (): ReactElement => {
    const params = useParams();
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    const doctorId: string = location.state.doctorId;
    const { data: child, isSuccess } = useGetChildrenByIdQuery(`${params.id}`);
    const [getQuestions, { data: questionsData }] = useLazyGetQuestionsByChildIdQuery();
    const [getVisits, { data: visitsData }] = useLazyGetVisitsByChildIdQuery();
    const [getAllergies, { data: allergiesData }] = useLazyGetAllergiesByChildIdQuery();
    const [getVaccinations, { data: vaccinationsData }] = useLazyGetVaccinationsByChildIdQuery();
    const [getExaminations, { data: examsData }] = useLazyGetSpecExamsByChildIdQuery();
    return (
        <Container>
            {isSuccess && <CardChildPage data={child} />}
            {child && <CarouselBlock
                id={child.id}
                carouselTitle="Результаты последних обследований"
                addElementText="Добавить новый результат"
                noElementsText="Результаты еще не добавлены"
                directoryName={EDocumentsDirectories.child}
                initialState={{childId: child.id, url: undefined}}
                role={ERoles.PARENT}
                useCreateMutation={useCreateDocumentMutation}
                useDeleteMuatation={useDeleteDocumentMutation}
                useGetElementsQuery={useGetDocumentsByChildIdQuery}
            />}
            {child && <AskQuestionForm
                childId={String(params.id)}
                doctorId={doctorId}
                parentId={child.parentId}
            />}
            {child && <ContentLinkRow>
                <LinkWithChildren fn={() => getQuestions(child.id)} text={"Ранее заданные вопросы"}>
                    {child && questionsData &&
                        <ChildQuestions questions={questionsData}
                            childData={
                                {
                                    name: child.name,
                                    surname: child.surname,
                                    patronim: child.patronim ? child.patronim : "",
                                    photo: child.photo
                                }
                            } />
                    }
                </LinkWithChildren>
                <LinkWithChildren fn={() => getVisits(child.id)} text={"Приемы у врача"}>
                    {child && visitsData && <ChildVisits childId={child.id} visits={visitsData} />}
                </LinkWithChildren>
                <LinkWithChildren fn={() => console.log("Сведения о новорожденном")} text={"Сведения о новорожденном"}>
                    {child && <NewbornData child={child} />}
                </LinkWithChildren>
                <LinkWithChildren fn={() => getVaccinations(child.id)} text={"Сведения о профилактических прививках"}>
                    {child && vaccinationsData &&
                        <ChildVaccinations
                            vaccinations={vaccinationsData}
                            childId={child.id}
                        />
                    }
                </LinkWithChildren>
                <LinkWithChildren fn={() => getAllergies(child.id)} text={"Сведения об аллергическом статусе"}>
                    {child && allergiesData &&
                        <ChildAllergies
                            childId={child.id}
                            allergies={allergiesData} />}
                </LinkWithChildren>
                <LinkWithChildren fn={() => getExaminations(child.id)} text={"Осмотры врачами других специальностей"}>
                    {child && examsData &&
                        <ChildSpecExams
                            specExams={examsData}
                            childId={child.id} />
                    }
                </LinkWithChildren>
            </ContentLinkRow>
            }
        </Container>
    );
};
