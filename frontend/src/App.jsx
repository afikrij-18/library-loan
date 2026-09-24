import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import CreateLoan from "./pages/CreateLoan";
import EditLoan from "./pages/EditLoan";

function App() {
  return (
    <div>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/peminjaman/create" element={<CreateLoan />} />
          <Route path="/peminjaman/:id/edit" element={<EditLoan />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
