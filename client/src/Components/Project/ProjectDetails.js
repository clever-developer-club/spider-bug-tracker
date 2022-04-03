import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  Container,
  Divider,
  Grid,
  makeStyles,
  Typography,
  AppBar,
  Tabs,
  Tab,
  Box,
  useTheme,
  CircularProgress,
  Button,
} from "@material-ui/core";

import clsx from "clsx";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import ProjectMembers from "./ProjectMembers";
import OpenBugs from "./OpenBugs";
import AssignedBugs from "./AssignedBugs";
import ResolveBugs from "./ResolveBugs";
import {useStyles} from '../../CSS/muiStyles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp'



const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
};

const ProjectDetails = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.authReducer);
  const [project, setProject] = useState();
  const [bugs, setBugs] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/projects/${id}`,
      headers: {
        Authorization: `Bearer ${user.jwtToken}`,
      },
    })
      .then((res) => {
        setProject(res.data.data);
        console.log(res);
        setBugs(res.data.data.bugs);
        setMembers(res.data.data.members);
        setLoading(true);
      })
      .catch((err) => {
        // console.log(err.response.state)
        toast.error(err.response.statusText);
      });
  }, []);

  return (
    <>
      <ToastContainer />
      {loading ? (
        <Container >
          <Container className={classes.rootPaper}>
            <Grid container>
              <Grid item xs={12} lg={12}>
                <Grid container>
                  <Grid item xs={12} sm={10} md={10} lg={10}>
                    <Typography variant="h4" className={classes.title}>
                      {project.name}
                    </Typography>
                  </Grid>

                  {/* <Grid item lg={2}> */}
                    <Button variant="outlined" href="/" color="primary" className={classes.exitProjectButton}>
                      <ExitToAppIcon className={classes.exitIcon} /> &nbsp;Home
                    </Button>
                  {/* </Grid> */}
                </Grid>
              </Grid>
              
              {/* <Divider varient="middle" className={classes.divider}/> */}
              

              <Grid item xs={12} lg={12} className={classes.details}>
                {/* <Grid item xs={12} sm={10} md={10} lg={10}> */}
                  <Typography variant="p" >Client : {project.client}</Typography>
                  <br />
                  <Typography variant="p" >
                    Description : {project.description}
                  </Typography>
                {/* </Grid> */}
              </Grid>
            </Grid>
          </Container>
            
            <Grid container>
            <Grid item xs={12} lg={12} className={classes.menu}>
              <AppBar position="static" color="default">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <Tab label="Project Members" {...a11yProps(0)} />
                  <Tab label="Open Bugs" {...a11yProps(1)} />
                  <Tab label="Resolve Bugs" {...a11yProps(2)} />
                  <Tab label="Assign Bugs" {...a11yProps(3)} />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <ProjectMembers members={members} />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <OpenBugs bugs={bugs} members={members} />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  <ResolveBugs bugs={bugs} />
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                  <AssignedBugs bugs={bugs} members={members} />
                </TabPanel>
              </SwipeableViews>
            </Grid>
          </Grid>
        </Container>
      ) : <div className={classes.fullPage}>
          <CircularProgress className={classes.loader} disableShrink size={40} /> 
        </div>
      }
    </>
  );
};

export default ProjectDetails;
