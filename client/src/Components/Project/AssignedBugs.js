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
  Select,
  MenuItem
} from "@material-ui/core";
import { useProjectMemberStyles } from "../../CSS/muiStyles";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import { useSelector } from "react-redux";
import { filter } from "lodash";
import { Link } from "react-router-dom";
import clsx from "clsx";
// import AssignmentIndIcon from '@material-ui/icons-material/AssignmentInd';
import AssignmentInd from "@material-ui/icons/AssignmentInd";
import { ToastContainer, toast } from "react-toastify";

export default function AssignedBugs(props) {
  const { id } = useParams();
  // const classes = useStyles();
  const classes = useProjectMemberStyles();
  const [assignedBugs, setAssignedBugs] = useState([]);
  const [page, setPage] = useState(0);
  const [row, setRow] = useState(5);
  const [member, setMember] = useState();
  const [bugid, setBugId] = useState();
  
  // const [memberid, setMemberId] = useState();
  const user = useSelector((state) => state.authReducer);

  const handleResolveBug = (bug)=>{
    setBugId(bug);

    axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_API_URL}/projects/${id}/bugs/${bugid}`,
      headers: {
        Authorization: `Bearer ${user.jwtToken}`,
      },
      data: {
        status: 'Closed',
      },
    }).then((res) => {
        if (!res.data.error) {
          toast.success(res.data.message);
        } else {
          //  toast.error(res.data.message);
        }
      })
      .catch( (err) => {
        // toast.error(err.response.data.message);
      });
  }



  useEffect(() => {
    setAssignedBugs(filter(props.bugs, { status: "Assigned" }));
  }, [assignedBugs]);

  return (
    <>
      
        {/* <div>
          <Button
            startIcon={<AssignmentInd />}
            className={classes.createProjectButton}
            onClick={handleClickOpen}
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

                {
                  props.members.map((m)=>{
                    // console.log(m);
                    return(

                      <MenuItem value={m._id}>{m.name}</MenuItem>
                    )

                  })
                }
              </Select>
            </DialogContent>
            <DialogActions>
              <Button onClick={assignBug}>Assign</Button>
            </DialogActions>
          </Dialog>
        </div> */}
        <Container className={classes.tablePaper}>
          <Box m={4}>
          <TableContainer component={Paper} >
            <Table>
              <TableHead >
                <TableRow>
                  <TableCell className={classes.tableHeader}>
                    <b>Bug Title</b>
                  </TableCell>
                  <TableCell className={classes.tableHeader}>
                    <b>Bug Description</b>
                  </TableCell>
                  <TableCell className={classes.tableHeader}>
                    <b>Priority</b>
                  </TableCell>
                  <TableCell className={classes.tableHeader}>
                    <b>Assigned To</b>
                  </TableCell>
                  <TableCell className={classes.tableHeader}>
                    <b>Deadline</b>
                  </TableCell>
                  <TableCell className={classes.tableHeader}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assignedBugs.slice(page * row, page * row + row).map((bug) => (
                  <TableRow>
                    <TableCell className={classes.tableBodyText}><Link to={`/project/${id}/bug/${bug._id}`}>{bug.title}</Link></TableCell>
                    <TableCell className={classes.tableBodyText}>{bug.description}</TableCell>
                    <TableCell className={classes.tableBodyText}>{bug.priority}</TableCell>
                    <TableCell className={classes.tableBodyText}>{bug.assignedTo.name}</TableCell>
                    <TableCell className={classes.tableBodyText}>{bug.deadline.slice(0, 10)}</TableCell>
                    <TableCell className={classes.tableBodyText}>
                    <Button variant="contained" onClick={()=>handleResolveBug(bug._id)} color="primary" className={classes.requestCommitButton}>
                      <AddIcon /> Request To Commit
                    </Button>
                      {/* <button key={bug._id+'7'} className="btn btn-dark" onClick={()=>handleResolveBug(bug._id)}>
                        Request To Commit
                      </button> */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[2, 3, 5, 10, 15]}
              count={assignedBugs.length}
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
