import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import classes from './index.module.css';

function TabPanel(props) {
  const { children, value, index, onlyUseLeftMargins, fullHeight, removeChildMargins, ...other } =
    props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      className={`bg-gray-900 ${onlyUseLeftMargins ? 'rounded-bl-xl ' : 'rounded-b-xl '} ${
        fullHeight ? 'h-full' : 'auto'
      }`}
      {...other}>
      {value === index && (
        <Box sx={{ p: `${removeChildMargins ? 0 : 3}`, height: `${fullHeight ? '100%' : 'auto'}` }}>
          <div
            className={`sm:py-3 sm:px-4 ${
              removeChildMargins && 'sm:pb-0 sm:pt-4 sm:pl-0 sm:pr-0'
            } ${fullHeight && 'h-full'}`}>
            {children}
          </div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
}

const SmallTabs = ({
  tabs = [],
  onlyUseLeftMargins = false,
  fullHeight = false,
  removeChildMargins = false
}) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        width: '100%',
        border: '3px solid #4f46e5',
        borderTopLeftRadius: '15px',
        borderBottomLeftRadius: '15px',
        borderTopRightRadius: `${onlyUseLeftMargins ? '0px' : '15px'}`,
        borderBottomRightRadius: `${onlyUseLeftMargins ? '0px' : '15px'}`,
        height: `${fullHeight ? '100%' : 'auto'}`
      }}>
      <AppBar
        position="static"
        className={`${onlyUseLeftMargins ? 'rounded-tl-xl ' : 'rounded-t-xl '}`}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          className={`bg-black ${onlyUseLeftMargins ? 'rounded-tl-xl ' : 'rounded-t-xl '}`}
          TabIndicatorProps={{
            style: { background: '#4f46e5', height: '100%', position: 'absolute' }
          }}>
          {tabs?.map((item, index) => (
            <Tab
              label={item.label}
              {...a11yProps(index)}
              key={index}
              className={`GrindFontFamily hover:bg-indigo-600 z-10 ${classes.reduceFontSize}`}
            />
          ))}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        className={`bg-gray-900 ${onlyUseLeftMargins ? 'rounded-bl-xl ' : 'rounded-b-xl '} ${
          fullHeight && classes.fullHeight
        }`}>
        {tabs?.map((item, index) => (
          <TabPanel
            value={value}
            index={index}
            dir={theme.direction}
            key={index}
            onlyUseLeftMargins={onlyUseLeftMargins}
            fullHeight={fullHeight}
            removeChildMargins={removeChildMargins}>
            {item.Component}
          </TabPanel>
        ))}
      </SwipeableViews>
    </Box>
  );
};

export default SmallTabs;
