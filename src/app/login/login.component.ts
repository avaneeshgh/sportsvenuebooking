import { UserService } from "appservices/user.service";
import { DialogService } from "appservices/dialog.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { NotificationService } from "appservices/notification.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  roles = ["USER", "ADMIN", "OWNER"];
  hide = true;
  loginHasError = false;
  message = "";
  presentUser: any;
  constructor(
    private router: Router,
    private authServiceObj: AuthService,
    private notificationservice: NotificationService,
    private dialogservice: DialogService,
    private userservice: UserService
  ) {}

  ngOnInit() {}

  forgotPassword() {
    this.dialogservice
      .openPasswordDialog()
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          const user = {
            email: res,
          };

          this.userservice.sendEmail(user).subscribe((result) => {
            console.log(res);
            this.notificationservice.success(
              "Password has been Sent to Your Mail ID"
            );
          });
        }
      });
  }

  onSubmit(loginObj) {
    this.authServiceObj.loginUser(loginObj).subscribe((res) => {
      if (res.message === "Invalid credentials!") {
        this.notificationservice.success("Invalid Credentials!");
      } else if (res.message === "Email not exist") {
        this.notificationservice.success(
          `There is no user with this Email:${loginObj?.email}`
        );
      } else if (res.message === "success") {
        this.notificationservice.success("Login SuccessFul!");
        localStorage.setItem("Token", res.signedToken);

        this.authServiceObj.loggedIn = true;
        this.authServiceObj.presentUser = res.userObj;
        this.authServiceObj.token = res.signedToken;

        //NOTIFICATION
        this.authServiceObj.loggedInSubject.next(true);

        this.authServiceObj.userDetailsSubject.next({
          presentUser: res.userObj,
        });

        if (loginObj.role === "ADMIN") {
          this.router.navigateByUrl("admin/viewbookings");
        } else if (loginObj.role === "USER") {
          this.router.navigateByUrl("user/Userprofile/details");
        }
      }
    });
  }
}
