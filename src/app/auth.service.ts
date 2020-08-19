import { DialogService } from "appservices/dialog.service";
import { NotificationService } from "appservices/notification.service";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // tslint:disable-next-line: variable-name
  private _registerUrl = "/users/signup";
  // tslint:disable-next-line: variable-name
  private _loginUrl = "/users/login";

  loggedIn = false;

  presentUser: any;
  token: string;

  //listener for authentication
  public userDetailsSubject = new Subject<{ presentUser: any }>();

  public loggedInSubject = new Subject<boolean>();

  getLoggedInListener() {
    return this.loggedInSubject.asObservable();
  }

  getuserDetailsSubjectListener() {
    return this.userDetailsSubject.asObservable();
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationservice: NotificationService,
    private dialogservice: DialogService
  ) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.loggedIn;
  }

  registerUser(registerObj) {
    return this.http.post<any>(this._registerUrl, registerObj);
  }

  loginUser(loginObj) {
    return this.http.post<any>(this._loginUrl, loginObj);
  }

  logOut() {
    this.dialogservice
      .openConfirmDialog("Do You Want to Logout?")
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.clearCacheAndRedirect();
          this.notificationservice.success(
            "Thank You for visitinng our website!"
          );
        }
      });
  }

  clearCacheAndRedirect() {
    localStorage.removeItem("Token");
    this.loggedIn = false;
    this.token = null;

    this.loggedInSubject.next(false);

    this.router.navigateByUrl("/home");
  }
}
