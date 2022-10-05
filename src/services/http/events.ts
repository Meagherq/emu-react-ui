import { HttpResponse, HttpHeaderResponse, HttpErrorResponse } from '.'

export enum HttpEventType {
  /**
   * The request was sent
   */
  RequestSent,
  /**
   * The request was canceled before it was sent
   */
  RequestCanceled,
  /**
   * The response status code and headers were received.
   */
  ResponseHeader,
   /**
   * The full response including the body was received.
   */
  Response,
  /**
   * A custom event from an interceptor or a backend.
   */
  User,
}

export type HttpEvent<T> =
  | HttpSentEvent
  | HttpCanceledEvent
  | HttpResponse<T>
  | HttpHeaderResponse
  | HttpErrorResponse
  | HttpUserEvent<T>


export interface HttpCanceledEvent {
  type: HttpEventType.RequestCanceled
  reason?: string
}

export interface HttpSentEvent { 
  type: HttpEventType.RequestSent
}

export interface HttpUserEvent<T> {
  type: HttpEventType.User
}