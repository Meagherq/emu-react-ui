import React, { ReactElement } from 'react'
import {
    Tooltip,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core'
import RouterLink from '../../routerlink/RouterLink'
import clsx from 'clsx'
import { useLocation } from 'react-router-dom'

interface Props {
    icon: ReactElement
    name: string
    to: string
    isOpen: boolean
    classes: any
    isSelected: boolean
}
export default function SideNavLink(props: Props) {
    const { icon, name, to, isOpen, isSelected, classes } = props

    const location = useLocation();

    return (
        <Tooltip title={!isOpen ? name : ''} placement='right'>
            <ListItem
                button
                component={RouterLink(to)}
                disableGutters
                classes={{
                    root: clsx(classes.row,
                        classes.subRow,
                        to === location.pathname && isSelected && classes.selectedRow),
                }}
            >
                <ListItemIcon
                    classes={{
                        root: classes.iconCell,
                    }}
                >
                    {icon}
                </ListItemIcon>
                <ListItemText
                    primary={name}
                    primaryTypographyProps={{ variant: 'button' }}
                />
            </ListItem>
        </Tooltip>
    )
}
