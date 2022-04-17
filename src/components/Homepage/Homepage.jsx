import React, { useState, useEffect } from "react";
import "./homepage.css";

const Homepage = () => {
  const [data, setData] = useState();
  const [search, setSearch] = useState("");
  const fetchData = () => {
    fetch("https://docs.microsoft.com/api/learn/catalog/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="main-container">
      <div className="search-container">
        <input
          type={"search"}
          placeholder="Type in course name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {data?.modules
        ?.filter((el) => el?.title.toLowerCase().includes(search.toLowerCase()))
        .map((el) => {
          return (
            <div className="container">
              <div className="container-banner">
                <img
                  className="container-banner-img"
                  src="https://netcomlearning.s3.amazonaws.com/website-img/banner-img/module_card_header_image.svg"
                  alt="module banner"
                />
              </div>
              <div className="container-title">
                <span>
                  <a href="https://docs.microsoft.com/en-us/learn/modules/access-blob-storage-metrics-from-code/?WT.mc_id=api_CatalogApi">
                    {el.title}
                  </a>
                </span>
              </div>
              <div className="container-duration">
                <p>Duration in minutes: {el.duration_in_minutes}</p>
              </div>
              <div className="container-levels">
                <ul>
                  {el.roles.map((role) => {
                    return <li>{role}</li>;
                  })}
                  {el.levels.map((level) => {
                    return <li>{level}</li>;
                  })}
                </ul>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default Homepage;
