import * as yup from "yup";

export const validationSchemaRecommendation = yup.object().shape({
    text: yup.string().required("Обязательно для заполнения")
        .trim()
});