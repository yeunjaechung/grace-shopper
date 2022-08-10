import React from "react";

import Navbar from "./components/Navbar";
import Routes from "./Routes";

const App = () => {
  return (
    <div className="bg-white">
      <div>
        <Navbar />
        <Routes />
      </div>
      <p className="center">
        {" "}
        Brought to you by: Ethan Nair, Ryan Scoville, Warren Au, and Yeun Jae
        Chung
      </p>
      <p className="center">
        {" "}
        All images and assets are property of their respective owners. This is a project for Fullstack Academy's 2022 June cohort.
      </p>
    </div>
  );
};

export default App;
