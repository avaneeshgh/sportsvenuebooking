import { NotificationService } from "./../../../../appservices/notification.service";
import { AuthService } from "./../../auth.service";
import { UserService } from "appservices/user.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-user-password-change",
  templateUrl: "./user-password-change.component.html",
  styleUrls: ["./user-password-change.component.css"],
})
export class UserPasswordChangeComponent implements OnInit {
  currentpassword;
  newpassword;
  newconfirmpassword;

  presentUser: any;
  constructor(
    private userservice: UserService,
    private authservice: AuthService,
    private notifservice: NotificationService
  ) {}
  onSubmit() {
    const userObj = {
      email: this.presentUser.email,
      currentpassword: this.currentpassword,
      newpassword: this.newpassword,
      newconfirmpassword: this.newconfirmpassword,
    };

    this.userservice.changePassword(userObj).subscribe((res) => {
      console.log(res);

      this.notifservice.success(
        "Password change successful! Please Relogin to continue"
      );
      this.authservice.clearCacheAndRedirect();
    });
  }
  ngOnInit(): void {
    this.presentUser = this.authservice.presentUser;
    this.authservice.getuserDetailsSubjectListener().subscribe((res) => {
      this.presentUser = res.presentUser;
    });
  }
}
