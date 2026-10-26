// Send every http:// and www. request to the one canonical origin, then serve static assets.
const CANONICAL_HOST = "jamesburrow.com";

export default {
  async fetch(request, env) {
    // `wrangler dev` rewrites local requests to http://jamesburrow.com, so skip redirects there.
    if (env.LOCAL_DEV) return env.ASSETS.fetch(request);

    const url = new URL(request.url);
    if (url.hostname === `www.${CANONICAL_HOST}` || url.protocol === "http:") {
      url.hostname = CANONICAL_HOST;
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
