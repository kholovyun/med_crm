import {useEffect} from "react";
import { toast } from "react-toastify";

const successHandler = (isSuccess: boolean, successMessage: string, callback?: () => void) => {
    return useEffect(() => {
        if (isSuccess) {
            callback && callback();
            toast.info(successMessage);
        }
    }, [isSuccess]);
};

export default successHandler;