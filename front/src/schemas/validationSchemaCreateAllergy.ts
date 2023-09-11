import * as yup from "yup";

export const validationSchemaCreateAllergy = yup.object().shape({
    type: yup.string()
        .max(40, "Максимум 40 символов")
        .trim()
        .required("Обязательно для заполнения"),
    symptom: yup.string()
        .max(80, "Максимум 80 символов")
        .trim()
        .required("Обязательно для заполнения"),
    factors: yup.string()
        .max(80, "Максимум 80 символов")
        .trim()
        .required("Обязательно для заполнения")
});