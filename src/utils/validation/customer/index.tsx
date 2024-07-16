import * as yup from "yup";
export const customerSchema = yup.object().shape({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  phone_number: yup
    .string()
    .required("Phone Number is required")
    .min(10, "Phone Number Min length is 10")
    .max(12, "Phone Number Min length is 12"),
  email: yup
    .string()
    .required("Email is required")
    .email("This is a invalid email"),
  zip_code: yup.string().required("Zip Code is required"),
});
