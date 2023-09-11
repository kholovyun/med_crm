import * as yup from "yup";

export const validationSchemaEditDoctor = yup.object().shape({
    degree: yup.string()
        .trim()
        .min(4, "Минимум 4 символа")
        .max(40, "Максимум 40 символов")
        .required("Поле не должно быть пустым"),
    experience: yup.number()
        .min(1, "Минимум 1 год")
        .required("Поле не должно быть пустым"),
    placeOfWork: yup.string() 
        .trim()  
        .min(4, "Минимум 4 символа")
        .max(80, "Максимум 80 символов")
        .required("Поле не должно быть пустым"),
    achievements: yup.string()
        .trim(),
    speciality: yup.string()
        .trim()
        .required("Поле не должно быть пустым")
});