import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { RootState } from '../reducers'
import PageHeader from '../components/page/PageHeader'
import { UserGameProfile, UserGameProfiles } from '../models'
import { Box, Button, Card, Container, createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import GameboyClient from '../wasmboy/gameboyClient'
import { deleteUserGameProfileAction } from '../actions/userGameProfiles'

interface Props {
    userGameProfiles: UserGameProfiles
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            maxWidth: 752,
        },
        left: {
            marginLeft: '8px',
        },
        vert: {
            marginTop: '8px',
            marginBottom: '8px',
        },
        gameCard: {
            height: '100%'
        },
        loadButton: {
            width: '50%',
            height: '25%',
            margin: '0px 4px 0px 8px'
        },
        deleteButton: {
            width: '50%',
            height: '25%',
            color: '#FFFFFF',
            backgroundColor: '#E82B4D',
            margin: '0px 8px 0px 4px',
            whiteSpace: 'nowrap',
        },
        pos: {
            marginBottom: 12,
            marginLeft: '16px'
        },
        header: {
            marginLeft: '16px',
            marginTop: '12px',
            marginBottom: '16px',
        },
        gameTitle: {
            marginLeft: '12px',
            marginTop: '12px',
            marginBottom: '8px',
        },
        flexbox: {
            display: 'flexbox',
            flexDirection: 'row',
        },
        actionBox: {
            marginBottom: '8px',
        },
        canvas: {
            height: '35%',
            width: '35%',
            marginLeft: '8px',
        },
    }),
);

const gba = new GameboyClient()

const GameManagementPage = (props: Props) => {
    const { userGameProfiles } = props
    const [profiles, setProfiles] = useState<UserGameProfiles>(userGameProfiles)
    const [isLoaded, setIsLoaded] = useState(false)
    const classes = useStyles()
    const dispatch = useDispatch()

    useEffect(() => {
        setProfiles(userGameProfiles)
    }, [userGameProfiles])

    useEffect(() => {
        gba.configure()
    }, [])

    return (
        <>
            <div className={classes.header}>
                <PageHeader pageTitle='My Games' />
            </div>
            <Container maxWidth="xl">
                <div>
                    <Grid container spacing={2}>
                        {Object.values(profiles).map((x: UserGameProfile) => {
                            return <Grid item xs={3} md={3} key={x.userGameProfileId}><Card className={classes.gameCard}>
                                <Typography className={classes.gameTitle} component="h4">
                                    {x.game.name}
                                </Typography>
                                <Box className={classes.actionBox} display='flex' flexDirection='row'>
                                    <Button className={classes.loadButton} variant="contained" color="primary" onClick={() => {
                                        var url = 'https://cors.bridged.cc/' + x.game.path
                                        gba.loadROMFromUrl(url).then((loaded) => {
                                            setIsLoaded(loaded)
                                        })
                                    }}>
                                        Load ROM
                                    </Button>
                                    <Button className={classes.deleteButton} variant="contained" onClick={() => dispatch(deleteUserGameProfileAction.request(x.userGameProfileId))}>
                                        Delete Game
                                    </Button>
                                </Box>
                            </Card></Grid>
                        })}
                    </Grid>
                    {isLoaded && <div className={classes.vert}>
                        <Button className={classes.left} variant="contained" color="primary" onClick={() => gba.play()}>
                            Play
                        </Button>
                        <Button className={classes.left} variant="contained" color="primary" onClick={() => gba.pause()}>
                            Pause
                        </Button>
                    </div>}
                    <div>
                        <canvas className={classes.canvas} id="myCanvas" width='160px' height='144px'></canvas>
                    </div>
                </div>
            </Container>

        </>
    )
}

const mapStateToProps = (state: RootState) => ({
    userGameProfiles: state.userGameProfiles,
})

export default connect(mapStateToProps)(GameManagementPage)
