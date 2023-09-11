import IDoctorWithUser from "../../../../interfaces/IDoctor/IDoctorWithUser";

export default interface IEditDoctorFormProps {
    modalCloser: () => void
    doctorData: IDoctorWithUser
}