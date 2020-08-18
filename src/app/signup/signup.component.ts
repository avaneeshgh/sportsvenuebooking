import { NotificationService } from "./../../../appservices/notification.service";
import { Component, OnInit } from "@angular/core";
import { User } from "./User";
import { AuthService } from "../auth.service";
import { NgForm } from "@angular/forms";
import { Route } from "@angular/compiler/src/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  emailState = false;
  verifyPassword = false;
  loginHasError = false;
  signUpSuccess = false;
  message: string;
  // tslint:disable-next-line: variable-name
  constructor(
    private _authServiceObj: AuthService,
    private router: Router,
    private notificationservice: NotificationService
  ) {}

  ngOnInit() {}

  validateEmail(checkEmail) {
    this.emailState =
      checkEmail.endsWith("@gmail.com") ||
      checkEmail.endsWith("@yahoo.com") ||
      checkEmail.endsWith("@outlook.com");
    // console.log(this.emailState);
  }
  validatePassword(password, confirmPassword) {
    console.log("blur called");
    if (password === confirmPassword && password !== "") {
      this.verifyPassword = true;
    } else {
      this.verifyPassword = false;
    }
  }
  onSubmit(userObj: NgForm) {
    this.loginHasError = false;
    this.signUpSuccess = false;

    console.log(userObj);
    this._authServiceObj.registerUser(userObj).subscribe(
      (res) => {
        console.log("Observable return on succuesful registration", res);
        if (res.message === "Successfully Registered") {
          this.message =
            "Thank You For creating an account! , please login into the account";
          this.notificationservice.success("Signup Successful!");
          this.signUpSuccess = true;

          this.router.navigate(["/users/login"]);
        } else if (res.message === "Email already exists") {
          this.loginHasError = true;
          this.message = "Email already exists";
        } else {
          this.loginHasError = true;
          this.message =
            "There is some issue at the bakcend! Please try again later!";
        }
      },
      (err) => {
        console.log("some Error occured during registration", err);
      }
    );
  }
}
