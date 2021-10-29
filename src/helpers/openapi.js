import OpenAPIRequestValidator from 'openapi-request-validator';

const getRequestValidator = schema => new OpenAPIRequestValidator(schema);

export { getRequestValidator };
