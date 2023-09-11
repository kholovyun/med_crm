import * as yup from "yup";

export const validationSchemaCreateVisit = yup.object().shape({
    reason: yup.string()
        .max(30, "Максимум 30 символов")
        .required("Обязательно для заполнения"),
    clinicData: yup.string()
        .trim()
        .required("Обязательно для заполнения"),
    conclusion: yup.string()
        .trim()
        .required("Обязательно для заполнения"),
    appointment: yup.string()
        .trim()
        .required("Обязательно для заполнения"),
    place: yup.string()
        .max(250, "Максимум 250 символов")
        .trim()
        .required("Обязательно для заполнения"),
    date: yup.date()
        .required("Обязательно для заполнения")
        .nullable()
});