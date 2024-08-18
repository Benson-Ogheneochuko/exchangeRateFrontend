const apiEndpoint = `${import.meta.env.VITE_BASE_API_URL}${import.meta.env.VITE_CURRENCIES_ENDPOINT}`
  || import.meta.env.VITE_LOCAL_HOST_CURRENCIES_ENDPOINT

export const fetchSupportedCurrencies = async () => {
  try {
    const response = await fetch(apiEndpoint);
    if (!response.ok) {
      console.error("Failed to fetch currency options:", response);
      return [];
    }
    let { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error occurred:", error);
    return [];
  }
};
