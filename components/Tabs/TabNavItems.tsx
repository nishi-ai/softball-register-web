import React from "react";
import styles from "./Tabs.module.css";
import styled from "styled-components";

const TabContainer = styled.div`
  display: flex;
  white-space: nowrap;
`;

const TabNavItems = (props: {
  years: number[];
  value: number;
  handleOnClick: (index: number) => void;
}): JSX.Element => {
  const { years, value, handleOnClick } = props;
  return (
    <TabContainer>
      {years.map((year: number, index: number) => (
        <li
          key={index}
          className={[styles.year, value === index ? styles.active : ""].join(
            " "
          )}
          onClick={() => {
            handleOnClick(index);
          }}
        >
          {year}
        </li>
      ))}
    </TabContainer>
  );
};
export default TabNavItems;
