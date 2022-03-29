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
    Paper
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useParams } from 'react-router-dom'
import { useSelector } from "react-redux";
import { filter } from "lodash";

const useStyles = makeStyles((them) => {
    return {
        root: {},
    };
});

export default function ProjectMembers(props) {
    const classes = useStyles();
    const {id} = useParams();
    const [project,setProject]=useState();
    const [page,setPage]=useState(0);
    const [row,setRow]=useState(2)
    const user = useSelector((state) => state.authReducer);
    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        axios({
            method : "GET",
            url : `${process.env.REACT_APP_API_URL}/projects/${id}`,
            headers : {
                "Authorization" : `Bearer ${user.jwtToken}`
            }
        }).then((res) => {
            setProject(res.data.data);
            setLoading(true);
            console.log(res.data.data);
        }).catch((err) => {
            console.log(err);
        });
        // let array = filter(project.bugs, { assignedTO : { name  : "Test34"} });
    },[])

    return (
        <>
            <Container className={classes.root}>
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
                                {loading ? project.members.slice(page*row,page*row+row).map((member)=>(
                                    <TableRow>
                                    <TableCell>{member.name}</TableCell>
                                </TableRow>
                                )) : null}
                            </TableBody>
                        </Table>
                        {/* <TablePagination rowsPerPageOptions={[2,3,5,10,15]} count={alluser.length} rowsPerPage={row} page={page} onChangePage={(event,newPage)=>setPage(newPage)} onChangeRowsPerPage={(event)=>setRow(event.target.value)}/> */}
                    </TableContainer>
                </Box>
            </Container>
        </>
    );
}