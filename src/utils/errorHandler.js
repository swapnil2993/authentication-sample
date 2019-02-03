export default (errors) => {
  if (errors.length > 0) {
    return errors[0].msg;
  }
  return errors;
}