import Banner from "@/components/banner";
import "./App.css";
import HouseList from "@/components/HouseList";
import { Suspense } from "react";
import { useState } from "react";
import HouseDetail from "./components/HouseDetail"; 
import type House from "./types/House";

function App() {
  const [selectedHouse, setSelectedHouse] = useState<House>();

  const setSelectedHouseWrapper = (house : House) => {
    setSelectedHouse(house);
  }

  return (
    <>
      <Banner>
        <div>Providing houses all over the world</div>
      </Banner>
      <Banner />
      {
       /* <Suspense fallback={<div>Loading...</div>}>
          <HouseList />
        </Suspense>*/
      }
      {selectedHouse
       ? <HouseDetail house={selectedHouse} /> 
       : <HouseList selectHouse={setSelectedHouseWrapper} />}
    </>
  );
}
export default App;
