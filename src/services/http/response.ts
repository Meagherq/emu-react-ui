import {
  HttpHeaders,
  HttpEventType,
  HttpStatusCode,
  DataType,
  getDataTypeFromHeaders,
  valueIfDefined,
} from '.'

export interface HttpResponseInit {
  body?: any
  headers?: HttpHeaders
  status?: number
  statusText?: string
  url?: string
}

export interface HttpErrorResponseInit extends HttpResponseInit {
  error?: any
}

export abstract class HttpResponseBase {
  readonly status: number
  readonly statusText: string
  readonly url: string | null
  readonly headers: HttpHeaders
  readonly ok: boolean
  readonly type: HttpEventType.Response | HttpEventType.ResponseHeader

  constructor(
    init: HttpResponseInit,
    type?: HttpEventType.Response | HttpEventType.ResponseHeader,
    defaultStatus = 0,
    defaultStatusText = 'OK'
  ) {
    this.type = type || HttpEventType.Response
    this.status = init.status || defaultStatus
    this.statusText = init.statusText || defaultStatusText
    this.url = init.url || null
    this.headers = init.headers || new HttpHeaders()
    this.ok = this.status >= 200 && this.status < 300;
  }

  get responseType(): DataType {
    return getDataTypeFromHeaders(this.headers)
  }
}

export class HttpErrorResponse extends HttpResponseBase implements Error {
  readonly name = 'HttpErrorResponse';
  readonly message: string
  readonly error: any | null

  constructor(init: HttpErrorResponseInit, customMessage?: string) {
    super(init, HttpEventType.Response, 0, 'Unknown Error')
    this.message = customMessage || this.getErrorMessageByStatus()
    this.error = init.error || null;
  }

  private getErrorMessageByStatus(): string {
    if (this.status >= 200 && this.status < 300) {
      return `Http failure during parsing for ${this.url || '(unknown url)'}`
    } else {
      return `Http failure response for ${this.url || '(unknown url)'}: ${this.status} ${this.statusText}`
    }
  }
}

export class HttpHeaderResponse extends HttpResponseBase {
  /**
   * Create a new `HttpHeaderResponse` with the given parameters.
   */
  constructor(init: HttpResponseInit = {}) {
    super(init, HttpEventType.ResponseHeader)
  }

  readonly type: HttpEventType.ResponseHeader = HttpEventType.ResponseHeader;

  /**
   * Copy this `HttpHeaderResponse`, overriding its contents with the
   * given parameter hash.
   */
  clone(update: HttpResponseInit = {}): HttpHeaderResponse {
    // Perform a straightforward initialization of the new HttpHeaderResponse,
    // overriding the current parameters with new ones if given.
    return new HttpHeaderResponse({
      headers: update.headers || this.headers,
      status: update.status !== undefined ? update.status : this.status,
      statusText: update.statusText || this.statusText,
      url: update.url || this.url || undefined,
    })
  }
}

export class HttpResponse<T> extends HttpResponseBase {
  readonly body: T | null
  readonly type: HttpEventType.Response = HttpEventType.Response;

  get hasBody(): boolean {
    return !!this.body
  }

  constructor(
    init: HttpResponseInit,
    defaultStatus: number = HttpStatusCode.Ok,
    defaultStatusText = 'OK'
  ) {
    super(init, HttpEventType.Response, defaultStatus, defaultStatusText)
    this.body = init.body || null
  }
  clone(): HttpResponse<T>
  clone(update: HttpResponseInit = {}): HttpResponse<T> {
    return new HttpResponse<any>({
      body: valueIfDefined(update.body, this.body),
      headers: update.headers || this.headers,
      status: valueIfDefined(update.status, this.status),
      statusText: update.statusText || this.statusText,
      url: update.url || this.url || undefined,
    })
  }
}
