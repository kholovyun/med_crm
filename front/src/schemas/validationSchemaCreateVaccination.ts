import * as yup from "yup";

export const validationSchemaCreateVaccination = yup.object().shape({
    infection: yup.string()
        .max(256, "Максимум 256 символов")
        .trim()
        .required("Обязательно для заполнения"),
    vaccine: yup.string()
        .trim(),
    age: yup.string()
        .max(256, "Максимум 256 символов")
        .trim(),
    date: yup.date(),
    dose: yup.string()
        .max(256, "Максимум 256 символов")
        .trim(),
    serial: yup.string()
        .max(256, "Максимум 256 символов")
        .trim(),
    manufacturer: yup.string()
        .max(256, "Максимум 256 символов")
        .trim(),
    reaction: yup.string()
        .max(256, "Максимум 256 символов")
        .trim(),
    conterindication: yup.string()
        .max(256, "Максимум 256 символов")
        .trim(),
    notes: yup.string()
        .max(256, "Максимум 256 символов")
        .trim(),
});