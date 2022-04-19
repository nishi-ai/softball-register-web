import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

import EventItem from "./EventItem";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#ffc15a",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#ffc15a",
  },
  "& .MuiTabs-scrollButtons.Mui-disabled": {
    opacity: 0.3,
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(18),
    fontFamily: ["monospace"],
    marginRight: theme.spacing(1),
    color: "white",
    "&.Mui-selected": {
      color: "#ffc15a",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#1f2434",
    },
  })
);

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {/* <Typography>{children}</Typography> */}
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const EventTabPanel = (props) => {
  // get years
  const allyears = props.data.map((item) => new Date(item.date).getFullYear());
  // remove duplicated year
  const years = allyears
    .filter(function (item, position) {
      return allyears.indexOf(item) === position;
    })
    .sort()
    .reverse();

  const [value, setValue] = React.useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          {years.map((year, index) => (
            <StyledTab label={year} {...a11yProps(index)} />
          ))}
        </StyledTabs>
      </Box>
      {years.map((year, index) => (
        <TabPanel value={value} index={index}>
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
    </Box>
  );
};

export default EventTabPanel;
