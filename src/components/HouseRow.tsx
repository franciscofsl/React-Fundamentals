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
      <td>${house.price.toLocaleString()}</td>
    </tr>
  );
};

export default HouseRow;
