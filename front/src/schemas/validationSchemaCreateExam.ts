import * as yup from "yup";

export const validationSchemaCreateExam = yup.object().shape({
    specialist: yup.string()
        .max(256, "Максимум 256 символов")
        .trim()
        .required("Обязательно для заполнения"),
    name: yup.string()
        .max(256, "Максимум 256 символов")
        .trim()
        .required("Обязательно для заполнения"),
    date: yup.date()
        .required("Обязательно для заполнения")
        .nullable(),
    conclusion: yup.string()
        .trim()
        .required("Обязательно для заполнения"),
    recommend: yup.string()
        .trim()
        .required("Обязательно для заполнения"),
});