import React, { useState } from "react";

import "./Tabs.css";

const TabNavItems = ({ data, value, handleOnClick, id }) => {
  const allyears = data.map((item) => new Date(item.date).getFullYear());
  const years = allyears
    .filter(function (item, position) {
      return allyears.indexOf(item) === position;
    })
    .sort()
    .reverse();

  const [activeIndex, setActiveIndex] = useState(0);

  return years.map((year, index) => (
    <li
      className={activeIndex === index ? `year active` : "year"}
      onClick={(e) => {
        handleOnClick(e, index);
        setActiveIndex(index);
      }}
    >
      <a href>{year}</a>
    </li>
  ));
};
export default TabNavItems;
