import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home page</h1>} />
        <Route path="/map" element={<h1>map page</h1>} />
        <Route path="/create-car" element={<h1>Create new car</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
