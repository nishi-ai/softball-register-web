import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import styles from "./BasicInfo.module.css";

type Props = {
  data: {
    description: string;
    title: string;
    location: string;
  };
};

export default function DisplayBasicInfo(props: Props) {
  const { description, title, location } = props.data;

  return (
    <div className={styles.container}>
      <h3 className={styles.location}>
        <FontAwesomeIcon
          icon={faLocationArrow}
          size='xs'
          className={styles.icon}
        />{" "}
        {location}
      </h3>
      <h2 className={styles.title}>{title}</h2>
      <h4 className={styles.description}>{description}</h4>
    </div>
  );
}

// DisplayBasicInfo();
