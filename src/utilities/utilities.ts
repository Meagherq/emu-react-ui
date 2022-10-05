interface State<U> {
    [key: string]: U
}

// Reduce array payload to dictionary of key `key`
export const mergeRecords = <T extends State<U>, U, K extends keyof U>(
    state: T,
    payload: U[],
    key: K
): T => {
    return payload
        ? payload.reduce(
            (acc: T, record: U) => mergeRecord(acc, record, key),
            state
        )
        : state
}

// Immutable merge. Only updates slice
export const mergeRecord = <T extends State<U>, U, K extends keyof U>(
    state: T,
    record: U,
    key: K
): T => {
    return record[key]
        ? {
            ...state,
            [String(record[key])]: {
                ...state[String(record[key])],
                ...record,
            },
        }
        : state
}

// Immutable delete
export const deleteRecord = <T extends State<U>, U>(
    state: T,
    id: string | number
): T => {
    if (id in state) {
        const nextState = { ...state }
        delete nextState[id]
        return nextState
    }
    return state
}
