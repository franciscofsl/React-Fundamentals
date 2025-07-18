import React, { useState } from "react";
import Color from "@/types/Color";
import currencyFormatter from "@/helpers/CurrencyFormatter";
import House from "@/types/House";

const HouseRow = ({ house, selectHouse }: { house: House; selectHouse: (house: House) => void }) => {
  const [currentColor, setCurrentColor] = useState("");
  const [clickCount, setClickCount] = useState(0);

  const increment = () => {
    setClickCount(clickCount + 1);
    setCurrentColor(Color.Random());
  };

  const handleClick = () => {
    increment();
    selectHouse(house);
  };

  return (
    <tr onClick={handleClick} style={{ backgroundColor: currentColor }}>
      <td>{house.address}</td>
      <td>{house.country}</td>
      {house.price && (
        <td className={house.price < 500000 ? "text-primary" : "text-danger"}>
          {currencyFormatter.format(house.price)}
        </td>
      )}
      <td>{clickCount}</td>
    </tr>
  );
};

const HouseRowMem = React.memo(HouseRow);

export default HouseRow;
export { HouseRowMem };
