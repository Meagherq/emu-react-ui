import { createStyles, WithStyles } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import React, { ReactNode, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchUserGameProfilesByUserIdAction } from '../../actions/userGameProfiles'
import { clearStatusAction } from '../../actions/ui'
import { RootState } from '../../reducers'
import Notifications from '../notifications/Notifications'
import SideNav from './SideNav'
import { PayloadAction } from 'typesafe-actions'
import { AADUser } from '../../models/users'
import { setAuthenticatedUserAction } from '../../actions/auth'
import { getAuth } from '../../auth/auth'
import Header from './Header'
import { UserGameProfiles } from '../../models'

const styles = createStyles({
    content: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        marginTop: 49,
        overflow: 'hidden',
    },
    root: {
        display: 'flex',
        height: '100vh',
    },
})

interface Props extends WithStyles<typeof styles> {
    status: any
    userGameProfiles: UserGameProfiles
    fetchUserGameProfilesByUserIdAction: (
        id: string
    ) => PayloadAction<'FETCH_USERGAMEPROFILES_BY_USER_ID_REQUEST', string>
    clearStatus: () => any
    setAuthenticatedUserAction: (
        user: AADUser
    ) => PayloadAction<'SET_AUTHENTICATED_USER', AADUser>
    children: ReactNode
}

const Dashboard = (props: Props) => {
    const {
        status,
        userGameProfiles,
        fetchUserGameProfilesByUserIdAction,
        clearStatus,
        classes,
        setAuthenticatedUserAction,
        children,
    } = props

    const auth = getAuth()

    useEffect(() => {
        setAuthenticatedUserAction(auth.currentUser())
    }, [auth, setAuthenticatedUserAction])

    useEffect(() => {
        fetchUserGameProfilesByUserIdAction(auth.currentUser().id)
    }, [auth, fetchUserGameProfilesByUserIdAction])

    return (
        <div className={classes.root}>
            <Header/>
            <SideNav />
            <main className={classes.content}>{children}</main>
            <Notifications status={status} clearStatus={clearStatus} />
        </div>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        status: state.status,
        userGameProfiles: state.userGameProfiles
    }
}

export default withStyles(styles, { withTheme: true })(
    connect(mapStateToProps, {
        fetchUserGameProfilesByUserIdAction: (id: string) => fetchUserGameProfilesByUserIdAction.request(id),
        clearStatus: () => clearStatusAction(),
        setAuthenticatedUserAction: (user: AADUser) =>
            setAuthenticatedUserAction(user),
    })(Dashboard)
)