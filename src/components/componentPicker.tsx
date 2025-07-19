import navValues from "../navigation/navValues";
import HouseList from './HouseList';  
import HouseDetail from "./HouseDetail";

const ComponentPicker = ({ currentNavLocation }: { currentNavLocation: string }) => {
  switch (currentNavLocation) {
    case navValues.home:
      return <HouseList />;
    case navValues.house:
      return <HouseDetail />;
    default:
      return (
        <h3>
          No component for navigation value
          {currentNavLocation} found
        </h3>
      );
  }
};

export default ComponentPicker;