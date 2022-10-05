import { applyMiddleware, createStore } from 'redux'
import rootEpic from '../epics'
import rootReducer from '../reducers'
import setupMiddleware from './setupMiddleware'

const configureStore = (preloadedState?: {}) => {
    const middlewares = setupMiddleware()

    const store =
        process.env.NODE_ENV === 'production'
            ? createStore(
                rootReducer,
                preloadedState,
                applyMiddleware(middlewares.epic)
            )
            : createStore(rootReducer, preloadedState, middlewares.enhancer)
    middlewares.epic.run(rootEpic)
    return store
}

const Store = configureStore()

export default Store
