import * as yup from "yup";

export const validationSchemaActivateParent = yup.object().shape({
    offerChecked: yup.boolean(),
    privacyChecked: yup.boolean(),
    childInfoChecked: yup.boolean(),
});
