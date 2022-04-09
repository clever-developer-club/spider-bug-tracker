import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(
    (theme) => ({
        root: {
            padding: '1em 0',
            [theme.breakpoints.down('xs')]: {
                padding: '0.5em 0.5em',
            },
            // backgroundColor: '#000',
        
        }, 
        rootPaper: {
            padding: '1.5em',
            // margin: '0 4em',
            boxShadow: '1px 1px 2px 1px rgba(0, 0, 0, 0.24)',
            borderRadius: 5,
            backgroundColor: '#fff',
            [theme.breakpoints.down('xs')]: {
              padding: '0.7em 0.3em',
              margin: '0 0.5em',
            },
        },
        
        tablePaper: {
            padding: '1em 0',
            // textAlign: 'center',

            // backgroundColor: '#fff',
        }, 
        tableHeader: {
            backgroundColor: '#d2eefc',
            color: "#063852",
            fontWeight: "bold",
            textAlign: 'center',
        },
        tableBodyText: {

            textAlign: 'center',
        },
        createProjectButton : {
            color : "white",
            margin: "1.5em 0.6em 0 ",
            backgroundColor: "#2d91bd",
            "&:hover": {
                color : "white",
                backgroundColor: "#1c688a",
            }
        },
        DetailsButton : {
            color : "#2d91bd",
            padding: "0.5",
            
        },
        loader: {
            margin: "auto",
        },
        fullPage: {
            display: "flex",
            height: "80vh",
        },

        // -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
        //                  Project Details page 
        // -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
        
        title: {
            fontWeight: "bold",
            // paddingBottom: "0.5em",
        },
        exitProjectButton: {
            color : "#2d91bd",
            border: "1px solid #2d91bd",
            display: "flex",
            marginLeft: "auto",
            // backgroundColor: "#2d91bd",
            "&:hover": {
                // color : "white",
                // backgroundColor: "#1c688a",
                color : "#1c688a",
                border: "1px solid #1c688a",
            }
        },
        exitIcon: {
            transform: "rotate(180deg)",
        },
        details: {
            marginTop: "0.5em",
        },
        divider: {
            minWidth: "80%",
            // padding: "0.1em 0"
            margin: "1.5em 0",
        },
        DetailsPaper: {
            padding: '0',
            margin: '1.5em 0',
            boxShadow: '1px 1px 2px 1px rgba(0, 0, 0, 0.24)',
            borderRadius: 5,
            backgroundColor: '#fff',
            [theme.breakpoints.down('xs')]: {
              padding: '0.7em 0.3em',
              margin: '0 0.5em',
            },
        },
        menu: {
            // margin: "0",
        },
        menuItem: {
            // textDecoration: "none",
            color: "black",
        },
        detailsAppbar: {
            margin: "0",

        },
    }),
    { index: 1 }    
);

export const useProjectMemberStyles = makeStyles(
    (theme) => ({
        root: {
            backgroundColor: "white",
        },
        
        // createProjectButton : {
        //     color : "white"
        //   },
        tableHead: {
            backgroundColor: "#cbd1cc",
            fontWeight: "bold",
        },
        inputField: {
            width: "350px",
            marginTop: "20px",
        },
        dateField: {
            width: "175px",
            marginTop: "20px",
            marginRight: "5px",
            marginBottom: "20px",
        },
        formGrid: {
            display: "flex",
            justifyItems: "center",
        },
        formContainer: {
            display: "flex",
            justifyContent: "center",
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            maxWidth: 300,
        },
        chips: {
            display: "flex",
            flexWrap: "wrap",
        },
        chip: {
            margin: 2,
        },
        noLabel: {
            marginTop: theme.spacing(3),
        },
        imageGrid: {
            display: "flex",
            justifyContent: "center",
            margin: "auto",
        },
        projectImage: {
            margin: "auto",
        },
        createProjectButton : {
            color : "white",
            margin: "1.5em 0.6em 0 ",
            backgroundColor: "#2d91bd",
            "&:hover": {
                color : "white",
                backgroundColor: "#1c688a",
            }
        },
        tablePaper: {
            padding: '0 0 0 0',
            // textAlign: 'center',

            // backgroundColor: '#fff',
        }, 
        tableHeader: {
            backgroundColor: '#d2eefc',
            color: "#063852",
            fontWeight: "bold",
            textAlign: 'center',
        },
        tableBodyText: {
            // color: "black",
            textAlign: 'center',
        },
        requestCommitButton: {
            color : "white",
            // margin: "1.5em 0.6em 0 ",
            backgroundColor: "#2d91bd",
            "&:hover": {
                color : "white",
                backgroundColor: "#1c688a",
            }
        },
    }),
    { index: 1 } 
);

