import React, { useState, useEffect } from "react";
import Pagination from "../Paginate/Pagination";
import "./homepage.css";

const Homepage = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [postPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndexOfPage = postPerPage * currentPage;
  const firsIndexOfPage = lastIndexOfPage - postPerPage;

  const currentPosts = data?.slice(firsIndexOfPage, lastIndexOfPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchData = () => {
    fetch("https://docs.microsoft.com/api/learn/catalog/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.modules);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="search-container">
        <input
          type={"search"}
          placeholder="Type in course name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="main-container">
        {currentPosts
          ?.filter((el) =>
            el?.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((el, idx) => {
            return (
              <div className="container" key={idx}>
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
                  <p className="container-duration-text">
                    Duration in minutes: {el.duration_in_minutes}
                  </p>
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
      <Pagination
        postPerPage={postPerPage}
        totalPosts={data.length}
        paginate={paginate}
      />
    </>
  );
};
export default Homepage;
