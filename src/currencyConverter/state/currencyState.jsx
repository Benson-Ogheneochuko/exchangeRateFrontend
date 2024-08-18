import { useState, useEffect, useCallback } from "react";
import { fetchSupportedCurrencies } from "../services/fetchSupportedCurrencies";
import { convertCurrencyPair } from "../services/convertCurrencyPair";

export const useCurrencyState = () => {
  const [currencies, setCurrencies] = useState([]);
  useEffect(() => {
    const getCurrencies = async () => {
      const data = await fetchSupportedCurrencies();
      setCurrencies(data);
    };
    getCurrencies();
  }, []);
  return currencies;
};

export const useSelectedCurrencyPair = () => {
  const [selectedCurrencyPair, setSelectedCurrencyPair] = useState({
    base: "",
    target: ""
  });

  const updateCurrencyPair = useCallback(({ key, value }) => {
    setSelectedCurrencyPair((prev) => ({
      ...prev,
      [key]: value
    }));
  }, []);

  return { selectedCurrencyPair, updateCurrencyPair };
};

export const useConversionRate = (selectedCurrencyPair) => {
  const [conversionRate, setConversionRate] = useState({});

  useEffect(() => {
    const getConversionRate = async () => {
      const { base, target } = selectedCurrencyPair;
      if (base && target) {
        const data = await convertCurrencyPair(selectedCurrencyPair);
        setConversionRate(data);
      }
    };

    getConversionRate();
  }, [selectedCurrencyPair]);

  return conversionRate;
};
