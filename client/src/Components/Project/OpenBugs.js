import React, { useEffect, useState } from "react";

import {
  Button,
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { filter } from "lodash";

import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import clsx from "clsx";
import AssignmentInd from "@material-ui/icons/AssignmentInd";
import { ToastContainer, toast } from "react-toastify";

const useStyles = makeStyles((them) => {
  return {
    root: {},
    tableHead: {
      backgroundColor: "#cbd1cc",
      fontWeight: "bold",
    },
    createProjectButton: {
      color: "white",
    },
  };
});

export default function OpenBugs(props) {
  const { id } = useParams();
  const classes = useStyles();
  const [openBugs, setOpenBugs] = useState([]);
  const [page, setPage] = useState(0);
  const [row, setRow] = useState(2);
  const [member, setMember] = useState();
  const [bugid, setBugId] = useState();
  const user = useSelector((state) => state.authReducer);

  const [open, setOpen] = React.useState(false);
  const handleMemberChange = (e) => {
    setMember(e.target.value);
  };
  const handleClickOpen = (bug) => {
    setOpen(true);
    setBugId(bug)
    console.log(bug);
  };

  const handleCloseD = () => {
    setOpen(false);
  };

  const assignBug = async (e) => {
    setOpen(false);
    e.preventDefault();
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/projects/${id}/bugs/${bugid}`,
      headers: {
        Authorization: `Bearer ${user.jwtToken}`,
      },
      data: {
        user: member,
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
  };

  useEffect(() => {
    setOpenBugs(filter(props.bugs, { status: "Open" }));
  }, []);

  return (
    <>
      <Container className={classes.root}>
        <Link to={`/bugs/${id}`} className={clsx("btn btn-primary")}>
          <Button
            startIcon={<AddIcon />}
            className={classes.createProjectButton}
          >
            Add Bug
          </Button>
        </Link>
        <Box m={4}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <TableCell>
                    <b>Bug Title</b>
                  </TableCell>
                  <TableCell>
                    <b>Bug Description</b>
                  </TableCell>
                  <TableCell>
                    <b>Priority</b>
                  </TableCell>
                  <TableCell>
                    <b>Deadline</b>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {openBugs.slice(page * row, page * row + row).map((bug) => (
                  <TableRow>
                    <TableCell>{bug.title}</TableCell>
                    <TableCell>{bug.description}</TableCell>
                    <TableCell>{bug.priority}</TableCell>
                    <TableCell>{bug.deadline.slice(0, 10)}</TableCell>
                    <TableCell>
                      {/* <button className="btn btn-dark">
                        Request To Commit
                      </button> */}

                      <div>
                        <Button
                          startIcon={<AssignmentInd />}
                          className="btn btn-dark"
                          onClick={()=>{handleClickOpen(bug._id)}}
                        >
                          Assign Bug
                        </Button>
                        <Dialog open={open} onClose={handleCloseD}>
                          <DialogTitle>Assign To a Memeber</DialogTitle>
                          <DialogContent>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={member}
                              onChange={handleMemberChange}
                              label="Age"
                            >
                              {props.members.map((m) => {
                                // console.log(m);
                                return (
                                  <MenuItem value={m._id}>{m.name}</MenuItem>
                                );
                              })}
                            </Select>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={assignBug}>Assign</Button>
                          </DialogActions>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[2, 3, 5, 10, 15]}
              count={openBugs.length}
              rowsPerPage={row}
              page={page}
              onChangePage={(event, newPage) => setPage(newPage)}
              onChangeRowsPerPage={(event) => setRow(event.target.value)}
            />
          </TableContainer>
        </Box>
      </Container>
    </>
  );
}
