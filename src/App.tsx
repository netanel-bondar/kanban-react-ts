import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Boards } from "./components/Boards";

function App() {
  return (
    
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <Boards />
      <Footer />
    </div>
  );
}

export default App;





