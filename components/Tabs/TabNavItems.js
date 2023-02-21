import React from "react";

import styles from "./Tabs.module.css";

const TabNavItems = ({ years, value, handleOnClick }) => {
  console.log(years, value);
  return years.map((year, index) => (
    <li
      key={index}
      className={value === index ? styles.active : styles.year}
      onClick={(e) => {
        handleOnClick(e, index);
      }}
    >
      {year}
    </li>
  ));
};
export default TabNavItems;
