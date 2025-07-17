import { useState } from "react";
import HouseRow from "@/components/HouseRow";
import House from "@/types/House";

const housesArray: House[] = [
  new House(1, "123 Main St", "USA", 300000),
  new House(2, "456 Elm St", "Canada", 400000),
];

const HouseList = () => {
  const [houses, setHouses] = useState(housesArray);
  const [counter, setCounter] = useState(housesArray.length);

  const AddHouse = () => {
    setHouses(
        [...houses, 
        House.Random(houses.length + 1)]);
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
