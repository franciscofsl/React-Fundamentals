import { useState, useTransition } from "react";
import loadingStatus from "../helpers/loadingStatus";
import useBids from "../hooks/useBids";
import LoadingIndicator from "./loadingIndicator";
import currencyFormatter from "@/helpers/CurrencyFormatter";
import type { Bid } from "../types/Bid";
import type House from "../types/House";

interface BidsProps {
  house: House;
}

const Bids = ({ house }: BidsProps) => {
  const { bids, loadingState, addBid } = useBids(house.id);
  const [isPending, startTransition] = useTransition();

  const emptyBid: Bid = {
    houseId: house.id,
    bidder: "",
    amount: 0,
  };

  const [newBid, setNewBid] = useState<Bid>(emptyBid);

  if (loadingState !== loadingStatus.loaded)
    return <LoadingIndicator loadingState={loadingState} />;

  const onBidSubmitClick = (formData) => {
    const bidder = formData.get("bidder");
    const amount = formData.get("amount");
    
      startTransition(async () => {
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const bid: Bid = {
          houseId: house.id,
          bidder,
          amount: parseFloat(amount),
        };

        addBid(bid);
      });
      setNewBid(emptyBid);
    
  };

  return (
    <>
      <div className="row mt-4">
        <div className="col-12">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Bidder</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {bids.map((b) => (
                <tr key={b.id}>
                  <td>{b.bidder}</td>
                  <td>{currencyFormatter.format(b.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
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
          ></input>
        </div>
        <div className="col-2">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={isPending}
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default Bids;
