const currencyEndpoint =
  // process.env.CurrencyOptionsEndpoint ||
  "http://localhost:8000/v1/api/converter/supported-currencies";

export const fetchSupportedCurrencies = async () => {
  try {
    const response = await fetch(currencyEndpoint);
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
