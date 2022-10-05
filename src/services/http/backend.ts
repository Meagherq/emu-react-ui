import { Observable} from 'rxjs'
import { HttpHandler, HttpRequest, HttpEvent } from '.'

export abstract class HttpBackend implements HttpHandler {
  abstract handle(request: HttpRequest<any>): Observable<HttpEvent<any>>
}
