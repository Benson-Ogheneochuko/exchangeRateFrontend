import { useCurrencyState } from "../state/currencyState";
import {
  useSelectedCurrencyPair,
  useConversionRate
} from "../state/currencyState";
import { DropDown } from "./DropDown";
import "./Component.css";
export const CurrencyPair = () => {
  const currencies = useCurrencyState();
  const { selectedCurrencyPair, updateCurrencyPair } =
    useSelectedCurrencyPair();
  const conversionRate = useConversionRate(selectedCurrencyPair);

  const currencyPairCss = {
    border: "solid 1px #00008B",
    background: "#1E90FF",
    paddingBlock: ".75rem",
    maxWidth: "60rem",
    borderRadius: "10.5px",
    minHeight: "15rem",
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "1fr auto"
  };

  const choosePair = {
    display: "flex",
    flexGrow: 1,
    gap: ".25rem",
    alignSelf: "end"
  };

  const dropDown = {
    flexGrow: 1,
    marginInline: ".5rem"
  };

  const rate = {
    display: "flex",
    placeSelf: "center",
    color: "#FFFFE0"
  };

  const handleCurrencySelect = (listLabel, value) => {
    const key = listLabel === "base currency" ? "base" : "target";
    updateCurrencyPair({ key, value });
  };

  return (
    <div className="currencyPairContainer" style={currencyPairCss}>
      <span style={rate}>
        <h1>{conversionRate["conversion_rate"] || "0"}</h1>
      </span>
      <span className="choosePair" style={choosePair}>
        <DropDown
          listLabel="base currency"
          list={currencies}
          style={dropDown}
          callback={handleCurrencySelect}
        />
        <DropDown
          listLabel="target currency"
          list={currencies}
          style={dropDown}
          callback={handleCurrencySelect}
        />
      </span>
    </div>
  );
};
