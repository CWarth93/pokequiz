// inside reducer functions

const createSetter = subSlice => (state, { payload }) => ({
  ...state,
  [subSlice]: payload,
});

const createStaticSetter = (subSlice, payload) => state => ({
  ...state,
  [subSlice]: payload,
});

const createSetterWithValidation = (subSlice, validator, errorSlice) => (
  state,
  { payload },
) => ({
  ...state,
  [subSlice]: payload,
  [errorSlice]: validator(payload),
});

const createAddToArraySetter = subSlice => (state, { payload }) => ({
  ...state,
  [subSlice]: [...state[subSlice], payload],
});

// inside container function

const createTextFieldSetter = setter => event => setter(event.target.value);
const createButtonHandler = handler => () => handler();
const createSelectionHandler = handler => selection => handler(selection);

export {
  createSetter,
  createStaticSetter,
  createSetterWithValidation,
  createAddToArraySetter,
  createTextFieldSetter,
  createButtonHandler,
  createSelectionHandler,
};
