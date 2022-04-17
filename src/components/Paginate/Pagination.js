import React, { useState } from "react";
import "./paginate.css";

const Pagination = ({ postPerPage, totalPosts, paginate }) => {
  const [count, setCount] = useState(1);
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i);
  }

  const decrease = () => {
    if (count <= 1) {
      setCount(count);
      paginate(count);
      return;
    }
    setCount(count - 1);
    paginate(count - 1);
  };

  const increase = () => {
    if (count === pages.length) {
      setCount(pages.length);
      paginate(pages.length);
      return;
    }
    setCount(count + 1);
    paginate(count + 1);
  };

  return (
    <div className="pagination_number">
      <div className="button_conatiner">
        <button className="prev" onClick={decrease}>Prev</button>
        <button className="next" onClick={increase}>Next</button>
      </div>
      <ul className="list_container">
        {pages.map((number) => (
          <li key={number} onClick={() => paginate(number)}>
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
