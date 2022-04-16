import React, { useState, useEffect } from "react";
import "./homepage.css";

const Homepage = () => {
  const [data, setData] = useState();
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
    <div>
      {data?.modules?.map((el) => {
        return (
          <div className="container">
            <div className="container-banner">
              <img
                className="container-banner-img"
                src="https://netcomlearning.s3.amazonaws.com/website-img/banner-img/module_card_header_image.svg"
                alt="module banner"
              />
              <p className="container-banner-text">Module</p>
            </div>
            <div className="cotainer-title">
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
