import * as yup from "yup";

export const validationSchema = yup.object().shape({
    password: yup.string().required("Обязательно для заполнения"),
    email: yup.string()
        .email("Введите корректный Email")
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Введите корректный Email")
        .required("Поле не должно быть пустым"),
});