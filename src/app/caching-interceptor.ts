import { Injectable } from '@angular/core'
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators'
import { RequestCache } from './request-cache.service'

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(private cache: RequestCache) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const cachedResponse = this.cache.get(req)
    return cachedResponse ? of(cachedResponse) : this.sendRequest(req, next)
  }

  /**
   * Get server response observable by sending request to `next()`.
   * Will add the response to the cache on the way out.
   */
  sendRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.put(req, event)
        }
      })
    )
  }
}
