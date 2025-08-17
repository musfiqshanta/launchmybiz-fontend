import * as Yup from 'yup';

export const withoutLLCValidationSchema = Yup.object().shape({
    // Contact Information fields only
    firstName: Yup.string()
        .required('First name is required')
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must be less than 50 characters'),
    
    middleName: Yup.string()
        .max(50, 'Middle name must be less than 50 characters'),
    
    lastName: Yup.string()
        .required('Last name is required')
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name must be less than 50 characters'),
    
    title: Yup.string()
        .required('Title is required'),
    
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    
    phone: Yup.string()
        .required('Phone number is required')
        .matches(/^\d+$/, 'Phone number must contain only numbers')
        .min(10, 'Phone number must be at least 10 digits')
        .max(15, 'Phone number must be less than 15 digits'),
    
    hasSSN: Yup.boolean()
        .required('Please indicate if you have an SSN'),
    
    ssn: Yup.string()
        .when('hasSSN', {
            is: true,
            then: (schema) => schema
                .required('SSN is required when you have an SSN')
                .matches(/^\d{9}$/, 'SSN must be exactly 9 digits')
                .matches(/^\d+$/, 'SSN must contain only numbers'),
            otherwise: (schema) => schema.notRequired()
        })
}); 