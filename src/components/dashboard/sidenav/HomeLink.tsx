import React, { ReactElement } from 'react'
import {
    Tooltip,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core'
import RouterLink from '../../routerlink/RouterLink'
import clsx from 'clsx'

interface Props {
    icon: ReactElement
    name: string
    to: string
    isOpen: boolean
    isSelected: boolean
    classes: any
}
export default function HomeLink(props: Props) {
    const { icon, name, to, isOpen, isSelected, classes } = props

    return (
        <Tooltip title={!isOpen ? name : ''} placement='right'>
            <ListItem
                button
                component={RouterLink(to)}
                disableGutters
                classes={{
                    root: clsx(
                        classes.row,
                        to === '/' && isSelected && classes.selectedRow
                    ),
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
