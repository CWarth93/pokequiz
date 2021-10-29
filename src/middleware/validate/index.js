import { getRequestValidator } from 'helpers/openapi';
import { StatusCodes } from 'http-status-codes';

const middleware = schema => async ({ request, response }) => {
  const fullSchema = schema;
  let path = '';
  if (Object.keys(request.query).length > 0) {
    path = request.url.split('/api')[1].split('?')[0];
  } else {
    path = request.url.split('/api')[1];
  }
  const routeSchema = fullSchema['paths'][path];
  if (routeSchema === undefined) {
    console.error({ error: 'url doesnt exist' });
    response.store.push({ error: 'url doesnt exist' });
    response.store.push({ statusCode: StatusCodes.BAD_REQUEST });
    return { request, response };
  } else {
    const methodSchema = routeSchema[request.method.toLowerCase()];
    if (methodSchema === undefined) {
      console.error({ error: 'url doesnt support this method' });
      response.store.push({ error: 'url doesnt support this method' });
      response.store.push({ statusCode: StatusCodes.BAD_REQUEST });
      return { request, response };
    } else {
      methodSchema.schemas = fullSchema.definitions;
      const errors = getRequestValidator(methodSchema).validateRequest(request);
      if (errors) {
        console.error({
          error: errors.errors[0].location + ' ' + errors.errors[0].message,
        });
        response.store.push({
          error: errors.errors[0].location + ' ' + errors.errors[0].message,
        });
        response.store.push({ statusCode: StatusCodes.BAD_REQUEST });
        return { request, response };
      } else {
        return { request, response };
      }
    }
  }
};

export default middleware;
