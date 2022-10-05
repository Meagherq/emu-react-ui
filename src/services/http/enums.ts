export enum DataType {
  Text = 'text',
  Json = 'json',
  Document = 'document',
  Blob = 'blob',
  ArrayBuffer = 'arraybuffer',
}

export enum MediaType {
  Text = 'text/html',
  Json = 'application/json',
}

export enum HeaderName {
  ContentType = 'Content-Type',
  Authorization = 'Authorization',
  Accept = 'Accept'
}

export enum HttpStatusCode {
  Continue = 100,
  SwitchingProtocols = 101,
  Processing = 102,
  EarlyHints = 103,

  /**
   * All `1xx` status codes.
   */
  InformationalResponses = Continue |
    SwitchingProtocols |
    Processing |
    EarlyHints,

  Ok = 200,
  Created = 201,
  Accepted = 202,
  NonAuthoritativeInformation = 203,
  NoContent = 204,
  ResetContent = 205,
  PartialContent = 206,
  MultiStatus = 207,
  AlreadyReported = 208,
  IMUsed = 226,

  /**
   * All `2xx` status codes.
   */
  Success = Ok |
    Created |
    Accepted |
    NonAuthoritativeInformation |
    NoContent |
    ResetContent |
    PartialContent |
    MultiStatus |
    AlreadyReported |
    IMUsed,

  MultipleChoices = 300,
  MovedPermanently = 301,
  Found = 302,
  SeeOther = 303,
  NotModified = 304,
  UseProxy = 305,
  SwitchProxy = 306,
  TemporaryRedirect = 307,
  PermanentRedirect = 308,

  /**
   * All `3xx` status codes.
   */
  Redirection = MultipleChoices |
    MovedPermanently |
    Found |
    SeeOther |
    NotModified |
    UseProxy |
    SwitchProxy |
    TemporaryRedirect |
    PermanentRedirect,

  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  ProxyAuthenticationRequired = 407,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  LengthRequired = 411,
  PreconditionFailed = 412,
  PayloadTooLarge = 413,
  UriTooLong = 414,
  UnsupportedMediaType = 415,
  RangeNotSatisfiable = 416,
  ExpectationFailed = 417,
  ImATeapot = 418,
  MisdirectedRequest = 421,
  UnprocessableEntity = 422,
  Locked = 423,
  FailedDependency = 424,
  UpgradeRequired = 426,
  PreconditionRequired = 428,
  TooManyRequests = 429,
  RequestHeaderFieldsTooLarge = 431,
  UnavailableForLegalReasons = 451,

  /**
   * All `4xx` error codes.
   */
  ClientErrors = BadRequest |
    Unauthorized |
    PaymentRequired |
    Forbidden |
    NotFound |
    MethodNotAllowed |
    NotAcceptable |
    ProxyAuthenticationRequired |
    RequestTimeout |
    Conflict |
    Gone |
    LengthRequired |
    PreconditionFailed |
    PayloadTooLarge |
    UriTooLong |
    UnsupportedMediaType |
    RangeNotSatisfiable |
    ExpectationFailed |
    ImATeapot |
    MisdirectedRequest |
    UnprocessableEntity |
    Locked |
    FailedDependency |
    UpgradeRequired |
    PreconditionRequired |
    TooManyRequests |
    RequestHeaderFieldsTooLarge |
    UnavailableForLegalReasons,

  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  HttpVersionNotSupported = 505,
  VariantAlsoNegotiates = 506,
  InsufficientStorage = 507,
  LoopDetected = 508,
  NotExtended = 510,
  NetworkAuthenticationRequired = 511,

  /**
   * All `5xx` error codes.
   */
  ServerErrors = InternalServerError |
    NotImplemented |
    BadGateway |
    ServiceUnavailable |
    GatewayTimeout |
    HttpVersionNotSupported |
    VariantAlsoNegotiates |
    InsufficientStorage |
    LoopDetected |
    NotExtended |
    NetworkAuthenticationRequired,
}

export enum HttpMethod {
  Get = 'GET',
  Patch = 'PATCH',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
  Options = 'OPTIONS',
  Trace = 'TRACE',
}
