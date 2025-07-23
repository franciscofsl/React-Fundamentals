import { useState, useTransition } from 'react';

const AddBid = ({ house, addBid }) => {
  const [isPending, startTransition] = useTransition();

  const emptyBid = {
    houseId: house.id,
    bidder: "",
    amount: 0,
  };

  const [newBid, setNewBid] = useState(emptyBid);

  const onBidSubmitClick = () => {
    startTransition(async () => {
      await addBid(newBid);
       await new Promise((resolve) => setTimeout(resolve, 3000));
     
    });
    setNewBid(emptyBid);
  };


return (
    <>
       
      <form action={onBidSubmitClick} className="row row-cols-lg">
        <div className="col-5">
          <input
            id="bidder"
            name="bidder"
            className="h-100"
            type="text"
            value={newBid.bidder}
            onChange={(e) => setNewBid({ ...newBid, bidder: e.target.value })}
            placeholder="Bidder"
            disabled={isPending}
          ></input>
        </div>
        <div className="col-5">
          <input
            id="amount"
            name="amount"
            className="h-100"
            type="number"
            value={newBid.amount}
            onChange={(e) =>
              setNewBid({ ...newBid, amount: parseInt(e.target.value) || 0 })
            }
            placeholder="Amount"
            disabled={isPending}
          ></input>
        </div>
        <div className="col-2">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddBid;