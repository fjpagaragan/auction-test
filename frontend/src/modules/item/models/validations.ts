import * as Yup from 'yup';

export const createItemValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Item name is required.'),
    start_price: Yup.number()
        .moreThan(0, "Start price should be greater than 0.")
        .required('Start price is required.'),
    duration: Yup.number()
        .moreThan(0, "Duration should be greater than 0.")
        .required('Duration is required.')
});