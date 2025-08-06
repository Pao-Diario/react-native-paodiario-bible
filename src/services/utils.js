import { addSeconds, format } from "date-fns";

export function formatElapsedTime(input) {
  const seconds = parseInt(input, 10);
  const date = addSeconds(new Date(0), seconds);

  return format(date, "mm:ss");
}
export function replaceSpecialChars(str) {
  str = str.replace(/[ÀÁÂÃÄÅ]/, "A");
  str = str.replace(/[àáâãäå]/, "a");
  str = str.replace(/[ÈÉÊË]/, "E");
  str = str.replace(/[Ç]/, "C");
  str = str.replace(/[ç]/, "c");
  str = str.replace(/[ÓÕÔ]/, "O");

  // o resto

  return trim(str.replace(/[^a-z0-9]/gi, ""));
}
export function pluralize(text, quantity = 1) {
  const output = String(quantity).concat(" ").concat(text);

  if (quantity !== 1) {
    return output.concat("s");
  }

  return output;
}

export function normalize(input) {
  if (!input) {
    return input;
  }

  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function getIDFromURL(url) {
  const [, params] = url.split("v=");
  const [id] = params.split("&list");

  return id;
}

export function getPlaylistIDFromURL(url) {
  const [, id] = url.split("list=");

  return id;
}
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export function trim(text) {
  if (!text) {
    return "";
  }

  if (Array.isArray(text)) {
    return text.join("").trim();
  }

  return text.trim();
}
