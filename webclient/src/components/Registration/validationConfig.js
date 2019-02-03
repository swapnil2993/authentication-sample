export default {
  fields: ['firstName', 'lastName', 'password', 'email', 'confirmPassword'],
  rules: {
    firstName: [
      { rule: 'isRequired', message: 'First name is required' },
    ],
    lastName: [
      { rule: 'isRequired', message: 'Last name is required' },
    ],
    password: [
      { rule: 'isRequired', message: 'Password is required' },
      { rule: 'isPassword', message: 'Password is invalid' },
    ],
    confirmPassword: [
      { rule: 'isRequired', message: 'Password is required' },
      { rule: 'isPassword', message: 'Password is invalid' },
      { rule: 'isEqualToKey', key: 'password', message: 'Passwords do not match' },
    ],
    email: [
      { rule: 'isRequired', message: 'Email is required' },
      { rule: 'isEmail', message: 'Email format is invalid' },
    ],
  },
};
