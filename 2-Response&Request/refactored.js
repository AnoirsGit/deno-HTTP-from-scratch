export const $decoder = new TextDecoder();
export const decode = $decoder.decode.bind($decoder);
export const $encoder = new TextEncoder();
export const encode = $encoder.encode.bind($encoder);

const statusCodes = { 200: "200 OK" };

export const parseRequest = xs => {
  const request = decode(xs);
  const [header, body] = request.split("\r\n\r\n");
  const [requestLine, ...ls] = header.split("\r\n");
  const [method, path] = requestLine.split(" ");
  const headers = ls
    .map(l => l.split(": "))
    .reduce(
      (hs, [key, value]) =>
        Object.defineProperty(hs, key.toLowerCase(), { enumerable: true, value, writable: false }),
      {}
    );
  return { method, path, headers, body };
};

export const normalizeHeaderKey = key => key.replaceAll(/(?<=^|-)[a-z]/g, x => x.toUpperCase());

export const stringifyHeaders = (headers = {}) =>
  Object.entries(headers).reduce(
    (hs, [key, value]) => `${hs}\r\n${normalizeHeaderKey(key)}: ${value}`,
    ""
  );

export const stringifyResponse = response =>
  `HTTP/1.1 ${statusCodes[response.statusCode]}${stringifyHeaders(response.headers)}\r\n\r\n${
    response.body || ""
  }`;
