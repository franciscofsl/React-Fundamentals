import { use, useEffect, useState, useMemo } from "react";
import HouseRow from "@/components/HouseRow";
import House from "@/types/House";

interface HouseData {
  id: number;
  address: string;
  country: string;
  price: number;
}

/*
const fetchHouses = fetch("/src/data/houses.json")
  .then((response) => response.json())
  .then((data: HouseData[]) =>
    data.map((h) => new House(h.id, h.address, h.country, h.price))
  );*/

const HouseList = () => {
  // const housesResult = use(fetchHouses);

  const [houses, setHouses] = useState<House[]>([]);
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

  // Example with useMemo: Memoize average price (expensive calculation)
  const averagePrice = useMemo(() => {
    console.log("Calculating average price..."); // To see when it executes
    if (houses.length === 0) return 0;

    const total = houses.reduce((sum, house) => sum + house.price, 0);
    return Math.round(total / houses.length);
  }, [houses]); // Recalculated only when the houses array changes

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
      
      {/* Show memoized average price */}
      <div className="alert alert-info mb-3">
        <strong>Average Price:</strong> ${averagePrice.toLocaleString()}
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
