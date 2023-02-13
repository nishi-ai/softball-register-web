import React, { useState } from "react";

import TabNavItems from "./TabNavItems";
import EventItem from "../Events/EventItem";
import styles from "./Tabs.module.css";

const TabPanel = (props) => {
  const { children, value, index } = props;

  return (
    <div hidden={value !== index}>
      {value === index && <div>{children}</div>}
    </div>
  );
};

const Tabs = (props) => {
  const allyears = props.data.map((item) => new Date(item.date).getFullYear());

  const years = allyears
    .filter(function (item, position) {
      return allyears.indexOf(item) === position;
    })
    .sort()
    .reverse();

  const [value, setValue] = useState(0);

  const handleOnClick = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.tabs}>
      <ul className={styles.nav}>
        <TabNavItems
          years={years}
          value={value}
          handleOnClick={handleOnClick}
          id={value}
          key={value} 
        />
      </ul>

      <div className={styles.listContent}>
        {years.map((year, index) => (
          <TabPanel value={value} index={index} key={index}>
            {props.data
              .filter((item) => new Date(item.date).getFullYear() === year)
              .map((item) => {
                return (
                  <EventItem
                    key={item.id}
                    date={new Date(item.date)}
                    result={item.result}
                  />
                );
              })}
          </TabPanel>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
