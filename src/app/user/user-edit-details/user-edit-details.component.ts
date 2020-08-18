import { UserService } from "appservices/user.service";
import { AuthService } from "./../../auth.service";
import { NgForm } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-user-edit-details",
  templateUrl: "./user-edit-details.component.html",
  styleUrls: ["./user-edit-details.component.css"],
})
export class UserEditDetailsComponent implements OnInit {
  constructor(
    private authservice: AuthService,
    private userservice: UserService
  ) {}

  presentUserDetails: any;

  ngOnInit(): void {
    this.presentUserDetails = this.authservice.presentUser;

    console.log("auth - ", this.presentUserDetails);

    this.authservice.getuserDetailsSubjectListener().subscribe((res) => {
      console.log("user edit details fielder");

      this.presentUserDetails = res.presentUser;
    });
  }

  onSubmit(userform) {
    this.userservice.updateUserDetails(this.presentUserDetails);
  }
}
