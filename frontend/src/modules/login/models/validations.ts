import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email format.')
        .required('Email is required.'),
    password: Yup.string()
        .min(8, "Password should have 8 min characters")
        .required('Password is required.')
})