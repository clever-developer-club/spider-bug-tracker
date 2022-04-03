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
  Paper,
  CircularProgress,
} from "@material-ui/core"
import {useStyles} from '../CSS/muiStyles';
import AddIcon from '@material-ui/icons/Add';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {Link} from "react-router-dom"
import clsx from 'clsx';


const HomePage = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.authReducer)
  const bugedd = useSelector((state) => state.bugReducer)
  console.log(bugedd)
  const [page,setPage]=useState(0);
  const [row,setRow]=useState(5)
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

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
      {loading ?
      <Container className={classes.rootPaper} >
        <Button variant="contained" href="/projects" color="primary" className={classes.createProjectButton}>
          <AddIcon /> ADD PROJECT
        </Button>
        
        {/* <Link to="/projects" className={clsx("btn btn-primary")}><Button startIcon={<AddIcon />} className={classes.createProjectButton}>Create Project</Button></Link> */}
        <Container className={classes.tablePaper}>
          <Box m={1}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead >
                  <TableRow className={classes.tableHeader}>
                    <TableCell className={classes.tableHeader}>Project Name</TableCell>
                    <TableCell className={classes.tableHeader}>Total Member</TableCell>
                    <TableCell className={classes.tableHeader}>Open Bugs</TableCell>
                    <TableCell className={classes.tableHeader}>Status</TableCell>
                    <TableCell className={classes.tableHeader}>DeadLine</TableCell>
                    <TableCell className={classes.tableHeader}>Create Date</TableCell>
                    <TableCell className={classes.tableHeader}>All Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {projects.slice(page*row,page*row+row).map((project)=>(
                                <TableRow>
                                <TableCell className={classes.tableBodyText}>{project.name}</TableCell>
                                <TableCell className={classes.tableBodyText}>{project.members.length}</TableCell>
                                <TableCell className={classes.tableBodyText}>{project.bugs.length}</TableCell>
                                <TableCell className={classes.tableBodyText}>{project.status}</TableCell>
                                <TableCell className={classes.tableBodyText}>{project.deadline.substr(0,10)}</TableCell>
                                <TableCell className={classes.tableBodyText}>{project.createdAt.substr(0,10)}</TableCell>
                                <TableCell className={classes.tableBodyText}><Link to={`/project/${project._id}`} className={classes.DetailsButton}><MoreHorizIcon /> </Link></TableCell>
                            </TableRow>
                            )) }
                </TableBody>
              </Table>
              <TablePagination rowsPerPageOptions={[2,3,5,10,15]} count={projects.length} rowsPerPage={row} page={page} onChangePage={(event,newPage)=>setPage(newPage)} onChangeRowsPerPage={(event)=>setRow(event.target.value)}/>
            </TableContainer>
          </Box>
        </Container>
      </Container>
      : <div className={classes.fullPage}>
          <CircularProgress className={classes.loader} disableShrink size={40} /> 
        </div>
      }
    </>
  )
}

export default HomePage