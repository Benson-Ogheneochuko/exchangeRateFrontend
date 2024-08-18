import { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';

export const DropDown = ({
  listLabel = "currency",
  list = [],
  style = {},
  callback
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredList, setFilteredList] = useState(list);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const filtered = list.filter((item) =>
      item[0].toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredList(filtered);
  }, [inputValue, list]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsOpen(true);
  };

  const handleItemClick = (item) => {
    setInputValue(item);
    setIsOpen(false);
    callback(listLabel, item.split("-")[0].trim());
  };

  return (
    <label htmlFor={listLabel} style={{ ...style, position: "relative" }}>
      <input
        type="text"
        id={listLabel}
        value={inputValue}
        onChange={handleInputChange}
        onClick={() => setIsOpen(true)}
        placeholder={listLabel}
      />
      {isOpen && (
        <ul
          ref={dropdownRef}
          style={{
            zIndex: "5",
            position: "absolute",
            top: "105%",
            left: 0,
            right: 0,
            listStyle: "none",
            padding: "0.15rem",
            margin: 0,
            border: "1px solid #ccc",
            borderRadius: "5px",
            maxHeight: "200px",
            overflowY: "auto",
            backgroundColor: "white"
          }}
        >
          {filteredList.map((item, index) => (
            <li
              key={index}
              onClick={() => handleItemClick(`${item[0]} - ${item[1]}`)}
              style={{ padding: "5px 10px", cursor: "pointer" }}
            >
              {`${item[0]} - ${item[1]}`}
            </li>
          ))}
        </ul>
      )}
    </label>
  );
};


DropDown.propTypes = {
  listLabel: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.any),
  style: PropTypes.object,
  callback: PropTypes.func.isRequired,
};