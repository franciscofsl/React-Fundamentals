import Banner from "@/components/banner";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import HouseList from "./components/HouseList";
import HouseDetail from "./components/HouseDetail"; 

function App() {
  return (
    <BrowserRouter>
      <Banner>
        <div>Providing houses all over the world</div>
      </Banner> 
      <Routes>
        <Route index element={<HouseList />}/>
        <Route path="house/:id" element={<HouseDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
