import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core'
import { homePage, pages } from '../../../modules'
import { useLocation } from 'react-router-dom'
import { colors } from '../../../styles/EmunationTheme'
import HomeLink from './HomeLink'
import SideNavLink from './SideNavLink'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        row: {
            color: 'white',
            height: 48,
            '&:hover': {
                backgroundColor: colors.hoverBackground,
            },
        },
        selectedRow: {
            backgroundColor: colors.secondaryBlue,
        },
        subRow: {
            backgroundColor: colors.darkGrey3,
        },
        iconCell: {
            color: 'white',
            minWidth: 48,
            justifyContent: 'center',
        },
        divider: {
            height: 2,
            backgroundColor: colors.darkSurface,
        },
    })
)

export default function SideNavLinks(props: any) {
    const { isOpen } = props
    const classes = useStyles()
    const location = useLocation();
    return (
        <div id='SideNavLinks' className={classes.root}>
            {/* Home Link Row */}
            <HomeLink
                to='/'
                name={homePage.name}
                icon={homePage.icon}
                isOpen={isOpen}
                isSelected={location.pathname === '/'}
                classes={classes}
            />
            {/* Pages */}
            {pages.map((page) => {
                        return (
                            <div key={page.key}>
                                <SideNavLink
                                    to={`/${page.link}`}
                                    name={page.name}
                                    icon={page.icon}
                                    isOpen={isOpen}
                                    classes={classes}
                                    isSelected={location.pathname === `/${page.link}`}
                                />
                            </div>
                        )
                    })}
        </div>
    )
}
