import {
    FetchClient,
    HttpClient,
    HttpResponse,
    HttpRequest,
    HttpMethod,
    HttpRequestInit,
    HttpBody,
} from '../services/http'

export interface MiddlewareServiceInit {
    apiRoot?: string
    entityType?: string
}

export abstract class BaseService {
    protected entityType: string
    protected apiRoot: string
    protected readonly httpClient: HttpClient

    constructor(init: MiddlewareServiceInit = {}, httpClient?: HttpClient) {
        this.apiRoot =
            init.apiRoot || process.env.REACT_APP_API_ROOT || 'NO_API_ROOT_SPECIFIED'
        this.entityType = init.entityType || ''
        this.httpClient = httpClient || new FetchClient()
    }

    protected resolveUrl(route: string): string {
        const root = this.apiRoot.replace(/\/$/, '')
        const routePath = route.replace(/^\//, '')

        return `${root}/${routePath}`
    }

    public async send<T>(request: HttpRequest<any>): Promise<HttpResponse<any>> {
        return await this.httpClient.send<T>(request)
    }

    public async request<T>(
        method: string | HttpMethod,
        route: string,
        bodyOrOptions: HttpRequestInit | HttpBody,
        options?: HttpRequestInit
    ): Promise<HttpResponse<T>> {
        const url = this.resolveUrl(route)
        return await this.httpClient.request<T>(method, url, bodyOrOptions, options)
    }

    public async get<T>(
        route: string,
        options: HttpRequestInit = {}
    ): Promise<T> {
        const request$ = this.request<T>(HttpMethod.Get, route, options)

        return await request$.then((response: HttpResponse<T>) => {
            return this.toBody(response)
        })
    }

    public async post<T>(
        route: string,
        data: any,
        options: HttpRequestInit = {}
    ): Promise<T> {
        return await this.request<T>(
            HttpMethod.Post,
            route,
            data,
            options
        ).then((response: HttpResponse<T>) => this.toBody(response))
    }

    public async put<T>(
        route: string,
        data: any,
        options: HttpRequestInit = {}
    ): Promise<T> {
        return await this.request<T>(
            HttpMethod.Put,
            route,
            data,
            options
        ).then((response: HttpResponse<T>) => this.toBody(response))
    }

    public async patch<T>(
        route: string,
        data: any,
        options: HttpRequestInit = {}
    ): Promise<T> {
        return await this.request<T>(
            HttpMethod.Patch,
            route,
            data,
            options
        ).then((response: HttpResponse<T>) => this.toBody(response))
    }

    public async delete<T>(
        route: string,
        options: HttpRequestInit = {}
    ): Promise<T> {
        return await this.request<T>(
            HttpMethod.Delete,
            route,
            options
        ).then((response: HttpResponse<T>) => this.toBody(response))
    }

    public async deleteNoResult(
        route: string,
        options: HttpRequestInit = {}
    ): Promise<boolean> {
        return await this.request<never>(HttpMethod.Delete, route, options).then(
            (response: HttpResponse<never>) => response.ok
        )
    }

    public async create<T>(
        route: string,
        data: any,
        options: HttpRequestInit = {}
    ): Promise<T> {
        return await this.post<T>(route, data, options)
    }

    public async update<T>(
        route: string,
        data: any,
        options: HttpRequestInit = {}
    ): Promise<T> {
        return await this.put<T>(route, data, options)
    }

    public async partialUpdate<T>(
        route: string,
        data: any,
        options: HttpRequestInit = {}
    ): Promise<T> {
        return await this.patch<T>(route, data, options)
    }

    public toBody<T>(response: HttpResponse<T>): Promise<T> {
        if (response.hasBody) {
            return Promise.resolve(response.body as T)
        } else {
            return Promise.reject('The request either failed or did not contain data')
        }
    }
}