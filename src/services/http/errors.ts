import { HttpStatusCode, HttpResponse, HttpErrorResponse } from '.'
import Auth, { getAuth } from '../../auth/auth'

export const HttpErrorMessages = {
  UnavailableResourceError:
    'A request was made to a resource that is not available',
  UnauthorizedError: 'An anonymous request was made to an authorized resource',
  ForbiddenError: 'A request was made to a resource that is forbidden',
}

export function getDefaultStatusMessage(
  status: HttpStatusCode | number
): string {
  let message = HttpErrorMessages.UnavailableResourceError
  switch (status) {
    case 401:
      message = HttpErrorMessages.UnauthorizedError
      break
    case 403:
      message = HttpErrorMessages.ForbiddenError
      break
  }

  return message
}

export class HttpError extends Error {
  showError = false
  constructor(public response: HttpResponse<any>, message: string) {
    super(message)
  }
}

export class UnauthorizedRequestError extends HttpError {
  constructor(public response: HttpResponse<any>, message?: string) {
    super(response, message || getDefaultStatusMessage(response.status))
  }
}

export class HttpErrorHandler {
  auth: Auth
  constructor() {
    this.auth = getAuth()
  }

  handle(errorResponse: HttpErrorResponse): void {
    switch (errorResponse.status) {
      case HttpStatusCode.Unauthorized:
        this.handleUnauthorized(errorResponse)
        break
      case HttpStatusCode.Forbidden:
        this.handleForbidden(errorResponse)
        break
      default:
        this.handleUnknownError(errorResponse)
    }
  }

  private handleUnauthorized(errorResponse: HttpErrorResponse): void {
    if (this.auth.isLoggedIn()) {
        debugger;
    //   this.auth.logout()
    }
    console.error(
      `Http request made by anonymous user to authenticated endpoint ${errorResponse.url}`
    )
  }

  private handleForbidden(errorResponse: HttpErrorResponse): void {
    const user = this.auth.currentUser()
    console.error(
      `Http request made by ${user.name} to authenticated endpoint ${errorResponse.url}`
    )
  }

  private handleUnknownError(errorResponse: HttpErrorResponse): void {
    console.error(
      `Http request to endpoint ${errorResponse.url} resulted in an error`
    )
  }
}
