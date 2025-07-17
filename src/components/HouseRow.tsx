import React, { useState } from "react";
import Color from "@/types/Color";
import currencyFormatter from "@/helpers/CurrencyFormatter";
import House from "@/types/House";

const HouseRow = ({ house }: { house: House }) => {

  const [currentColor, setCurrentColor] = useState("");

  const [clickCount, setClickCount] = useState(0);

  const increment = () => {
    setClickCount(clickCount + 1);
    setCurrentColor(Color.Random());
  };

  return (
    <tr onClick={increment} style={{ backgroundColor: currentColor }}>
      <td>{house.address}</td>
      <td>{house.country}</td>
      <td>{currencyFormatter.format(house.price)}</td>
      <td>{clickCount}</td>
    </tr>
  );
};

const HouseRowMem = React.memo(HouseRow);

export default HouseRow;
export { HouseRowMem};
