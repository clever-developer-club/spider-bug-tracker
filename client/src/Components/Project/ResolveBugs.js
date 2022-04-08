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
import { useProjectMemberStyles } from "../../CSS/muiStyles";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { filter } from "lodash";
import { Link } from "react-router-dom";



export default function ResolveBugs(props) {
  const { id } = useParams();
  const classes = useProjectMemberStyles();
  // const classes = useStyles();
  const [resolveBugs, setResolveBugs] = useState([]);
  const [page, setPage] = useState(0);
  const [row, setRow] = useState(5);
  const user = useSelector((state) => state.authReducer);

  useEffect(() => {
    setResolveBugs(filter(props.bugs, { status: "Closed" }));
  }, [resolveBugs]);
  // console.log(resolveBugs)

  return (
    <>
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
                    <b>Resolved By</b>
                  </TableCell>
                  <TableCell className={classes.tableHeader}>
                    <b>Deadline</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {resolveBugs.slice(page * row, page * row + row).map((bug) => (
                  <TableRow id={bug._id}>
                    <TableCell className={classes.tableBodyText}><Link to={`/project/${id}/bug/${bug._id}`}>{bug.title}</Link></TableCell>
                    <TableCell className={classes.tableBodyText}>{bug.description}</TableCell>
                    <TableCell className={classes.tableBodyText}>{bug.priority}</TableCell>
                    <TableCell className={classes.tableBodyText}>{bug.assignedTo.name}</TableCell>
                    <TableCell className={classes.tableBodyText}>{bug.deadline.slice(0, 10)}</TableCell>
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
