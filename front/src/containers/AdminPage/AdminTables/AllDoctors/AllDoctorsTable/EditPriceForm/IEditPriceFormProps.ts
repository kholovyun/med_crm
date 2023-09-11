import IDoctorWithUser from "../../../../../../interfaces/IDoctor/IDoctorWithUser";

export default interface IEditPriceFormProps {
    doctor: IDoctorWithUser    
    closeModal?: () => void
}