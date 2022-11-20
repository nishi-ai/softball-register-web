import { React } from "react";
import Tab from "../Tabs/Tabs";

function EventCard(props) {
  const data = props.eventData;
  console.log("data", data);
  return <Tab key={data.id} data={data} />;
}

export default EventCard;
