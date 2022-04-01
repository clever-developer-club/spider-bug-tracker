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
    Paper
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useParams } from 'react-router-dom'
import { useSelector } from "react-redux";
import { filter } from "lodash";

import AddIcon from '@material-ui/icons/Add';
import {Link} from "react-router-dom"
import clsx from 'clsx';

const useStyles = makeStyles((them) => {
    return {
        root: {},
        tableHead : {
            backgroundColor : "#cbd1cc",
            fontWeight : "bold"
        },
        createProjectButton : {
            color : "white"
          },
    };
});

export default function OpenBugs(props) {
    const { id } = useParams();
    const classes = useStyles();
    const [openBugs,setOpenBugs]=useState([]);
    const [page,setPage]=useState(0);
    const [row,setRow]=useState(2)
    const user = useSelector((state) => state.authReducer);

    useEffect(() => {
        setOpenBugs(filter(props.bugs, {"status" : "Open"}));
    },[])

    return (
        <>
            <Container className={classes.root}>

            <Link to={`/bugs/${id}`} className={clsx("btn btn-primary")}><Button startIcon={<AddIcon />} className={classes.createProjectButton}>Add Bug</Button></Link>
                <Box m={4}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead className={classes.tableHead}>
                                <TableRow>
                                    <TableCell><b>Bug Title</b></TableCell>
                                    <TableCell><b>Bug Description</b></TableCell>
                                    <TableCell><b>Priority</b></TableCell>
                                    <TableCell><b>Deadline</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {openBugs.slice(page*row,page*row+row).map((bug)=>(
                                    <TableRow>
                                    <TableCell>{bug.title}</TableCell>
                                    <TableCell>{bug.description}</TableCell>
                                    <TableCell>{bug.priority}</TableCell>
                                    <TableCell>{bug.deadline.slice(0,10)}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination rowsPerPageOptions={[2,3,5,10,15]} count={openBugs.length} rowsPerPage={row} page={page} onChangePage={(event,newPage)=>setPage(newPage)} onChangeRowsPerPage={(event)=>setRow(event.target.value)}/>
                    </TableContainer>
                </Box>
            </Container>
        </>
    );
}