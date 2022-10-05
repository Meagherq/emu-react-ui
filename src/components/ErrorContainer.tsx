import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import { Error } from '@material-ui/icons'

interface Props {
    errorMessage?: any
    fullContainer?: boolean
}

interface State {
    error: any
    errorInfo: any
    hasError: boolean
}

export default class ErrorContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            error: null,
            errorInfo: null,
            hasError: false,
        }
    }

    public componentDidCatch(error: any, errorInfo: any) {
        this.setState({
            error,
            errorInfo,
            hasError: true,
        })
    }

    public render() {
        const { hasError, error, errorInfo } = this.state
        const { fullContainer, errorMessage } = this.props

        if (hasError) {
            if (!fullContainer) {
                return (
                    <div style={{ flexGrow: 1, padding: 24, overflowY: 'auto' }}>
                        {errorMessage ? (
                            errorMessage
                        ) : (
                                <>
                                    <h2>
                                        <Error /> Something went wrong.
                </h2>
                                    <details style={{ whiteSpace: 'pre-wrap' }}>
                                        {error && error.toString()}
                                        <br />
                                        {errorInfo.componentStack}
                                    </details>
                                </>
                            )}
                    </div>
                )
            }
            return (
                <div style={{ flexGrow: 1, padding: 24, overflowY: 'auto' }}>
                    <Grid
                        container
                        item
                        direction='column'
                        justify='center'
                        alignItems='stretch'
                        style={{ height: '100%' }}
                    >
                        <Paper style={{ height: '100%', padding: 24, overflowY: 'auto' }}>
                            {errorMessage ? (
                                errorMessage
                            ) : (
                                    <>
                                        <h2>
                                            <Error /> Something went wrong.
                                        </h2>
                                        <details style={{ whiteSpace: 'pre-wrap' }}>
                                            {error && error.toString()}
                                            <br />
                                            {errorInfo.componentStack}
                                        </details>
                                    </>
                                )}
                        </Paper>
                    </Grid>
                </div>
            )
        }

        return this.props.children
    }
}
