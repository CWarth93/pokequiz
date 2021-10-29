import { pipeAsync } from 'ramda-async';

// creates params object containing request query, header and body, and response store
const createParamsForHandler = ({ request, response }) => {
  let params = {};
  Object.keys(request.query).forEach(qk => {
    params[qk] = request.query[qk];
  });
  Object.keys(request.headers).forEach(header => {
    params[header] = request.headers[header];
  });
  Object.keys(request.body).forEach(key => {
    params[key] = request.body[key];
  });
  response.store.forEach(obj => {
    params[Object.keys(obj)[0]] = obj[Object.keys(obj)[0]];
  });
  return params;
};

// saves the handler result to the response store
const saveHandlerResult = ({ response, newRes }) => {
  Object.keys(newRes)
    .map(key => ({ [key]: newRes[key] }))
    .forEach(newDataset => {
      if (
        response.store.filter(
          obj => Object.keys(obj)[0] === Object.keys(newDataset)[0],
        ).length === 0
      ) {
        response.store.push(newDataset);
      } else {
        response.store.forEach((obj, ind) => {
          if (obj[Object.keys(newDataset)[0]] !== undefined) {
            response.store[ind] = newDataset;
          }
        });
      }
    });
  return response;
};

// creates middleware from js function
const createMiddleware = fn => async ({ request, response }) => {
  let params = createParamsForHandler({ request, response });
  const newRes = await fn(params);
  response = saveHandlerResult({ response, newRes });
  return { request, response };
};

// layer to skip middleware when error in store
const skipIfError = middleware => async ({ request, response }) =>
  response.store.filter(el => el.error !== undefined).length !== 0
    ? { request, response }
    : middleware({ request, response });

// layer an error skipper around all middlewares
const prepareMiddlewares = middlewares =>
  middlewares.map(mw => skipIfError(mw));

// creates a response body from response store
const createResponseBody = store => {
  let responseBody = {};
  store.forEach(dataset => {
    if (dataset[Object.keys(dataset)[0]] !== null) {
      responseBody[Object.keys(dataset)[0]] = dataset[Object.keys(dataset)[0]];
    }
  });
  return responseBody;
};

// runs middlewares in a chain
const route = async (request, response, middlewares) => {
  try {
    response.store = [];
    const preparedMiddlewares = prepareMiddlewares(middlewares);
    await pipeAsync(...preparedMiddlewares)({
      request,
      response,
    });
    if (response.store.filter(el => el.error !== undefined).length !== 0) {
      throw response.store.filter(el => el.error !== undefined)[0];
    }
    const responseBody = createResponseBody(response.store);
    response.status(200);
    response.json(responseBody);
  } catch (e) {
    console.error(e);
    response.status(
      response.store.filter(el => el.statusCode !== undefined).length !== 0
        ? response.store.find(el => el.statusCode !== undefined).statusCode
        : 500,
    );
    response.json(e);
  }
};

export { createMiddleware, route };
