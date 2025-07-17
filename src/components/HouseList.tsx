import HouseRow from "./HouseRow";

const houses = [
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
  return (
    // <> and </> are React fragments, used to group multiple elements without adding extra nodes to the DOM
    <>
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Houses currently on the market
        </h5>
      </div>
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
    </>
  );
};

export default HouseList;
