import React from "react";
import Chart from "./Chart";
import Form from "./Form";

function Home() {
  return (
    <div className="w-screen h-screen p-4">
      <h1 className="mt-3 text-2xl font-bold text-center">
        Visualización de datos de Vendedores
      </h1>
      <Chart />
      <div className="flex flex-col items-center mt-4">
        <Form />
      </div>
    </div>
  );
}

export default Home;
