import Gallery from "./Components/Gallery/Gallery";
import Item from "./Components/Gallery/ItemCard";
import Header from "./Components/Header/Header";


const App = () => {
  return (
    <div>
      <Header />

      <div className="my-16">
        <Gallery />
      </div>
      
    </div>
  );
};

export default App;