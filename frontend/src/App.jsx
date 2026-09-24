import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          {/* <Route path="/" element={Home} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
