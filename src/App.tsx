import Banner from "@/components/banner";
import "./App.css";
import HouseList from "@/components/HouseList";
import { Suspense } from "react";
import { useState } from "react";
import HouseDetail from "./components/HouseDetail";

function App() {
  const [selectedHouse, setSelectedHouse] = useState();

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
      {selectedHouse ? <HouseDetail house={selectedHouse} /> : <HouseList />}
    </>
  );
}
export default App;
