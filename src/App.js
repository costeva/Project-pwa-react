import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Homes from "./pages/Home";
import HeroDetails from "./pages/HeroeDetail";
import Welcome from "./pages/Welcome";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;
