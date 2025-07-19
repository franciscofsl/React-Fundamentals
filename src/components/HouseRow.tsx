import React, { useState } from "react";
import Color from "@/types/Color";
import currencyFormatter from "@/helpers/CurrencyFormatter";
import House from "@/types/House"; 
import { useNavigate } from "react-router";

const HouseRow = ({ house }: { house: House; }) => {
  const [currentColor, setCurrentColor] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();

  const increment = () => {
    setClickCount(clickCount + 1);
    setCurrentColor(Color.Random());
  };

  const handleClick = () => {
    increment();
    navigate(`/house/${house.id}`);
  };

  // If the exception is thrown, the error will be caught by an Error Boundary
  //  throw new Error("This is a test error"); // Intentionally throw an error to test error boundaries

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
