import { useState, useActionState } from "react";
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

  // Action function for useActionState
  const submitBidAction = async (
    prevState: { success: boolean | null; message: string }, 
    formData: FormData
  ) => {
    const bidder = formData.get("bidder") as string;
    const amount = formData.get("amount") as string;
    
    try {
      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const bid: Bid = {
        houseId: house.id,
        bidder,
        amount: parseFloat(amount),
      };

      await addBid(bid);
      setNewBid(emptyBid);
      
      return { success: true, message: "Bid added successfully!" };
    } catch (error) {
      return { success: false, message: "Failed to add bid" };
    }
  };

  // useActionState hook
  const [state, formAction, isPending] = useActionState(submitBidAction, {
    success: false,
    message: ""
  });

  if (loadingState !== loadingStatus.loaded)
    return <LoadingIndicator loadingState={loadingState} />;

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
      
      {/* Show status message */}
      {state.message && (
        <div className={`alert ${state.success ? 'alert-success' : 'alert-danger'}`}>
          {state.message}
        </div>
      )}

      <form action={formAction} className="row row-cols-lg">
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

export default Bids;