export const useFormStyles = makeStyles(
    (theme) => ({
        root: {
            padding: '1em 0',
            [theme.breakpoints.down('xs')]: {
                padding: '0.5em 0.5em',
            },
            // backgroundColor: '#000',
        
        }, 
        rootPaper: {
            padding: '1.5em',
            // margin: '0 4em',
            boxShadow: '1px 1px 2px 1px rgba(0, 0, 0, 0.24)',
            borderRadius: 5,
            backgroundColor: '#fff',
            [theme.breakpoints.down('xs')]: {
              padding: '0.7em 0.3em',
              margin: '0 0.5em',
            },
        },
        
        tablePaper: {
            padding: '1em 0',
            // textAlign: 'center',

            // backgroundColor: '#fff',
        }, 
        tableHeader: {
            backgroundColor: '#d2eefc',
            color: "#063852",
            fontWeight: "bold",
            textAlign: 'center',
        },
        tableBodyText: {

            textAlign: 'center',
        },
        createProjectButton : {
            color : "white",
            margin: "1em 0.6em 0 ",
            backgroundColor: "#2d91bd",
            "&:hover": {
                color : "white",
                backgroundColor: "#1c688a",
            }
        },
       
        inputField: {
            width: "350px",
            marginTop: "20px"
        },
        dateField: {
            width: "175px",
            marginTop: "20px",
            marginRight: "5px",
            marginBottom: "20px"
        },
        formGrid: {
            display: "flex",
            justifyItems: "center",
        },
        formContainer: {
            display: "flex",
            justifyContent: "center",
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            maxWidth: 300,
        },
        chips: {
        display: 'flex',
        flexWrap: 'wrap',
        },
        chip: {
        margin: 2,
        },
        noLabel: {
        marginTop: theme.spacing(3),
        },
        imageGrid: {
        display : "flex",
        justifyContent : "center",
        margin : "auto"
        },
        projectImage : {
            margin : "auto"
        },
        formFilled: {
            // display: "flex",
            // margin: "auto",
            // padding: "auto",
            // width: '100%',
        },
        
    }),
    { index: 1 } 
);

export const useBugDetailsStyles = makeStyles(
    (theme) => ({
        root: {
            padding: '1em 0',
            [theme.breakpoints.down('xs')]: {
                padding: '0.5em 0.5em',
            },
            // backgroundColor: '#000',
        
        }, 
        rootPaper: {
            padding: '1.5em',
            // margin: '0 4em',
            marginBottom: '1em',
            boxShadow: '1px 1px 2px 1px rgba(0, 0, 0, 0.24)',
            borderRadius: 5,
            backgroundColor: '#fff',
            color : "#1c688a",
            [theme.breakpoints.down('xs')]: {
              padding: '0.7em 0.3em',
              margin: '0 0.5em',
            },
        },
        
        tablePaper: {
            padding: '1em 0',
            
            // textAlign: 'center',

            // backgroundColor: '#fff',
        }, 
        tableHeader: {
            backgroundColor: '#d2eefc',
            color: "#063852",
            fontWeight: "bold",
            textAlign: 'center',
        },
        tableBodyText: {
            textAlign: 'center',
        },
        createProjectButton : {
            color : "white",
            margin: "1em 0.6em 0 ",
            backgroundColor: "#2d91bd",
            "&:hover": {
                color : "white",
                backgroundColor: "#1c688a",
            }
        },
        menu: {
            marginTop: "80px",
          },
          menuItem: {
            textDecoration: "none",
            color: "black",
          },
          headerPaper: {
            // padding: '0.8em 1.5em',
            marginBottom: "1em",
            // display: 'flex',
            alignItems: "center",
          },
          second: {
            // padding: '0.8em 1.5em',
            marginTop: "2em",
            // display: 'flex',
            // alignItems: 'center',
          },
          loader: {
            margin: "auto",
            },
            fullPage: {
                display: "flex",
                height: "80vh",
            },
            title: {
                fontWeight: "bold",
                // paddingBottom: "0.5em",
            },
            titlebar: {
                fontWeight: "bold",
                alignItems: "middle",
                display: "flex",
                alignItems: "center",
                color : "#1c688a",
                // paddingBottom: "0.5em",
            },
            detailsbar: {
                marginLeft: "0.6rem",
                fontWeight: "normal",
                alignItems: "middle",
                display: "flex",
                alignItems: "center",
                marginBottom: "0",
            },
            exitProjectButton: {
                color : "#2d91bd",
                border: "1px solid #2d91bd",
                display: "flex",
                marginLeft: "auto",
                // backgroundColor: "#2d91bd",
                "&:hover": {
                    // color : "white",
                    // backgroundColor: "#1c688a",
                    color : "#1c688a",
                    border: "1px solid #1c688a",
                }
            },
            exitIcon: {
                transform: "rotate(180deg)",
            },
            details: {
                marginTop: "0.5em",
            },
            divider: {
                minWidth: "80%",
                // padding: "0.1em 0"
                margin: "1.5em 0",
            },
            noteStyle:{
                marginLeft: "0.7em",
                color : "#1c688a",
                fontWeight:"bold",
            },
            noteDetails: {
                color: "#2d91bd"
            },
            singleNote: {
                display: "flex",
                alignItem: "flex-start",
                marginBottom: "0.3em",
                marginnTop: "0.6em",
            }
    }),
    { index: 1 } 
);