import { useEditChildMutation } from "../../../app/services/children";
import { useEditDoctorMutation } from "../../../app/services/doctors";

export default interface IAvatarUploaderProps {
    width: number
    height: number
    id: string
    modalCloser: () => void
    useMutation: 
        typeof useEditChildMutation |
        typeof useEditDoctorMutation
}