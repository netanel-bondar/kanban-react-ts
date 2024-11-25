import Footer from "./Footer";
import Navbar from "./Navbar";
import { Boards } from "./Boards";

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
