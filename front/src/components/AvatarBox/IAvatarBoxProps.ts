import { useEditDoctorMutation } from "../../app/services/doctors";
import { useEditChildMutation } from "../../app/services/children";
import { EImageDirectories } from "../../enums/EImageDirectories";
import { ERoles } from "../../enums/ERoles";

export default interface IAvatarBoxProps {
    role: ERoles
    avatar: string
    id: string
    width: number
    height: number
    directoryName: EImageDirectories
    defaultImg: string
    useMutation: 
        typeof useEditDoctorMutation | 
        typeof useEditChildMutation
}