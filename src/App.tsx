import Banner from "@/components/banner";
import "./App.css";
import HouseList from "@/components/HouseList";
import { Suspense } from "react";

function App() {
  return (
    <>
      <Banner>
        <div>Providing houses all over the world</div>
      </Banner>
      <Banner />
      <Suspense fallback={<div>Loading...</div>}>
        <HouseList />
      </Suspense>
    </>
  );
}

export default App;
