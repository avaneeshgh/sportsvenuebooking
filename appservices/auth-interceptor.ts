import { AuthService } from "./../src/app/auth.service";

//just like middleware (service) -> adding our got token to request header for future requests

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable() //just like service but differently provided
export class AuthInterceptor implements HttpInterceptor {
  constructor(private ownerService: AuthService) {} //to get token
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const ownerToken = this.ownerService.getToken();

    const authReq = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + ownerToken),
    });

    return next.handle(authReq);
  }
}
