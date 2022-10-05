export * from './enums'
export * from './errors'
export * from './request'
export * from './params'
export * from './headers'
export * from './response'
export * from './events'
export * from './helpers'
export * from './interceptors'
export * from './client'
export * from './handlers'
export * from './backend'
export * from './fetch'

export type HttpPayload =
  | {}
  | []
  | string
  | Record<string, any>
  | null
  | undefined

export type HttpBody = HttpPayload
