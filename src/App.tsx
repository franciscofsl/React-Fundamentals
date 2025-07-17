import Banner from "./components/banner"
import "./App.css"
import HouseList from './components/HouseList';

function App() {
  
  return (
    <>
    <Banner>
      <div>Providing houses all over the world</div>
    </Banner>
    <Banner />  
    <HouseList />
    </>
  )
}

export default App
