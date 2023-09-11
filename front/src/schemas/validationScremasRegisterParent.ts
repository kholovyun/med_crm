import * as Yup from "yup";
import * as yup from "yup";

export const validationFirst = Yup.object().shape({
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
    email: Yup.string().required("Обязательно для заполнения").email("Некорректный формат Email"),
    phone: yup.string()
        .matches(/^\+\d{1,3}\(\d{3}\)\d{2,3}-\d{2}-\d{2}$/, "Не соответствует формату")
        .required("Введите номер телефона"),
});
export const validationSec = Yup.object().shape({
    child: Yup.object().shape({
        name: Yup.string().required("Обязательно для заполнения"),
        surname: Yup.string().required("Обязательно для заполнения"),
        patronim: yup.string()
            .test("no-spaces", "Отчество не должно содержать пробелы", function (value) {
                if (value && /\s/.test(value)) {
                    return false;
                }
                return true;
            }),
        dateOfBirth: Yup.string().required("Обязательно для заполнения"),
        sex: Yup.string().required("Обязательно для заполнения"),
        height: Yup.number().required("Обязательно для заполнения").nonNullable(),
        weight: Yup.number().required("Обязательно для заполнения").nonNullable(),
    }),
});