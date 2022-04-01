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
  Select
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { filter } from "lodash";
import { Link } from "react-router-dom";
import clsx from "clsx";
// import AssignmentIndIcon from '@material-ui/icons-material/AssignmentInd';
import AssignmentInd from "@material-ui/icons/AssignmentInd";

const useStyles = makeStyles((them) => {
  return {
    root: {},
    tableHead: {
      backgroundColor: "#cbd1cc",
      fontWeight: "bold",
    },
  };
});

export default function AssignedBugs(props) {
  const { id } = useParams();
  const classes = useStyles();
  const [assignedBugs, setAssignedBugs] = useState([]);
  const [page, setPage] = useState(0);
  const [row, setRow] = useState(2);
  const user = useSelector((state) => state.authReducer);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setAssignedBugs(filter(props.bugs, { status: "Assigned" }));
  }, []);

  return (
    <>
      <Container className={classes.root}>
        
          <div>
          <Button
            startIcon={<AssignmentInd />}
            className={classes.createProjectButton}
            onClick={handleClickOpen}
          >
            Assign Bug
          </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Assign To a Memeber</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>

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
                    <b>Assigned To</b>
                  </TableCell>
                  <TableCell>
                    <b>Deadline</b>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assignedBugs.slice(page * row, page * row + row).map((bug) => (
                  <TableRow>
                    <TableCell>{bug.title}</TableCell>
                    <TableCell>{bug.description}</TableCell>
                    <TableCell>{bug.priority}</TableCell>
                    <TableCell>{bug.assignedTo.name}</TableCell>
                    <TableCell>{bug.deadline.slice(0, 10)}</TableCell>
                    <TableCell>
                      <button className="btn btn-dark">
                        Request To Commit
                      </button>
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
