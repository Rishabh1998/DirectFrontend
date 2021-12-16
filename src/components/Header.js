import React from 'react'
import { AppBar, Toolbar, Grid, IconButton, makeStyles } from '@material-ui/core'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fff',
        
    }
}))

const logout = e => {
    e.preventDefault()
    console.log("logging out...");
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    return window.location.href = '/';
}

export default function Header() {

    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Grid container
                    alignItems="center">
                    <Grid item sm></Grid>
                    <Grid item>
                        {localStorage.getItem('token') ?
                        <IconButton onClick={logout}>
                            <PowerSettingsNewIcon fontSize="small" />
                        </IconButton>
                        :
                        null
                        }
                    </Grid> 
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
