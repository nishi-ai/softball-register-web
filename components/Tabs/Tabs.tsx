import React, { useState } from "react";

import TabNavItems from "./TabNavItems";
import EventItem from "../Events/EventItem";
import styles from "./Tabs.module.css";
import { Events } from "../../types";

const TabPanel = (props: { children: any; value: number; index: number }) => {
  const { children, value, index } = props;

  return (
    <div hidden={value !== index}>
      {value === index && <div>{children}</div>}
    </div>
  );
};

const Tabs = (props: { data: Events[] }) => {
  const allyears = props.data.map((item) => new Date(item.date).getFullYear());

  const years = allyears
    .filter(function (item, position) {
      return allyears.indexOf(item) === position;
    })
    .sort()
    .reverse();

  const [value, setValue] = useState<number>(0);
  const handleOnClick = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={styles.tabs}>
      <ul className={styles.nav}>
        <TabNavItems
          years={years}
          value={value}
          handleOnClick={handleOnClick}
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
                    key={item._id?.toString()}
                    date={new Date(item.date) as Date}
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
