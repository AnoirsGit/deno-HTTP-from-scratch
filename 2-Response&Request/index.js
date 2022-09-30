import { serve } from "./library/server/index.js";
import { encode, decode, stringifyResponse, parseRequest } from "./refactored.js";

if (import.meta.main) {
  const port = Number(Deno.args[0] || 8080);
  serve(Deno.listen({ port }), xs => {
    const request = parseRequest(xs);
    if (request.method === "GET" && request.path === "/") {
      if (request.headers.accept.includes("*/*") || request.headers.accept.includes("text/plain")) {
        return encode(
          stringifyResponse({
            body: "Hello, world",
            headers: {
              "content-length": 12,
              "content-type": "text/plain",
            },
            statusCode: 200,
          })
        );
      } else {
        return encode(`HTTP/1.1 204 No Content\r\nContent-Length: 0\r\n\r\n`);
      }
    }
    return encode(`HTTP/1.1 404 Not Found\r\nContent-Length: 0\r\n\r\n`);
  }).catch(e => console.error(e));
}
