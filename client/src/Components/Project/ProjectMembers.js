import React, { useEffect, useState } from "react";

import {
  Container,
  Typography,
  Box,
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
  Select,
  Chip,
  InputLabel,
  Input,
  MenuItem,

} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { filter } from "lodash";
import { ToastContainer, toast } from "react-toastify";
import AddIcon from '@material-ui/icons/Add';
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

const useStyles = makeStyles((theme) => {
  return {
    root : {
        backgroundColor : "white"
    },
    // createProjectButton : {
    //     color : "white"
    //   },
    inputField: {
        width: "350px",
        marginTop: "20px"
    },
    dateField: {
        width: "175px",
        marginTop: "20px",
        marginRight: "5px",
        marginBottom: "20px"
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
        display: 'flex',
        flexWrap: 'wrap',
      },
      chip: {
        margin: 2,
      },
      noLabel: {
        marginTop: theme.spacing(3),
      },
      imageGrid: {
        display : "flex",
        justifyContent : "center",
        margin : "auto"
      },
      projectImage : {
          margin : "auto"
      },
  };
});

export default function ProjectMembers(props) {
  const classes = useStyles();
  const { id } = useParams();
  const [project, setProject] = useState();
  const [page, setPage] = useState(0);
  const [row, setRow] = useState(2);
  const user = useSelector((state) => state.authReducer);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState({value : [], visited : false});
    const [memberId, setMemberId] = useState([]);
    const [developers, setDevelopers] = useState([]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClose2 = () => {
    setOpen(false);
  }

  const handleClose = () => {
    setOpen(false);
     members.value.map((member) => {
        return developers.map((dev) => {
            if (member === dev.name) {
                memberId.push(dev._id);
            }
        })
    });

    axios({
        method : "POST",
        url : `${process.env.REACT_APP_API_URL}/projects/${id}/members`,
        headers : {
            "Authorization" : `Bearer ${user.jwtToken}`
        },
        data : {
            // name: projectName.value,
            // client: clientName.value,
            // description: description.value,
            // deadline: deadline,
            // duration: duration.value,
            // leads: leadId,
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

    // setLeadId([]);
    setMemberId([]);
}
  

  const handleMemberChange = (e) => {
    setMemberId([]);
    setMembers({value : e.target.value, visited : true});
};

  const theme = useTheme();

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
        setLoading(true);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

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
    // let array = filter(project.bugs, { assignedTO : { name  : "Test34"} });
  }, []);

  return (
    <>
      <Container className={classes.root}>
        {/* <Link to="/bugs" className={clsx("btn btn-primary")}><Button startIcon={<AddIcon />} className={classes.createProjectButton}>Add Bug</Button></Link> */}

        <div>
          <Button startIcon={<AddIcon />} className={classes.createProjectButton}  onClick={handleClickOpen}>
            Add Member
          </Button>
          <Dialog open={open} onClose={handleClose2}>
            <DialogTitle>Add Member</DialogTitle>
            <DialogContent>
              {/* <DialogContentText>
                Select Members Which you want to add.
              </DialogContentText> */}
              {/* <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
              /> */}

{/* <FormControl className={clsx(classes.formControl,classes.inputField)}> */}
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
                                    {/* </FormControl> */}
            </DialogContent>
            <DialogActions>
              {/* <Button onClick={handleClose}>Cancel</Button> */}
              <Button onClick={handleClose}>Add</Button>
            </DialogActions>
          </Dialog>
        </div>

        <Box m={4}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Member Name</TableCell>
                  <TableCell>Total Assign Bugs</TableCell>
                  <TableCell>Total Resolve Bugs</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading
                  ? project.members
                      .slice(page * row, page * row + row)
                      .map((member) => (
                        <TableRow>
                          <TableCell>{member.name}</TableCell>
                        </TableRow>
                      ))
                  : null}
              </TableBody>
            </Table>
            {/* <TablePagination rowsPerPageOptions={[2,3,5,10,15]} count={alluser.length} rowsPerPage={row} page={page} onChangePage={(event,newPage)=>setPage(newPage)} onChangeRowsPerPage={(event)=>setRow(event.target.value)}/> */}
          </TableContainer>
        </Box>
      </Container>
    </>
  );
}
