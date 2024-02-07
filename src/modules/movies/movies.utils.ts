export function myStringify(obj: object) {
  let objString = "";
  objString += "{";
  for (const key in obj) {
    const value = obj[key];

    objString += `"${key}":`;

    if (typeof obj[key] === "object") {
      objString += `${myStringify(value)}`;
    } else if (typeof value === "string") {
      objString += `"${value}"`;
    } else if (typeof obj[key] === "number") {
      objString += `${value}`;
    }

    objString += `,`;
  }
  objString += "}";
  return objString;
}
