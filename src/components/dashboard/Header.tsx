import React from 'react'
// import emunationLogo from '../../assets/Emunation-logo-48.png'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import UserMenu from './UserMenu'

const Header = () => {

    return (
        <AppBar color='secondary' style={{ maxHeight: 48 }}>
            <Toolbar variant='dense'>
                {/* <a href='/'>
                    <img src={emunationLogo} width='72' alt='logo' />
                </a> */}
                <Grid
                    container
                    direction='row'
                    justify='flex-end'
                    alignItems='center'
                    spacing={2}
                >
                    <Grid item>
                        <UserMenu />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Header
