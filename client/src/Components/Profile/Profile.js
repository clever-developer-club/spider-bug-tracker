import React from "react";
import {
  Container,
  Grid,
  Avatar,
  Button,
  Divider,
  Typography,
  CardMedia,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import EmailIcon from "@material-ui/icons/Email";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import GitHubIcon from '@material-ui/icons/GitHub';
import PhoneIcon from '@material-ui/icons/Phone';
// import logo from "../../assets/shopping.gif";
// import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "100px",
  },
  body: {
    height: "100vh",
    width: "100%",
    backgroundColor: "#dbdbdb",
  },
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    margin: "auto",
  },
  name: {
    color: "#8a8a8a",
    margin: "10px",
    fontFamily: "Georgia, serif",
    fontWeight: "bold",
  },
  email: {
    display: "flex",
    alignItems: "center",
    color: "#8a8a8a",
    margin: "10px",
    justifyContent: "left",
    fontFamily: "Georgia, serif",
    fontSize : "16px",
  },
  editButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: theme.spacing(50),
    boxShadow: "5px 10px 15px gray",
  },
  cardDiv: {
    display: "flex",
    justifyContent: "center",
  },
  cardContent: {
    textAlign: "center",
  },
  cardText: {
    fontFamily: "Georgia, serif",
  },
  imgDiv: {
    padding: "10px",
  },
}));

const Profile = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.authReducer);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/user`, {
        headers: {
          Authorization: `Bearer ${user.jwtToken}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setUserData(res.data.data);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

    return (
      <div className={classes.body}>
        <Container className={classes.root}>
          <div className={classes.cardDiv}>
            <Card className={classes.card}>
              <CardActionArea className={classes.imgDiv}>
                {loading ? (
                  <Avatar
                    alt="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    src={userData.image?userData.image.url:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                    // alt="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    className={classes.large}
                  />
                ) : (
                  <img src={CircularProgress} alt="loading..." width="300px" />
                )}
              </CardActionArea>
              <Divider />
              <CardContent className={classes.cardContent}>
                <Typography variant="h4" className={classes.name}>
                  {userData.name}
                </Typography>
                <Typography variant="h6" className={classes.name}>
                  {userData.role}
                </Typography>
                <div className={classes.email}>
                  <EmailIcon style={{ marginRight: "10px" }} />
                    {userData.email}
                </div>
                <div className={classes.email}>
                  <GitHubIcon style={{ marginRight: "10px" }} />
                    {userData.githubUserName}
                </div>
                <div className={classes.email}>
                  <PhoneIcon style={{ marginRight: "10px" }} />
                    {userData.phone}
                </div>
                <div className={classes.editButton}>
                  <Link to="/edit/profile" style={{ width: "100%" }}>
                    <Button variant="contained" color="primary" fullWidth>
                      <EditIcon />
                      Edit
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>
    );
};

export default Profile;
