import React,{useState} from 'react'
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

const useStyles = makeStyles((them) => {
  return {
    root: {
      minWidth : 650
    },
  };
});

const HomePage = () => {

  const classes = useStyles();
  const [page,setPage]=useState(0);
  const [row,setRow]=useState(2)

  return (
    <>
      <Container>
        <Button startIcon={<AddIcon />} variant="contained">Create Project</Button>
        <Container className={classes.root}>
          <Box m={4}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Project Name</TableCell>
                    <TableCell>Total Member</TableCell>
                    <TableCell>Admin Name</TableCell>
                    <TableCell>Open Bugs</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Create Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {alluser.slice(page*row,page*row+row).map((item)=>(
                                    <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                ))} */}
                </TableBody>
              </Table>
              {/* <TablePagination rowsPerPageOptions={[2,3,5,10,15]} count={alluser.length} rowsPerPage={row} page={page} onChangePage={(event,newPage)=>setPage(newPage)} onChangeRowsPerPage={(event)=>setRow(event.target.value)}/> */}
            </TableContainer>
          </Box>
        </Container>
      </Container>
    </>
  )
}

export default HomePage