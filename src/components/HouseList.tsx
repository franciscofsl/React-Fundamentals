import { useState } from "react";
import HouseRow, { HouseRowMem } from "./HouseRow";
import Country from "../helpers/Country";

const housesArray = [
  {
    id: 1,
    address: "123 Main St",
    country: "USA",
    price: 300000,
  },
  {
    id: 2,
    address: "456 Elm St",
    country: "Canada",
    price: 400000,
  },
];

const HouseList = () => {
  const [houses, setHouses] = useState(housesArray);
  const [counter, setCounter] = useState(housesArray.length);

  const AddHouse = () => {
    setHouses([
      ...houses,
      {
        id: houses.length + 1,
        address: `New House ${houses.length + 1}`,
        country: Country.Random(),
        price: Math.floor(Math.random() * 1000000) + 100000,
      },
    ]);
    // current => current + 1, ensures that the most current value is used
    setCounter((current) => current + 1);
  };

  return (
    // <> and </> are React fragments, used to group multiple elements without adding extra nodes to the DOM
    <>
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Houses currently on the market
        </h5>
      </div>
      <button className="btn btn-primary" onClick={AddHouse}>
        Add
      </button>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Address</th>
            <th>Country</th>
            <th>Asking Price</th>
            <th>Click Count</th>
          </tr>
        </thead>
        <tbody>
          {houses.map((h) => (
            // Using the key prop to help React identify which items have changed, are added, or are removed
            <HouseRow key={h.id} house={h} />
          ))}
        </tbody>
      </table>
      <div className="paginator">Total Houses: {counter}</div>
    </>
  );
};

export default HouseList;
