// A separate Worker redirects asset URLs as well as server-rendered pages.
export default {
  fetch(request: Request): Response {
    const destination = new URL(request.url);
    destination.protocol = 'https:';
    destination.hostname = 'burhanbharmal.com';
    destination.port = '';
    return Response.redirect(destination.href, 308);
  },
};
