const validObjectItemIsString = (objects, propName, componentName, location, propFullName) => {
  const obj = objects[propName];

  if (typeof obj !== 'string') {
    return new Error(`Invalid prop '${propFullName}' of type '${typeof obj}' supplied to '${componentName}' , expected 'string'`);
  }
  // const isObjectError = PropTypes.object(props, propName, propFullName, componentName, location);
  // if (isObjectError) { return isObjectError; }

  // const isStringError = PropTypes.string(props, propName, propFullName, componentName, location);
  // if (isStringError) { return isStringError; }

  return null;
};

export default validObjectItemIsString;
