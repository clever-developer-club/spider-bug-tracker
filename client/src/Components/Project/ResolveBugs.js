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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { filter } from "lodash";
import { Link } from "react-router-dom";


const useStyles = makeStyles((them) => {
  return {
    root: {},
    tableHead: {
      backgroundColor: "#cbd1cc",
      fontWeight: "bold",
    },
  };
});

export default function ResolveBugs(props) {
  const { id } = useParams();
  const classes = useStyles();
  const [resolveBugs, setResolveBugs] = useState([]);
  const [page, setPage] = useState(0);
  const [row, setRow] = useState(5);
  const user = useSelector((state) => state.authReducer);

  useEffect(() => {
    setResolveBugs(filter(props.bugs, { status: "Closed" }));
  }, []);
  // console.log(resolveBugs)

  return (
    <>
      <Container className={classes.root}>
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
                    <b>Resolved By</b>
                  </TableCell>
                  <TableCell>
                    <b>Deadline</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {resolveBugs.slice(page * row, page * row + row).map((bug) => (
                  <TableRow id={bug._id}>
                    <TableCell><Link to={`/project/${id}/bug/${bug._id}`}>{bug.title}</Link></TableCell>
                    <TableCell>{bug.description}</TableCell>
                    <TableCell>{bug.priority}</TableCell>
                    <TableCell>{bug.assignedTo.name}</TableCell>
                    <TableCell>{bug.deadline.slice(0, 10)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[2, 3, 5, 10, 15]}
              count={resolveBugs.length}
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
