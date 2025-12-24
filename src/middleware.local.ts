//No funciona por el nombre del archivo

import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";

const privateRoutes = ["/protected"];

export const onRequest = defineMiddleware(({ url, request }, next) => {
  const authHeaders = request.headers.get("authorization") ?? "";
  console.log(authHeaders);

  if (privateRoutes.includes(url.pathname)) {
    return checkLocalAuth(authHeaders, next);
  }

  return next();
});

const checkLocalAuth = (authHeades: string, next: MiddlewareNext) => {
  if (authHeades) {
    const authValue = authHeades.split(" ").at(-1) ?? "user:pass";
    const decodedValue = atob(authValue).split(":");

    console.log(decodedValue);
    const [user, password] = decodedValue;

    if (user === "admin" && password === "admin2") {
      return next();
    }
  }

  return new Response("Auth Necesaria", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic real="Secure Area"',
    },
  });
};
