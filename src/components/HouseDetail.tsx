import currencyFormatter from "@/helpers/CurrencyFormatter";
import defaultPhoto from "@/helpers/DefaultImage";
import { useParams } from "react-router"; 
import useHouses from "../hooks/useHouses";
import loadingStatus from "@/helpers/loadingStatus";
import LoadingIndicator from "./loadingIndicator";
import type House from "@/types/House";
import BidsList from "./BidsList";
import AddBid from "./AddBid";
import useBids from "../hooks/useBids";

const HouseDetail = () => {
  const { id } = useParams();
  const { houses, loadingState } = useHouses();
  const house: House | undefined = houses.find((h: House) => h.id === parseInt(id || "0"));

  const {bids, loadingStateBid, addBid} = useBids(house?.id);

  if (loadingState !== loadingStatus.loaded) {
    return <LoadingIndicator loadingState={loadingState} />;
  }
  
  
  if (!house) {
    return <div>House not found</div>;
  }

  return (
    <div className="row">
      <div className="col-6">
        <div className="row">
          <img
            className="img-fluid"
            src={
              house.photo ? `./houseImages/${house.photo}.jpeg` : defaultPhoto
            }
            alt="House pic"
          />
        </div>
      </div>
      <div className="col-6">
        <div className="row mt-2">
          <h5 className="col-12">{house.country}</h5>
        </div>
        <div className="row">
          <h3 className="col-12">{house.address}</h3>
        </div>
        <div className="row">
          <h2 className="themeFontColor col-12">
            {currencyFormatter.format(house.price)}
          </h2>
        </div>
        <div className="row">
          <div className="col-12 mt-3">{house.description}</div>
        </div>
        <BidsList bids={bids} />
        <AddBid house={house} addBid={addBid} />
      </div>
    </div>
  );
};

export default HouseDetail;
