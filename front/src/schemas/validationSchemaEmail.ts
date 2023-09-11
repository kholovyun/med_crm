import * as yup from "yup";

export const validationSchemaEmail = yup.object().shape({
    email: yup.string()
        .email("Введите корректный Email")
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Введите корректный Email")
        .required("Поле не должно быть пустым"),
});