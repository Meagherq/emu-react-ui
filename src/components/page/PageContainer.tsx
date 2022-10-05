import React, { FunctionComponent, ReactNode } from 'react'
import { Grid, Paper } from '@material-ui/core'

interface Props {
    children: ReactNode
    paperPadding?: number
}

const PageContainer: FunctionComponent<Props> = (props: Props) => {
    const { children, paperPadding = 24 } = props
    return (
        <div style={{ flexGrow: 1, overflowY: 'auto' }}>
            <Grid
                container
                item
                direction='column'
                justify='center'
                alignItems='stretch'
                style={{ height: '100%' }}
            >
                <Paper
                    style={{ height: '100%', padding: paperPadding, overflowY: 'auto' }}
                >
                    {children}
                </Paper>
            </Grid>
        </div>
    )
}

export default PageContainer
