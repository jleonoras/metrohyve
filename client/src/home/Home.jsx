import React, { useEffect } from "react";
import AllListing from "../allListing/AllListing";
import "../App.css";
import Search from "../component/Search";

// Homepage

const Home = () => {
  useEffect(() => {
    document.title = "Metrohyve";
  }, []);

  return (
    <section>
      <div className="container">
        <div>
          <Search />
        </div>
        <div>
          <AllListing />
        </div>
      </div>
    </section>
  );
};

export default Home;
