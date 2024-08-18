const currencyEndpoint =
  // process.env.convertCUrrencyPairEndpoint ||
  "http://localhost:8000/v1/api/converter/convert-pair";

export const convertCurrencyPair = async ({ base, target }) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ base, target })
    };
    const response = await fetch(currencyEndpoint, options);
    if (!response.ok) {
      console.error("error converting currency: " + response);
      return "error converting currency pair";
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return "error converting currency pair";
  }
};
