import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {useSelector} from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {

} from "@material-ui/core";

const ProjectDetails = () => {
    
    const {id} = useParams()
    const user = useSelector((state) => state.authReducer);
    const [project, setProject] = useState();
    const [loading, setLoading] = useState(false); 

    console.log(id);

    useEffect(() => {
        axios({
            method : "GET",
            url : `${process.env.REACT_APP_API_URL}/projects/${id}`,
            headers : {
                'Authorization' : `Bearer ${user.jwtToken}`
            }
        }).then((res) => {
            setProject(res.data.data);
            setLoading(true);
        }).catch((err) => {
            toast.error(err.response.statusText);
        });
    },[])

    return (
    <>
        <ToastContainer />
        {
            loading ? <Grid item>
                <Grid container></Grid>
                <Grid></Grid>
            </Grid> : "Loading" 
        }
    </>
  )
}

export default ProjectDetails