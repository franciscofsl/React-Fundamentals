<<<<<<< HEAD
import currencyFormatter from "../helpers/CurrencyFormatter";

=======
>>>>>>> 366f86ea1e85eaa12f0721f844a2ae3c655b8bb3
type House = {
  id: number;
  address: string;
  country: string;
  price: number;
};

const HouseRow = ({ house }: { house: House }) => {
  return (
    <tr>
      <td>{house.address}</td>
      <td>{house.country}</td>
<<<<<<< HEAD
      <td>{currencyFormatter.format(house.price)}</td>
=======
      <td>${house.price.toLocaleString()}</td>
>>>>>>> 366f86ea1e85eaa12f0721f844a2ae3c655b8bb3
    </tr>
  );
};

export default HouseRow;
