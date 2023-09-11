import {FunctionComponent, ReactElement} from "react";
import { useField, useFormikContext } from "formik";
import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
registerLocale("ru", ru);
import IDatePickerProps from "./IDatePickerProps";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../../components/ChildTables/ChildAllergies/CreateAllergy/CreateAllergy.module.css";

export const DatePickerField: FunctionComponent<IDatePickerProps> = (props): ReactElement => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    return (
        <DatePicker
            locale="ru"
            className={styles.createEntityInput}
            {...field}
            {...props}
            selected={(field.value && new Date(field.value)) || null}
            onChange={val => {
                setFieldValue(field.name, val);
            }}
        />
    );
};

export default DatePickerField;