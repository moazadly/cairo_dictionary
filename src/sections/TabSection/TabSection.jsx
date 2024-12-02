import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Section4 from "../Section4/Section4";
import { useSelector } from "react-redux";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
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

export default function BasicTabs({ arr, value, setValue, setValue2, i }) {
  const coll = useSelector((state) => state.user.collocates);
  const [arrCollocates, setArrCollocates] = React.useState(coll || []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [length, setLength] = React.useState(0);
  React.useEffect(() => {
    setLength(arr?.length);
    setArrCollocates(arr);
  }, [arr]);
  React.useEffect(() => {
    if (arrCollocates?.length > 0) {
      setLength(arrCollocates?.length);

      setArrCollocates(arrCollocates);
    }
  }, [arrCollocates]);
  React.useEffect(() => {
    setArrCollocates(coll);
    setLength(coll?.length);
  }, [coll]);
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        {length > 0 && (
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {" "}
            {arrCollocates?.map((item, index) => (
              <Tab
                label={item.collocate_text}
                key={index}
                {...a11yProps(index)}
                sx={{ fontSize: 25 }}
              />
            ))}
          </Tabs>
        )}
      </Box>
      {value === -1 && (
        <div style={{ padding: 24 }}>
          <Section4
            setValue={setValue2}
            setValue2={setValue}
            setArrCollocates={setArrCollocates}
            arrCollocates={arrCollocates}
            index={i}
          />
        </div>
      )}
      {arrCollocates?.map((item, index) => {
        return (
          <CustomTabPanel value={value} index={index}>
            <>
              <Section4
                data={item}
                setValue={setValue2}
                setValue2={setValue}
                setArrCollocates={setArrCollocates}
                arrCollocates={arrCollocates}
                collocatesIndex={index}
                index={i}
              />
            </>
          </CustomTabPanel>
        );
      })}
    </Box>
  );
}
