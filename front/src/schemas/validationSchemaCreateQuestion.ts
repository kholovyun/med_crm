import * as yup from "yup";

export const validationSchemaCreateQuestion = yup.object().shape({
    question: yup.string()
        .max(250, "Максимум 250 символов")
        .trim()
        .required("Обязательно для заполнения")
});