import { React } from "react";
import Tabs from "../Tabs/Tabs";

function EventCard(props) {
  const data = props.eventData;
  return <Tabs data={data} />;
}

export default EventCard;
