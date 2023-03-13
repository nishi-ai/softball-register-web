import React from "react";
import Tabs from "../Tabs/Tabs";
import { Events } from "../../types/index";

function EventCard(props: { eventData: Events[] }) {
  const data = props.eventData;
  return <Tabs data={data} />;
}

export default EventCard;
