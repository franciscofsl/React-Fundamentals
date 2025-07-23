import { useState } from "react";
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

  const emptyBid: Bid = {
    houseId: house.id,
    bidder: "",
    amount: 0,
  };

  const [newBid, setNewBid] = useState<Bid>(emptyBid);

  if (loadingState !== loadingStatus.loaded)
    return <LoadingIndicator loadingState={loadingState} />;

  const onBidSubmitClick = () => {
    if (newBid.bidder.trim() && newBid.amount > 0) {
      addBid(newBid);
      setNewBid(emptyBid);
    }
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
      <div className="row">
        <div className="col-5">
          <input
            id="bidder"
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
          <button className="btn btn-primary" onClick={onBidSubmitClick}>
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default Bids;