import * as yup from "yup";

export const validationSchemaCreateReview = yup.object().shape({
    text: yup.string()
        .max(250, "Максимум 250 символов")
        .trim()
        .required("Обязательно для заполнения")
});