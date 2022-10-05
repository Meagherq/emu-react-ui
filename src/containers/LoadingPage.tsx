import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

const LoadingPage: React.FC = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <CircularProgress />
        </div>
    )
}

export default LoadingPage
