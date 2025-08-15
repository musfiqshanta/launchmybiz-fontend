import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    companyName: Yup.string().trim().required('Company name is required'),
    companyAltName: Yup.string().trim().required('Alternative name is required'),
    category: Yup.string().required('Business category is required'),
    description: Yup.string().required('Business description is required'),
    firstName: Yup.string().trim().required('First name is required'),
    middleName: Yup.string().optional(),
    lastName: Yup.string().trim().required('Last name is required'),
    title: Yup.string().required('Title is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string().matches(/^[0-9]+$/, 'Phone number must contain only numbers').min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number must not exceed 15 digits').required('Phone is required'),
    hasSSN: Yup.boolean().required('SSN field is required'),
    ssn: Yup.string().when('hasSSN', {
        is: true,
        then: (schema) => schema.matches(/^[0-9]{9}$/, 'SSN must be exactly 9 digits').required('SSN is required'),
        otherwise: (schema) => schema.optional()
    }),
    address: Yup.string().trim().required('Address is required'),
    city: Yup.string().trim().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
    zipCode: Yup.string().matches(/^[0-9]{5}$/, 'Zip code must be exactly 5 digits').required('Zip code is required'),
    address2: Yup.string().optional(),
    participants: Yup.array().of(
        Yup.object().shape({
            firstName: Yup.string().required('First name is required'),
            lastName: Yup.string().required('Last name is required'),
            address: Yup.string().required('Address is required'),
            address2: Yup.string().optional(),
            city: Yup.string().required('City is required'),
            state: Yup.string().required('State is required'),
            country: Yup.string().required('Country is required'),
            zipCode: Yup.string().matches(/^[0-9]{5}$/, 'Zip code must be exactly 5 digits').required('Zip code is required'),
            ownership: Yup.number().required('Ownership % is required').min(0, 'Cannot be negative').max(100, 'Cannot exceed 100').test('max-digits', 'Ownership cannot exceed 3 digits', value => !value || value.toString().length <= 3),
            Contributed: Yup.string().optional(),
            ContributerMarketValue: Yup.number().typeError('Must be a number').positive('Market value must be positive').required('Market value is required')
        })
    ).min(1, 'At least one participant is required'),
    filingSpeed: Yup.string().required('Filing speed is required'),
    registeredAgentChoice: Yup.string().required('Registered agent choice is required'),
    registeredAgentFirstName: Yup.string().when('registeredAgentChoice', {
        is: 'own',
        then: (schema) => schema.required('Registered agent first name is required'),
        otherwise: (schema) => schema.optional()
    }),
    registeredAgentLastName: Yup.string().when('registeredAgentChoice', {
        is: 'own',
        then: (schema) => schema.required('Registered agent last name is required'),
        otherwise: (schema) => schema.optional()
    }),
    registeredAgentAddress1: Yup.string().when('registeredAgentChoice', {
        is: 'own',
        then: (schema) => schema.required('Registered agent address is required'),
        otherwise: (schema) => schema.optional()
    }),
    registeredAgentAddress2: Yup.string().optional(),
    registeredAgentCity: Yup.string().when('registeredAgentChoice', {
        is: 'own',
        then: (schema) => schema.required('Registered agent city is required'),
        otherwise: (schema) => schema.optional()
    }),
    registeredAgentState: Yup.string().when('registeredAgentChoice', {
        is: 'own',
        then: (schema) => schema.required('Registered agent state is required'),
        otherwise: (schema) => schema.optional()
    }),
    registeredAgentZip: Yup.string().when('registeredAgentChoice', {
        is: 'own',
        then: (schema) => schema.matches(/^[0-9]{5}$/, 'Zip code must be exactly 5 digits').required('Registered agent zip code is required'),
        otherwise: (schema) => schema.optional()
    }),
    registeredAgentCountry: Yup.string().when('registeredAgentChoice', {
        is: 'own',
        then: (schema) => schema.required('Registered agent country is required'),
        otherwise: (schema) => schema.optional()
    })
}); 