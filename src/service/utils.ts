interface Cookie {
  name: string;
  value: string;
  domain: string;
  path: string;
}
export const parseCookies = (cookieHeaders: string[]): Cookie[] => {
  return cookieHeaders.map((cookieStr) => {
    const parts = cookieStr.split(";");
    const [nameValue, ...attributes] = parts;
    const [name, value] = nameValue.split("=").map((s) => s.trim());

    const cookie: Cookie = {
      name,
      value,
      domain: "",
      path: "/",
    };

    attributes.forEach((attr) => {
      const [key, val] = attr.split("=").map((s) => s.trim());
      if (key.toLowerCase() === "domain") cookie.domain = val;
      if (key.toLowerCase() === "path") cookie.path = val;
    });

    return cookie;
  });
};
