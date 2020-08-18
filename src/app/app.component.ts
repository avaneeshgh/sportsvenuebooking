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

  ngOnInit() {
    //token checking

    const localToken = localStorage.getItem("Token");

    if (!localToken) {
      this.authservice.loggedIn = false;
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

            //notification to the app;
            console.log("notification sent from app.comp.ts");

            this.authservice.userDetailsSubject.next({
              presentUser: res.userDetails,
            });

            this.authservice.loggedInSubject.next(true);
          },
          (err) => {
            this.notificationservice.success("Please Login to Continue");
            this.authservice.loggedIn = false;
            this.router.navigate(["/users/login"]);

            //inform
            this.authservice.loggedInSubject.next(false);
          }
        );
    }
  }
}

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWM2MTcxNGZjOTNjNzBiYzBmODk0ZGUiLCJpYXQiOjE1OTc0MTQ0NTJ9.RvCDbcY9Kglg6eNOs5USnNzy-BNf5ROOXI1b8iGR7Cw

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWM2MTcxNGZjOTNjNzBiYzBmODk0ZGUiLCJpYXQiOjE1OTc0MTQ1MTd9.9e0JDwdupwxH9jTmnf8H5Umt1HEG5KZTs_ME-AZvqhs
