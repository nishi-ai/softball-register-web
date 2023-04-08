import React from "react";
import Tabs from "../Tabs/Tabs";
import { Events } from "../../types";

function Events(props: { eventData: Events[] }) {
  const data = props.eventData;
  return <Tabs data={data} />;
}

export default Events;
