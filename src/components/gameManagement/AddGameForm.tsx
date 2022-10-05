import React from 'react'
import { useDispatch } from 'react-redux'
import { UserGameProfileCreateModel } from '../../models'
import { Button, createStyles, Grid, makeStyles, TextField } from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'
import { putUserGameProfileAction } from '../../actions/userGameProfiles'
import { getAuth } from '../../auth/auth'


const useStyles = makeStyles(() =>
    createStyles({
        textField: {
            display: 'block',
        },
    })
)

const AddGameForm = () => {

    const auth = getAuth()

    const {
        control,
        // errors,
        // getValues,
        // setError,
        // setValue,
        handleSubmit,
    } = useForm<UserGameProfileCreateModel>({
        defaultValues: {
            userId: auth.currentUser().id,
            isFavorite: false,
            isRecent: false,
            game: {
                name: '',
                path: ''
            }
        },
    })

    const classes = useStyles()

    const dispatch = useDispatch()

    const onSubmit = (event: UserGameProfileCreateModel) => {
        const updatedProfile: UserGameProfileCreateModel = {
            userId: auth.currentUser().id,
            isFavorite: false,
            isRecent: false,
            game: {
                name: event.game.name,
                path: event.game.path
            }
        }
        dispatch(putUserGameProfileAction.request(updatedProfile))
    }

    return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    as={TextField}
                    name='game.name'
                    control={control}
                    defaultValue={''}
                    label='Game Name'
                    variant='outlined'
                    margin='dense'
                    fullWidth
                    required
                    error={false}
                    helperText={''}
                    className={classes.textField}
                />
                <Controller
                    as={TextField}
                    name='game.path'
                    control={control}
                    label='Game Path'
                    defaultValue={''}
                    variant='outlined'
                    margin='dense'
                    fullWidth
                    required
                    error={false}
                    helperText={''}
                    className={classes.textField}
                />
                <Grid container justify='space-between'>
                    <Grid item>
                        <Button variant="contained" color="primary" type="submit">Add Game</Button>
                    </Grid>
                </Grid>
            </form>
    )
}

export default AddGameForm
