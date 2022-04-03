import { makeStyles } from '@material-ui/core/styles';

export const useMainPageStyles = makeStyles(
    (theme) => ({
        root: {
            padding: '1em 0',
            [theme.breakpoints.down('xs')]: {
                padding: '0.5em 0.5em',
            },
            // backgroundColor: '#000',
        
        }, 
        rootPage: {
            // backgroundColor: '#000',
        },
        
        projectsPaper: {
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
    }),
    { index: 1 }    
);