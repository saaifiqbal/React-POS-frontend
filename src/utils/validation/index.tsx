import * as yup from 'yup';
export const loginSchema = yup.object().shape({
    email: yup.string().required("This is requested").email("This is a invalid email"),
    password: yup.string().required('This is required').min(6, 'Minimum Length should be 6 Characters'),
})