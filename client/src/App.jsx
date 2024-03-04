import { BrowserRouter, Routes, Route } from "react-router-dom";
import Carform from "./pages/CarForm";
import CarList from "./pages/CarList";
import Navbar from "./components/Navbar";
import { CarProvider } from "./context/CarContext";

function App() {
  return (
    <CarProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<h1>Home page</h1>} />
          <Route path="/car-list" element={<CarList />} />
          <Route path="/create-car" element={<Carform />} />
        </Routes>
      </BrowserRouter>
    </CarProvider>
  );
}

export default App;
