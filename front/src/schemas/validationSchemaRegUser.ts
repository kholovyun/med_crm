import * as yup from "yup";

export const validationSchemaRegUser = yup.object().shape({
    name: yup.string()
        .test("no-spaces", "Имя не должно содержать пробелы", function (value) {
            if (value && /\s/.test(value)) {
                return false;
            }
            return true;
        })
        .required("Обязательно для заполнения"),
    surname: yup.string()
        .test("no-spaces", "Фамилия не должна содержать пробелы", function (value) {
            if (value && /\s/.test(value)) {
                return false;
            }
            return true;
        })
        .required("Обязательно для заполнения"),
    patronim: yup.string()
        .test("no-spaces", "Отчество не должно содержать пробелы", function (value) {
            if (value && /\s/.test(value)) {
                return false;
            }
            return true;
        }),
    phone: yup.string()
        .matches(/^\+\d{1,3}\(\d{3}\)\d{2,3}-\d{2}-\d{2}$/, "Не соответствует формату")
        .required("Введите номер телефона"),
    email: yup.string()
        .email("Введите корректный Email")
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Введите корректный Email")
        .required("Поле не должно быть пустым")
});