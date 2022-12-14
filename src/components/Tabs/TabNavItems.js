import React from "react";

import "./Tabs.css";

const TabNavItems = ({ years, value, handleOnClick, id }) => {

  return years.map((year, index) => (
    <li
      className={value === index ? `year active` : "year"}
      onClick={(e) => {
        handleOnClick(e, index);
      }}
    >
      {year}
    </li>
  ));
};
export default TabNavItems;
