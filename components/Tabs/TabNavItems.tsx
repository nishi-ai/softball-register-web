import React from "react";
import styles from "./Tabs.module.css";

const TabNavItems = (props: {
  years: number[];
  value: number;
  handleOnClick: (index: number) => void;
}): JSX.Element => {
  const { years, value, handleOnClick } = props;
  return (
    <>
      {" "}
      {years.map((year: number, index: number) => (
        <li
          key={index}
          className={value === index ? styles.active : styles.year}
          onClick={() => {
            handleOnClick(index);
          }}
        >
          {year}
        </li>
      ))}
    </>
  );
};
export default TabNavItems;
