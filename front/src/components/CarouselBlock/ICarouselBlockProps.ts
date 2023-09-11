import { useCreateDiplomaMutation, useDeleteDiplomaMutation, useGetDiplomasByDoctorQuery } from "../../app/services/diplomas";
import { useCreateDocumentMutation, useDeleteDocumentMutation, useGetDocumentsByChildIdQuery } from "../../app/services/documents";
import { EDocumentsDirectories } from "../../enums/EDocumentsDirectories";
import { ERoles } from "../../enums/ERoles";
import IDiplomaCreateDto from "../../interfaces/IDiploma/IDiplomaCreateDto";
import IDocumentCreateDto from "../../interfaces/IDocument/IDocumentCreateDto";

export default interface ICarouselBlockProps {
    id: string
    role: ERoles
    directoryName: EDocumentsDirectories
    carouselTitle: string
    initialState: IDocumentCreateDto | IDiplomaCreateDto
    noElementsText: string
    addElementText: string
    useGetElementsQuery: 
        typeof useGetDiplomasByDoctorQuery |
        typeof useGetDocumentsByChildIdQuery
    useCreateMutation:
        typeof useCreateDiplomaMutation |
        typeof useCreateDocumentMutation
    useDeleteMuatation:
        typeof useDeleteDiplomaMutation |
        typeof useDeleteDocumentMutation
}