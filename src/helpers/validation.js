const validate = (obj, schema) => {
  try {
    schema.validateSync(obj);
    return '';
  } catch (e) {
    return e.errors[0];
  }
};

export { validate };
