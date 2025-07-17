import currencyFormatter from "../helpers/CurrencyFormatter";
import { useState } from "react";

type House = {
  id: number;
  address: string;
  country: string;
  price: number;
};

const HouseRow = ({ house }: { house: House }) => {
    
  const [clickCount, setClickCount] = useState(0);
  const increment = () => setClickCount(clickCount + 1);

  return (
    <tr onClick={increment}>
      <td>{house.address}</td>
      <td>{house.country}</td>
      <td>{currencyFormatter.format(house.price)}</td>
      <td>{clickCount}</td>
    </tr>
  );
};

export default HouseRow;
