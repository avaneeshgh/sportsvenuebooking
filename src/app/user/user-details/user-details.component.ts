import { Router } from "@angular/router";
import { AuthService } from "./../../auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.css"],
})
export class UserDetailsComponent implements OnInit {
  constructor(private authservice: AuthService, private router: Router) {}

  presentUserDetails: any;

  passwordString: string = "";

  ngOnInit(): void {
    this.presentUserDetails = this.authservice.presentUser;
    let len: number = this.presentUserDetails.confirmpassword.length;

    while (len--) {
      this.passwordString = this.passwordString + "$";
    }
    this.authservice.getuserDetailsSubjectListener().subscribe((res) => {
      console.log("shiva loves jahnavi", res);

      this.presentUserDetails = res.presentUser;
      let len: number = this.presentUserDetails.confirmpassword.length;

      while (len--) {
        this.passwordString = this.passwordString + "$";
      }
    });
  }

  navigateToPasswordChange() {
    this.router.navigateByUrl("users/password-change");
  }
}
