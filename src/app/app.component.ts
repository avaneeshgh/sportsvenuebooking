import { HttpClient } from "@angular/common/http";
import { NotificationService } from "appservices/notification.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "sportsvenue";
  constructor(
    private router: Router,
    private notificationservice: NotificationService,
    public authservice: AuthService,
    private http: HttpClient
  ) {}

  onClicked() {
    this.router.navigate([`/successfulbooking/5e91f83bcf27374aa4f708cb`]);
  }

  ngOnInit() {
    //token checking

    const localToken = localStorage.getItem("Token");

    if (localToken == null || localToken == undefined) {
      this.authservice.loggedIn = false;
      this.authservice.clearCacheAndRedirect();
      this.router.navigate(["/home"]);

      //inform
      this.authservice.loggedInSubject.next(false);
    } else {
      this.authservice.token = localToken;

      let obj = {};
      this.http
        .post<{ message: string; userDetails: any }>("/onReload", obj)
        .subscribe(
          (res) => {
            console.log(res);

            this.authservice.presentUser = res.userDetails;
            this.authservice.loggedIn = true;

            this.authservice.userDetailsSubject.next({
              presentUser: res.userDetails,
            });

            this.authservice.loggedInSubject.next(true);
          },
          (err) => {
            this.authservice.loggedInSubject.next(false);
            this.notificationservice.success("Please Login to Continue");
            this.authservice.loggedIn = false;
            this.router.navigate(["/users/login"]);
          }
        );
    }
  }
}
