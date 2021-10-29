const middleware = async ({ request, response }) => {
  if (Object.keys(response.store).length === 0) {
    console.log('new request on ' + new Date());
    console.log('url: ' + request.url);
    console.log('method: ' + request.method);
    console.log('headers: ' + JSON.stringify(request.headers));
    console.log('query: ' + JSON.stringify(request.query));
    console.log('body: ' + JSON.stringify(request.body));
  } else {
    console.log('response store: ' + JSON.stringify(response.store));
  }
  return { request, response };
};

export default middleware;
