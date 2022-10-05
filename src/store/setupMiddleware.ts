import { applyMiddleware, compose, Middleware } from 'redux'
import { createLogger } from 'redux-logger'
import { createEpicMiddleware, EpicMiddleware } from 'redux-observable'
import RootAction from '../actions'
import { RootState } from '../reducers'
import { UserGameProfilesApi } from '../middleware/userGameProfile'

interface MiddlewarePeices {
    epic: EpicMiddleware<RootAction, RootAction, RootState>
    logger: Middleware
    enhancer: any
}

function setupEpicMiddleware(): EpicMiddleware<
    RootAction,
    RootAction,
    RootState
> {
    return createEpicMiddleware<RootAction, RootAction, RootState>({
        dependencies: {
            userGameProfilesApi: new UserGameProfilesApi(),
        },
    })
}

function setupEnhancer(middlewares: any[]) {
    const extensionCompose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    const enhancer = extensionCompose
        ? extensionCompose(applyMiddleware(...middlewares))
        : compose(applyMiddleware(...middlewares))
    return enhancer
}

const setupMiddleware = (): MiddlewarePeices => {
    const epicMiddleware = setupEpicMiddleware()
    const logger = createLogger({
        collapsed: true,
    })

    const middlewares = [epicMiddleware, logger]

    const enhancer = setupEnhancer(middlewares)

    return {
        epic: epicMiddleware,
        logger,
        enhancer,
    }
}

export default setupMiddleware