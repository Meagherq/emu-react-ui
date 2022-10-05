import React, { useState } from 'react'
import clsx from 'clsx'
import { Drawer, IconButton } from '@material-ui/core'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '../../styles/EmunationTheme'
import SideNavLinks from './sidenav/SideNavLinks'

const iconSize = 48

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuButton: {
            marginLeft: 4,
            marginRight: 4,
            color: '#58c9e7',
        },
        drawerPaper: {
            overflow: 'hidden',
            position: 'relative',
            whiteSpace: 'nowrap',
            height: 'calc(100vh - 49px)',
            marginTop: 49,
            width: 240,
            border: 0,
            backgroundColor: colors.darkSurface,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerPaperClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: iconSize,
        },
    })
)

const SideNav: React.FC = () => {
    const classes = useStyles()
    const [open, setOpen] = useState(true)

    return (
        <Drawer
            variant='permanent'
            classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
        >
            <SideNavLinks isOpen={open} />
            <IconButton
                aria-label='open drawer'
                onClick={() => setOpen((prevOpen) => !prevOpen)}
                style={{
                    color: 'white',
                    height: iconSize,
                    width: iconSize,
                }}
            >
                {open ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
        </Drawer>
    )
}

export default SideNav