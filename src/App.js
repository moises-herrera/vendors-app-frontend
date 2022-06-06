import React, { useState } from "react";
import "./index.css";
import VendorsContext from "./context/VendorsContext";
import Home from "./components/Home";

function App() {
  const [vendors, setVendors] = useState(null);

  return (
    <VendorsContext.Provider value={[vendors, setVendors]}>
      <Home />
    </VendorsContext.Provider>
  );
}

export default App;
