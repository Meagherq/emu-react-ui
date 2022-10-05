import React, { useState, MouseEvent } from 'react'
import { IconButton, MenuItem, Menu } from '@material-ui/core/'
import { AccountCircle } from '@material-ui/icons'
// import { Link } from '@material-ui/core'
import { getAuth } from '../../auth/auth'

const UserMenu = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const auth = getAuth()
    const handleMenu = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        auth.logout()
        handleClose()
    }

    return (
        <div>
            <IconButton onClick={handleMenu} color='inherit'>
                <AccountCircle />
            </IconButton>
            <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    )
}

export default UserMenu