import * as yup from "yup";

export const validationScremasCreateChild = yup.object().shape({
    name: yup.string().required("Обязательно для заполнения").test("no-spaces", "Имя не должно содержать пробелы", function (value) {
        if (value && /\s/.test(value)) {
            return false;
        }
        return true;
    }),
    surname: yup.string().required("Обязательно для заполнения").test("no-spaces", "Фамилия не должна содержать пробелы", function (value) {
        if (value && /\s/.test(value)) {
            return false;
        }
        return true;
    }),
    patronim: yup.string()
        .test("no-spaces", "Отчество не должно содержать пробелы", function (value) {
            if (value && /\s/.test(value)) {
                return false;
            }
            return true;
        }),
    dateOfBirth: yup.date()
        .test("valid-date", "Обязательно для заполнения", (value) => {
            if (value !== undefined) return true;
        })
        .max(new Date(), "Дата должна быть раньше или равна сегодняшнему дню")
        .typeError("Обязательно для заполнения"),  
    sex: yup.string().required("Обязательно для заполнения"),
    height: yup.number().required("Обязательно для заполнения").test("notZero", "Обязательно для заполнения", value => value !== 0),
    weight: yup.number().required("Обязательно для заполнения").test("notZero", "Обязательно для заполнения", value => value !== 0),
});