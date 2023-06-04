import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email format.')
        .required('Email is required.'),
    password: Yup.string()
        .min(8, "Password should have 8 min characters")
        .required('Password is required.')
})

export const registerValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email format.')
        .required('Email is required.'),
    password: Yup.string()
        .min(8, "Password should have 8 min characters")
        .matches(/(.*[a-z].*)/, "Password should have 1 lowercase character.")
        .matches(/(.*[A-Z].*)/, "Password should have 1 uppercase character.")
        .matches(/(.*\d.*)/, "Password should have 1 digit.")
        .required('Password is required.')
})