import React from 'react'
import { Container, createStyles, WithStyles, withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { AuthState } from '../models/auth'
import AddGameForm from '../components/gameManagement/AddGameForm'

const styles = createStyles({
    userText: {
        marginLeft: 75,
        marginTop: 45,
    },
})

interface Props extends WithStyles<typeof styles> {
    authenticated: boolean
    username: string | undefined
}

interface ReduxProps {
    authenticated: boolean
    username: string | undefined
}

const AddGamePage: React.FC<Props> = (props: Props) => {
    const { classes } = props

    return (
        <>
            <Typography variant='h5' className={classes.userText}>
                {"Add Game"}
            </Typography>
            <Container maxWidth="xl">
                <AddGameForm />
            </Container>
        </>
    )
}

const mapStateToProps = ({ auth }: { auth: AuthState }): ReduxProps => ({
    authenticated: auth.authenticated,
    username: auth.user?.name,
})

export default connect(mapStateToProps)(withStyles(styles)(AddGamePage))
