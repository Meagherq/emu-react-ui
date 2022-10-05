import React from 'react'
import { Box, Button, CardActions, CardContent, Container, createStyles, WithStyles, withStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { AuthState } from '../models/auth'
import { useHistory } from 'react-router-dom';

const styles = createStyles({
    userText: {
        marginLeft: 75,
        marginTop: 45,
    },
    root: {
        minWidth: 275,
    },
    rootTwo: {
        minWidth: 150,
        marginTop: '8px',
        width: '50%'
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    fifty: {
        width: '50%',
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

const HomePage: React.FC<Props> = (props: Props) => {
    const { classes, authenticated, username } = props
    const welcomeMessage = authenticated ? `Welcome ${username}` : 'Please log in'
    let history = useHistory();

    return (
        <div>
            <Typography variant='h5' className={classes.userText}>
                {welcomeMessage}
            </Typography>
            <div>
                <Container maxWidth="xl">
                    <Box className={classes.fifty}>
                        <Typography variant="body2" component="p">
                            I wanted this site to be an updated experience for playing retro gameboy games
                            For now it's just for the bois so hit me up with suggestions to make it better
                            </Typography>
                    </Box>
                    <Card className={classes.rootTwo}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                How it works
                            </Typography>
                            <Typography variant="body2" component="p">
                                I wanted this platform to be legal so we do not host or store any roms. To use Emunation you will need to have the game file on your computer or have a link to the file online.
                                Once you add the game it will be saved under your account. You can now play your game online with any browser enabled device. To get started use the Add Game button below
                                or the navigation item on the left.
                                <br />
                                <br />
                                Here's a link or two so you can demo this shit out properly. Copy Paste that shit into the path field after you hit add game.
                                <br />
                                <br />
                                https://www.royalroms.com/storage/rom/59/Pokemon---Yellow-Version-(UE)--C.zip
                                <br />
                                https://www.royalroms.com/storage/rom/6b/Legend-of-Zelda-The---Oracle-of-Seasons-(E)-(M5)--C.zip
                            </Typography>

                        </CardContent>
                        <CardActions>
                            <Button variant="contained" color="primary" onClick={() => history.push("/add")}>
                                Add Game
                            </Button>
                        </CardActions>
                    </Card>
                </Container>
            </div>
        </div>
    )
}

const mapStateToProps = ({ auth }: { auth: AuthState }): ReduxProps => ({
    authenticated: auth.authenticated,
    username: auth.user?.name,
})

export default connect(mapStateToProps)(withStyles(styles)(HomePage))
