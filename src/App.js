import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Homes from "./pages/Home";
import HeroDetails from "./pages/HeroeDetail";
import Welcome from "./pages/Welcome";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container mx-auto p-4">
          <Nav />

          <main>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/home" element={<Homes />} />
              <Route path="/people/:id" element={<HeroDetails />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
