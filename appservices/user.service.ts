import { AuthService } from "./../src/app/auth.service";
import { NotificationService } from "./notification.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private notificationservice: NotificationService,
    private authservice: AuthService
  ) {}

  getUser(userID: string) {
    const url = `/users/${userID}`;

    return this.http.get<{ message: string; userData: any }>(url);
  }

  updateUserDetails(userObj: any) {
    this.http
      .put<{ message: string }>(`/users/editdetails`, userObj)
      .subscribe((res) => {
        console.log(res);

        this.authservice.presentUser = userObj;
        this.notificationservice.success("Edited Sucecssfully!");
      });
  }

  getPreviousBookings(userID: string) {
    console.log("shiva loves keerthi");

    const url = `/users/getAllBookings/${userID}`;

    return this.http.get<{ message: string; userBookings: any }>(url);
  }

  sendEmail(user) {
    const url = "/users/sendEmail";
    return this.http.post<any>(url, user);
  }

  changePassword(passobj: any) {
    const url = "/users/changepassword";

    return this.http.put<{ message: string }>(url, passobj);
  }
}
