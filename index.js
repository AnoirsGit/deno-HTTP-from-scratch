import { assertEquals } from "https://deno.land/std@0.158.0/testing/asserts.ts";
import { encode, parseRequest, stringifyResponse } from "./2-Response&Request/refactored.js";

Deno.test("parseRequest", () => {
  const request = parseRequest(
    encode(`GET / HTTP/1.1\r\nHost: localhost:8080\r\nAccept: */*\r\n\r\n`)
  );

  assertEquals(request.method, "GET");
  assertEquals(request.path, "/");
  assertEquals(request.headers.host, "localhost:8080");
  assertEquals(request.headers.accept, "*/*");
});

Deno.test("stringifyResponse", () => {
  const body = JSON.stringify({ full_name: "John Doe" });
  const response = {
    body,
    headers: {
      ["content-type"]: "application/json",
      ["content-length"]: body.length,
    },
    statusCode: 200,
  };
  const r = stringifyResponse(response);

  assertEquals(
    r,
    `HTTP/1.1 200 OK\r\nContent-Type: application/json\r\nContent-Length: 24\r\n\r\n{"full_name":"John Doe"}`
  );
});
