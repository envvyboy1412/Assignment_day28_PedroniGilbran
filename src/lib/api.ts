export const headers = {
  "Content-Type": "application/json",
  "x-api-key": "pro_f8e12047372c3bdf414fe83a2eda7c7ecf0f924a9d3cc156",
};

export const apiFetch = async (
  url: string,
  options: RequestInit = {}
) => {
  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response.json();
};
