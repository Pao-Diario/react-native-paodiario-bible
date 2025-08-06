import axios from "axios";

export const BaseUrl = "https://universitarios.app.paodiario.org.br/";
export const devotionalsAPI = axios.create({
  // baseURL: 'https://publicacoespaodiario.com.br/clube/api-xmls-universitario/',
  baseURL:
    "https://universitarios.app.paodiario.org.br/api-xmls-universitario/",
});

export function getUploadURL(path) {
  if (!path) {
    return `https://media-universitario.paodiario.org.br/devocionais/default.png`;
  }
  return `https://media-universitario.paodiario.org.br/${path}`;
  // return `https://d27ydbkk4enyex.cloudfront.net/${path}`;
}

export const apiToken = "bc7e8aba-dd5b-47c7-a8a6-2adf3c5c72bc6";
export const bibleApi = axios.create({
  // baseURL: 'https://publicacoespaodiario.com.br/clube/clube-api/public_html/',
  baseURL: "https://rest.crouton.odb.org/bible/",
});

const api = axios.create({
  // baseURL:
  //   'https://publicacoespaodiario.com.br/clube/universitario-api/public_html/',
  baseURL: BaseUrl,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.status) {
      return Promise.reject();
    }

    return Promise.reject(error);
  }
);

export default api;
