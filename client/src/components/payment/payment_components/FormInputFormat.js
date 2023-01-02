const inputs = [
    {
        id: 1,
        name: 'firstName',
        type: 'text',
        label: 'First Name',
        maxLength: 30,
    },
    {
        id: 2,
        name: 'lastName',
        type: 'text',
        label: 'Last Name',
        maxLength: 30,
    },
    {
        id: 3,
        name: 'phoneNumber',
        type: 'number',
        label: 'Phone Number',
        maxLength: null,
    },
    {
        id: 4,
        name: 'emailAddress',
        type: 'email',
        label: 'Email Address',
        maxLength: 50,
    },
];

const paymentInfo = [
    {
        id: 1,
        name: 'creditCardNumber',
        type: 'number',
        label: 'Credit Card Number',
        maxLength: null,
    },
    {
        id: 2,
        name: 'expiryDate',
        type: 'date',
        label: 'Expiry Date',
        maxLength: null
    },
    {
        id: 3,
        name: 'cvc',
        type: 'number',
        label: 'CVV/CVC',
        maxLength: null,
    },
];

const billingAddress = [
    {
        id: 1,
        name: 'streetName',
        type: 'text',
        label: 'Street Name',
        maxLength: 50,
    },
    {
        id: 2,
        name: 'streetNumber',
        type: 'number',
        label: 'Street Number',
        maxLength: null,
    },
    {
        id: 3,
        name: 'postalCode',
        type: 'number',
        label: 'Postal Code',
        maxLength: null,
    },
];

export { inputs, paymentInfo, billingAddress };