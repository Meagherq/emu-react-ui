import React, { FunctionComponent, ReactNode } from 'react'
import { Grid, Typography } from '@material-ui/core'

interface Props {
    pageTitle: string
    actionItems?: ReactNode[]
}

const PageHeader: FunctionComponent<Props> = (props: Props) => {
    const { pageTitle, actionItems } = props
    return (
        <Grid
            container
            direction='row'
            justify='space-between'
            alignItems='flex-start'
        >
            <Grid item>
                <Typography variant='h5'>{pageTitle}</Typography>
            </Grid>
            <Grid item>
                <Grid
                    container
                    direction='row'
                    justify='center'
                    alignItems='flex-end'
                    spacing={3}
                >
                    {actionItems &&
                        actionItems.map((actionItem, i) => (
                            <Grid item key={`PageHeaderActions-${i}`}>
                                {actionItem}
                            </Grid>
                        ))}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default PageHeader
