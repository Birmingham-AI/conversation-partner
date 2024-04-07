export const fetchClient = (
  endpointPath: string,
  requestInit?: RequestInit
) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  if (!baseURL) {
    throw new Error(
      `fetchClient: missing required environment variable: NEXT_PUBLIC_API_URL`
    );
  }

  const combinedRequestOpts: RequestInit | undefined = requestInit
    ? {
        headers: {
          "content-type": "application/json",
          ...requestInit.headers,
        },
        ...requestInit,
      }
    : undefined;

  return fetch(`${baseURL}${endpointPath}`, combinedRequestOpts);
};
