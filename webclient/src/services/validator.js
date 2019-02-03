
const validate = (config, state, failureCallback, successCallback) => {
  const errors = {};

  // Loop on all fields from the configuration
  config.fields.forEach((field) => {
    // Loop on all rules of the field
    config.rules[field].forEach((ruleConf) => {
      let value = null;
      let keyValue = null;
      let minLen = 0;
      let maxLen = 10000;

      switch (ruleConf.rule) {
        // Validate Required Case
        case 'isRequired':
          value = state[field];
          if (testRequired(value)) {
            errors[field] = ruleConf.message;
          }
          break;

        case 'isEqualToKey':
          keyValue = state[ruleConf.key];
          value = state[field];

          if (keyValue !== value) {
            errors[field] = ruleConf.message;
          }
          break;

        case 'isRequiredWith':
          keyValue = state[ruleConf.withKey];
          value = state[field];

          if (ruleConf.withValue.constructor === Array && ruleConf.withValue.includes(keyValue)) {
            if (testRequired(value)) {
              errors[field] = ruleConf.message;
            }
          } else if (keyValue === ruleConf.withValue) {
            if (testRequired(value)) {
              errors[field] = ruleConf.message;
            }
          }
          break;

        case 'isDependentRequired':
          keyValue = state[ruleConf.dependOnKey];
          value = state[field];

          if (!testRequired(keyValue) && testRequired(value)) {
            errors[field] = ruleConf.message;
          }
          break;

        case 'isEmail':
          value = state[field];
          if (value != null && value !== '' && !value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            errors[field] = ruleConf.message;
          }
          break;

        // Validate password
        case 'isPassword':
          value = state[field];
          if (value !== '' && !value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)) {
            errors[field] = ruleConf.message;
          }
          break;

        // Validate phone number
        case 'isPhone':
          value = state[field].trim();
          if (value !== '') {
            if (value.includes('+1')) {
              if (!value.match(/^(\+1\s|1|)?((\(\d{3}\))|\d{3})(-|\s)?(\d{3})(-|\s)?(\d{4})$/)) {
                errors[field] = ruleConf.message;
              }
            } else if (value.length !== 10) {
              errors[field] = ruleConf.message;
            }
          }
          break;

        default:
          break;
      }
    });
  });

  if (Object.keys(errors).length > 0) {
    failureCallback(errors);
  } else {
    successCallback();
  }
};

export const clearErrorsForField = (errors, field) => {
  if (errors[field] !== undefined) {
    delete errors[field];
  }

  return errors;
};


// Private functions
const testRequired = (value) => {
  if (value == null || value === undefined) {
    return true;
  } if (value.constructor === String) {
    return (value.trim() === '');
  } if (value.constructor === Number) {
    return (value === 0 || value === -1);
  } if (value.constructor === Array) {
    return (value.length === 0);
  }
  return false;
};

export default validate;
