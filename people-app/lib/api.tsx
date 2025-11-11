export const getBackendApiUrl = (url: string = "", debug: boolean = false) => {
  // Check if the url has a leading '/', add one if it doesn't
  if (!url.startsWith("/")) {
    url = `/${url}`;
  }

  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}`;

  if (debug) {
    console.log("apiUrl", apiUrl);
  }

  return apiUrl;
};
