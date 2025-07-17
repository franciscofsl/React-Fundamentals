import { use, useEffect, useState } from "react";
import HouseRow from "@/components/HouseRow";
import House from "@/types/House";

interface HouseData {
  id: number;
  address: string;
  country: string;
  price: number;
}

const fetchHouses = fetch("/src/data/houses.json")
  .then((response) => response.json())
  .then((data: HouseData[]) =>
    data.map((h) => new House(h.id, h.address, h.country, h.price))
  );

const HouseList = () => {
  const housesResult = use(fetchHouses);

  const [houses, setHouses] = useState<House[]>(housesResult);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const fetchHouses = async () => {
      const response = await fetch("/src/data/houses.json");
      const housesData: HouseData[] = await response.json();

      const houses = housesData.map(
        (h: HouseData) => new House(h.id, h.address, h.country, h.price)
      );

      setHouses(houses);
      setCounter(houses.length);
    };

    fetchHouses();
  }, []); // Empty array: the effect is executed only once when mounting the component, avoiding repeated API calls.

  const AddHouse = () => {
    setHouses([...houses, House.Random(houses.length + 1)]);
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
