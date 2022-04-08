import 'date-fns';
import React, { useEffect, useState } from 'react'
import {
    Container,
    Grid,
    TextField,
    makeStyles,
    Input,
    InputLabel,
    MenuItem ,
    FormControl,
    Select,
    Chip,
    useTheme, 
    Button
} from '@material-ui/core'
import axios from 'axios'
import { useSelector } from 'react-redux'
import clsx from "clsx";
import { ToastContainer, toast } from "react-toastify";
import DateFnsUtils from '@date-io/date-fns';
import { useFormStyles } from "../../CSS/muiStyles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import ProjectImage from '../../Assets/Images/CreateProject.jpg';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

// const useStyles = makeStyles((theme) => ({
//     root : {
//         backgroundColor : "white"
//     },
//     inputField: {
//         width: "350px",
//         marginTop: "20px"
//     },
//     dateField: {
//         width: "175px",
//         marginTop: "20px",
//         marginRight: "5px",
//         marginBottom: "20px"
//     },
//     formGrid: {
//         display: "flex",
//         justifyItems: "center",
//     },
//     formContainer: {
//         display: "flex",
//         justifyContent: "center",
//     },
//     formControl: {
//         margin: theme.spacing(1),
//         minWidth: 120,
//         maxWidth: 300,
//       },
//       chips: {
//         display: 'flex',
//         flexWrap: 'wrap',
//       },
//       chip: {
//         margin: 2,
//       },
//       noLabel: {
//         marginTop: theme.spacing(3),
//       },
//       imageGrid: {
//         display : "flex",
//         justifyContent : "center",
//         margin : "auto"
//       },
//       projectImage : {
//           margin : "auto"
//       },
      
// }))

const CreateProject = () => {

    const user = useSelector((state) => state.authReducer);
    // const classes = useStyles();
    const classes = useFormStyles();

    const [projectName, setProjectName] = useState({value : "", visited : false});
    const [clientName, setClientName] = useState({value : "", visited : false});
    const [description, setDescription] = useState({value : "", visited : false});
    const [deadline, setDeadline] = useState();
    const [duration, setDuration] = useState({value : 1,visited : false});
    const [leads, setLeads] = useState({value : [], visited : false});
    const [leadId, setLeadId] = useState([]);
    const [members, setMembers] = useState({value : [], visited : false});
    const [memberId, setMemberId] = useState([]);
    const [developers, setDevelopers] = useState([]);
    //const [Loading, setLoading] = useState(false);
    const theme = useTheme();


    const handleLeadChange = (e) => {
        setLeadId([]);
        setLeads({value : e.target.value, visited : true});
    };

    const handleMemberChange = (e) => {
        setMemberId([]);
        setMembers({value : e.target.value, visited : true});
    };

    const createProject = async (e) => {
        e.preventDefault();

        await leads.value.map((lead) => {
            return developers.map((dev) => {
                if (lead === dev.name) {
                    leadId.push(dev._id);
                }
            })
        });

        await members.value.map((member) => {
            return developers.map((dev) => {
                if (member === dev.name) {
                    memberId.push(dev._id);
                }
            })
        });

        await axios({
            method : "POST",
            url : `${process.env.REACT_APP_API_URL}/projects`,
            headers : {
                "Authorization" : `Bearer ${user.jwtToken}`
            },
            data : {
                name: projectName.value,
				client: clientName.value,
				description: description.value,
				deadline: deadline,
				duration: duration.value,
				leads: leadId,
				members: memberId
            }
        }).then((res) => {
            if (!res.data.error) {
                toast.success(res.data.message);    
            } else {
                toast.error(res.data.message);
            }
        }).catch((err) => {
            toast.error(err.response.data.message);
        });

        setLeadId([]);
        setMemberId([]);
    }

    useEffect(() => {
        console.log(new Date());
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}/Developers`,
            headers: {
                "Authorization": `Bearer ${user.jwtToken}`
            }
        }).then((res) => {
            setDevelopers(res.data.data);
            //setLoading(true);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <>
            <ToastContainer />
            <Container className={classes.rootPaper}>
                <Grid container>
                    <Grid item xs="12" sm="12" md="6" lg="6" xl="6" className={classes.formGrid} >
                        <form onSubmit={createProject}>
                            <Grid container className={classes.formContainer}>
                                <Grid item xs="12" className={classes.formContainer}>
                                    <TextField label="Project Name" variant='outlined' value={projectName.value} onChange={(e) => {setProjectName({value : e.target.value, visited : true})}} className={classes.inputField} error={projectName.value === "" && projectName.visited === true ? true : false} required/>
                                </Grid>
                                <Grid item xs="12" className={classes.formContainer}>
                                    <TextField label="Client Name" variant='outlined' value={clientName.value} onChange={(e) => {setClientName({value : e.target.value, visited : true})}} className={classes.inputField} error={clientName.value === "" && clientName.visited === true ? true : false} required/>
                                </Grid>
                                <Grid item xs="12" className={classes.formContainer}>
                                    <TextField
                                        label="Description"
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        className={classes.inputField}
                                        value={description.value}
                                        onChange={(e) => {setDescription({value : e.target.value, visited : true})}}
                                        error={description.value === "" && description.visited === true ? true : false}
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
                                        'aria-label': 'change date',
                                    }}
                                    />
                                </ MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item xs="1.5">
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
                                </Grid>
                                <Grid item xs="12" className={classes.formContainer}>
                                    <FormControl className={clsx(classes.formControl,classes.inputField)}>
                                        <InputLabel id="demo-mutiple-chip-label">Leads</InputLabel>
                                        <Select
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
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs="12" className={classes.formContainer}>
                                    <div className={classes.formFilled}>
                                    <FormControl className={clsx(classes.formControl,classes.inputField)}>
                                        <InputLabel id="demo-mutiple-chip-label">Members</InputLabel>
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
                                    </div>
                                </Grid>
                                <Grid item xs="12" className={classes.formContainer}>
                                    <Button type='submit' variant="contained" color="primary" className={classes.createProjectButton}>
                                        Create
                                    </Button>
                                    {/* <Button type='submit' variant='contained' color='primary'>Create</Button> */}
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                    <Grid item xs="12" sm="12" md="6" lg="6" xl="6" className={classes.imageGrid}>
                        <div>
                            <img src={ProjectImage} className={clsx(classes.projectImage, "img-fluid")}/>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default CreateProject