import React from "react";
import Chart from "./Chart";
import Form from "./Form";

function Home() {
  return (
    <div className="w-screen h-screen">
      <h1 className="pt-3 text-xl font-bold text-center">Vendors App</h1>
      <Chart />
      <div className="flex flex-col items-center">
        <Form />
      </div>
    </div>
  );
}

export default Home;
