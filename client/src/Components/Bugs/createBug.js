import "date-fns";
import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  TextField,
  makeStyles,
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip,
  useTheme,
  Button,
} from "@material-ui/core";
import axios from "axios";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { ToastContainer, toast } from "react-toastify";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import ProjectImage from "../../Assets/Images/CreateProject.jpg";
import { Link, useParams } from "react-router-dom";
import Messages from './Messages'
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
  },
  inputField: {
    width: "350px",
    marginTop: "20px",
  },
  dateField: {
    width: "175px",
    marginTop: "20px",
    marginRight: "5px",
    marginBottom: "20px",
  },
  formGrid: {
    display: "flex",
    justifyItems: "center",
  },
  formContainer: {
    display: "flex",
    justifyContent: "center",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  imageGrid: {
    display: "flex",
    justifyContent: "center",
    margin: "auto",
  },
  projectImage: {
    margin: "auto",
  },
}));

const CreateBug = () => {
  const user = useSelector((state) => state.authReducer);
  const { id } = useParams();
  console.log(id)
  const classes = useStyles();

  const [bugName, setBugName] = useState({ value: "", visited: false });
  const [description, setDescription] = useState({ value: "", visited: false });
  // const [clientName, setClientName] = useState({value : "", visited : false});
  const [deadline, setDeadline] = useState();
  const [priority, setPriority] = useState();
  // const [duration, setDuration] = useState({value : 1,visited : false});
  // const [leads, setLeads] = useState({value : [], visited : false});
  // const [leadId, setLeadId] = useState([]);
  // const [members, setMembers] = useState({value : [], visited : false});
  // const [memberId, setMemberId] = useState([]);
  // const [developers, setDevelopers] = useState([]);
  //const [Loading, setLoading] = useState(false);
  const theme = useTheme();
  const handlePriorityChange = (e) =>{
    setPriority(e.target.value)
}
    console.log(user.user._id);
  const createBug = async (e) => {
    e.preventDefault();

    // await leads.value.map((lead) => {
    //     return developers.map((dev) => {
    //         if (lead === dev.name) {
    //             leadId.push(dev._id);
    //         }
    //     })
    // });

    // await members.value.map((member) => {
    //     return developers.map((dev) => {
    //         if (member === dev.name) {
    //             memberId.push(dev._id);
    //         }
    //     })
    // });

    
    // console.log(user._id);
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/projects/${id}/bugs`,
      headers: {
        Authorization: `Bearer ${user.jwtToken}`,
      },
      data: {
        title: bugName.value,
        // client: clientName.value,
        description: description.value,
        deadline: deadline,
        priority: priority,
        createdBy: user.user,
        // duration: duration.value,
        // leads: leadId,
        // members: memberId
      },
    })
      .then((res) => {
        if (!res.data.error) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });

    // setLeadId([]);
    // setMemberId([]);
  };

  // useEffect(() => {
  //     console.log(new Date());
  //     axios({
  //         method: "GET",
  //         url: `${process.env.REACT_APP_API_URL}/Developers`,
  //         headers: {
  //             "Authorization": `Bearer ${user.jwtToken}`
  //         }
  //     }).then((res) => {
  //         setDevelopers(res.data.data);
  //         //setLoading(true);
  //     }).catch((err) => {
  //         console.log(err);
  //     });
  // }, []);

  return (
    <>
      <ToastContainer />
      <Container className={classes.root}>
        <Grid container>
          <Grid
            item
            xs="12"
            sm="12"
            md="6"
            lg="6"
            xl="6"
            className={classes.formGrid}
          >
            <form onSubmit={createBug}>
              <Grid container className={classes.formContainer}>
                <Grid item xs="12" className={classes.formContainer}>
                  <TextField
                    label="Bug Name"
                    variant="outlined"
                    value={bugName.value}
                    onChange={(e) => {
                      setBugName({ value: e.target.value, visited: true });
                    }}
                    className={classes.inputField}
                    error={
                      bugName.value === "" && bugName.visited === true
                        ? true
                        : false
                    }
                    required
                  />
                </Grid>
                {/* <Grid item xs="12" className={classes.formContainer}>
                                    <TextField label="Client Name" variant='outlined' value={clientName.value} onChange={(e) => {setClientName({value : e.target.value, visited : true})}} className={classes.inputField} error={clientName.value === "" && clientName.visited === true ? true : false} required/>
                                </Grid> */}
                <Grid item xs="12" className={classes.formContainer}>
                  <TextField
                    label="Description"
                    multiline
                    rows={4}
                    variant="outlined"
                    className={classes.inputField}
                    value={description.value}
                    onChange={(e) => {
                      setDescription({ value: e.target.value, visited: true });
                    }}
                    error={
                      description.value === "" && description.visited === true
                        ? true
                        : false
                    }
                    required
                  />
                </Grid>
                <Grid item xs="1.5">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="Deadline"
                      label="Deadline"
                      value={deadline}
                      onChange={setDeadline}
                      className={classes.dateField}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                {/* <Grid item xs="1.5">
                                    <TextField
                                        type="number"
                                        label="Duration"
                                        variant='outlined'
                                        value={duration.value}
                                        onChange={(e) => {setDuration({value : e.target.value, visited : true})}}
                                        className={classes.dateField}
                                        error={duration.value === "" && duration.visited === true ? true : false}
                                        required
                                    />
                                </Grid> */}
                <Grid item xs="12" className={classes.formContainer}>
                  <FormControl
                    className={clsx(classes.formControl, classes.inputField)}
                  >
                    <InputLabel id="demo-mutiple-chip-label">Priority</InputLabel>
                    {/* <Select
                                            labelId="demo-mutiple-chip-label"
                                            id="demo-mutiple-chip"
                                            multiple
                                            value={leads.value}
                                            onChange={handleLeadChange}
                                            error={leads.value === [] && leads.visited === true ? true : false}
                                            required
                                            input={<Input id="select-multiple-chip"/>}
                                            renderValue={(selected) => (
                                                <div className={classes.chips}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} className={classes.chip} />
                                                    ))}
                                                </div>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            {developers.map((developer) => (
                                                <MenuItem key={developer._id} value={developer.name} style={getStyles(developer.name, developer.name, theme)}>
                                                    {developer.name}
                                                </MenuItem>
                                            ))}
                                        </Select> */}
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={priority}
                      onChange={handlePriorityChange}
                      label="Age"
                    >
                      <MenuItem value={"Low"}>Low</MenuItem>
                      <MenuItem value={"Medium"}>Medium</MenuItem>
                      <MenuItem value={"High"}>High</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {/* <Grid item xs="12" className={classes.formContainer}>
                  <FormControl
                    className={clsx(classes.formControl, classes.inputField)}
                  >
                    <InputLabel id="demo-mutiple-chip-label">
                      Members
                    </InputLabel>
                    <Select
                                            labelId="demo-mutiple-chip-label"
                                            id="demo-mutiple-chip"
                                            multiple
                                            value={members.value}
                                            onChange={handleMemberChange}
                                            error={members.value === [] && members.visited === true ? true : false}
                                            required
                                            input={<Input id="select-multiple-chip"/>}
                                            renderValue={(selected) => (
                                                <div className={classes.chips}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} className={classes.chip} />
                                                    ))}
                                                </div>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            {developers.map((developer) => (
                                                <MenuItem key={developer._id} value={developer.name} style={getStyles(developer.name, developer.name, theme)}>
                                                    {developer.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        
                  </FormControl>
                </Grid> */}
                <Grid item xs="12" className={classes.formContainer}>
                  <Button type="submit" variant="contained" color="primary">
                    Create
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid
            item
            xs="12"
            sm="12"
            md="6"
            lg="6"
            xl="6"
            className={classes.imageGrid}
          >
            <div>
              <img
                src={ProjectImage}
                className={clsx(classes.projectImage, "img-fluid")}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CreateBug;
