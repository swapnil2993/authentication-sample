export default {
  fields: ['password', 'email'],
  rules: {
    password: [
      { rule: 'isRequired', message: 'Password is required' },
      { rule: 'isPassword', message: 'Password is invalid' },
    ],
    email: [
      { rule: 'isRequired', message: 'Email is required' },
      { rule: 'isEmail', message: 'Email format is invalid' },
    ],
  },
};
