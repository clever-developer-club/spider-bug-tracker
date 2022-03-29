import React,{useEffect, useState} from 'react'
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
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {Link, useNavigate} from "react-router-dom"
import clsx from 'clsx';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      minWidth : 650
    },
    createProjectButton : {
      color : "white"
    }
  };
});

const ProjectList = () => {

  const classes = useStyles();
  const user = useSelector((state) => state.authReducer)
  const [page,setPage]=useState(0);
  const [row,setRow]=useState(2)
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method : "GET",
      url : `${process.env.REACT_APP_API_URL}/projects`,
      headers : {
        "Authorization" : `Bearer ${user.jwtToken}`
      }
    }).then((res) => {
      if (!res.data.error) {
        setProjects(res.data.data);
        setLoading(true);
      } else {
        console.log(res.data.error)
      }
    }).catch((err) => {
      console.log(err)
    })
  },[]);

  return (
    <>
    {
        user.role === "Admin" ? <Container>
        <Container className={classes.root}>
          <Box m={4}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Project Name</TableCell>
                    <TableCell>Total Member</TableCell>
                    <TableCell>Open Bugs</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>DeadLine</TableCell>
                    <TableCell>Create Date</TableCell>
                    <TableCell>All Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                 {loading ? projects.slice(page*row,page*row+row).map((project)=>(
                                    <TableRow>
                                    <TableCell>{project.name}</TableCell>
                                    <TableCell>{project.members.length}</TableCell>
                                    <TableCell>{project.bugs.length}</TableCell>
                                    <TableCell>{project.status}</TableCell>
                                    <TableCell>{project.deadline.substr(0,10)}</TableCell>
                                    <TableCell>{project.createdAt.substr(0,10)}</TableCell>
                                    <TableCell><Link className='btn btn-primary' to={`/project/${project._id}`}>Open</Link></TableCell>
                                </TableRow>
                                )) : null }
                </TableBody>
              </Table>
              <TablePagination rowsPerPageOptions={[2,3,5,10,15]} count={projects.length} rowsPerPage={row} page={page} onChangePage={(event,newPage)=>setPage(newPage)} onChangeRowsPerPage={(event)=>setRow(event.target.value)}/>
            </TableContainer>
          </Box>
        </Container>
      </Container> : <div><img /></div>
    }
    </>
  )
}

export default ProjectList