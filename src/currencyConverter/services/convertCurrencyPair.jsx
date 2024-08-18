const apiEndpoint = `${import.meta.env.VITE_BASE_API_URL}${import.meta.env.VITE_CONVERT_PAIR_ENDPOINT}`
  || import.meta.env.VITE_LOCAL_HOST__CONVERT_PAIR_ENDPOINT;

export const convertCurrencyPair = async ({ base, target }) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ base, target })
    };
    const response = await fetch(apiEndpoint, options);
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
