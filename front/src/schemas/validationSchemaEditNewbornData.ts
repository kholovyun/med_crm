import * as yup from "yup";

export const validationSchemaEditNewbornData = yup.object().shape({
    dischargedDate: yup.date()
        .required("Поле не должно быть пустым"),
    pregnancyN: yup.number()
        .min(1, "Минимум первый беременность")
        .required("Поле не должно быть пустым"),
    pregnancyDescript: yup.string()
        .trim()
        .required("Поле не должно быть пустым"),
    birthN: yup.number()
        .min(1, "Минимум первые роды")
        .required("Поле не должно быть пустым"),
    gestAge: yup.number()
        .min(1, "Минимум 1")
        .required("Поле не должно быть пустым"),
    period1: yup.number()
        .min(1, "Минимум 1")
        .required("Поле не должно быть пустым"),
    period2: yup.number()
        .min(1, "Минимум 1")
        .required("Поле не должно быть пустым"),
    amnAbsPeriod: yup.string()
        .min(1, "Минимум 1")
        .required("Поле не должно быть пустым"),
    amnDescript: yup.string()
        .max(256, "Максимум 256 символов")
        .trim()
        .required("Поле не должно быть пустым"),
    anesthesia: yup.string()
        .max(256, "Максимум 256 символов")
        .trim()
        .required("Поле не должно быть пустым"),
    postBirthPeriod: yup.string()
        .max(256, "Максимум 256 символов")
        .trim()
        .required("Поле не должно быть пустым"),
    motherState: yup.string()
        .trim()
        .required("Поле не должно быть пустым"),
    birthWeight: yup.number()
        .min(1, "Минимум 1")
        .required("Поле не должно быть пустым"),
    birthHeight: yup.number()
        .min(1, "Минимум 1")
        .required("Поле не должно быть пустым"),
    newbornState: yup.string()
        .max(256, "Максимум 256 символов")
        .trim()
        .required("Поле не должно быть пустым"),
    apgarScore: yup.string()
        .max(10, "Максимум 10 символов")
        .trim()
        .required("Поле не должно быть пустым"),
    reanimation: yup.string()
        .max(256, "Максимум 256 символов")
        .trim()
        .required("Поле не должно быть пустым"),
    breastTry: yup.boolean()
        .required("Поле не должно быть пустым"),
    feeding: yup.string()
        .max(256, "Максимум 256 символов")
        .trim()
        .required("Поле не должно быть пустым"),
    diagnosis: yup.string()
        .trim()
        .required("Поле не должно быть пустым"),
    examination: yup.string()
        .trim()
        .required("Поле не должно быть пустым"),
    treatment: yup.string()
        .trim()
        .required("Поле не должно быть пустым"),
    eyes: yup.string()
        .max(256, "Максимум 256 символов")
        .trim()
        .required("Поле не должно быть пустым"),
    reflexes: yup.string()
        .max(256, "Максимум 256 символов")
        .trim()
        .required("Поле не должно быть пустым"),
    skin: yup.string()
        .max(256, "Максимум 256 символов")
        .trim()
        .required("Поле не должно быть пустым"),
    organs: yup.string()
        .max(256, "Максимум 256 символов")
        .trim()
        .required("Поле не должно быть пустым"),
    stool: yup.string()
        .max(256, "Максимум 256 символов")
        .trim()
        .required("Поле не должно быть пустым"),
    diuresis: yup.string()
        .max(256, "Максимум 256 символов")
        .trim()
        .required("Поле не должно быть пустым"),
    umbilicalCord: yup.string()
        .max(256, "Максимум 256 символов")
        .trim()
        .required("Поле не должно быть пустым"),
    examedBy: yup.string()
        .max(256, "Максимум 256 символов")
        .trim()
        .required("Поле не должно быть пустым"),
    notes: yup.string()
        .max(256, "Максимум 256 символов")
        .trim(),
    feedingReason: yup.string()
        .max(256, "Максимум 256 символов")
        .trim(),
});