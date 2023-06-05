import * as Yup from 'yup';


export const makeDepositValidationSchema = Yup.object().shape({
    amount: Yup.number()
    .moreThan(0, "Amount should be greater than 0.")
    .required('Amount is required.')
});