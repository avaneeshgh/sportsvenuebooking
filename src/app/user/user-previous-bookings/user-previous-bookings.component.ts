import { BookingService } from "./../../../../appservices/booking.service";
import { ErrorComponent } from "./../../errors/error/error.component";
import { MatDialog } from "@angular/material/dialog";
import { DateService } from "appservices/date.service";
import { logging } from "protractor";
import { DialogService } from "appservices/dialog.service";
import { UserService } from "appservices/user.service";
import { AuthService } from "./../../auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-previous-bookings",
  templateUrl: "./user-previous-bookings.component.html",
  styleUrls: ["./user-previous-bookings.component.css"],
})
export class UserPreviousBookingsComponent implements OnInit {
  constructor(
    private authservice: AuthService,
    private userservice: UserService,
    private dialogservice: DialogService,
    private dateservice: DateService,
    private dialog: MatDialog,
    private bookingservice: BookingService,
    private router: Router
  ) {}

  allBookings: any;
  presentUserID: string;
  isLoading: boolean;
  cols: any[];

  ngOnInit(): void {
    this.cols = [
      { field: "createdDate", header: "CREATEDDATE" },
      { field: "selectedDate", header: "BOOKINGDATE" },
      { field: "timeSlot", header: "SLOT" },
      { field: "venueDetails.name", header: "VENUENAME" },
      { field: "venueDetails.sporttype", header: "SPORT" },
      { field: "venueDetails.location", header: "LOCATION" },
      { field: "message", header: "MESSAGE" },
      // { field: 'options', header: 'OPTIONS' },
      { field: "status", header: "STATUS" },
    ];

    this.isLoading = true;
    if (this.authservice.presentUser != undefined) {
      this.presentUserID = this.authservice.presentUser._id;

      this.userservice.getPreviousBookings(this.presentUserID).subscribe(
        (result) => {
          this.isLoading = false;

          this.allBookings = result.userBookings;
        },
        (err) => {
          this.authservice.clearCacheAndRedirect();
          this.router.navigateByUrl("/users/login");
        }
      );
    }

    this.authservice.getuserDetailsSubjectListener().subscribe((res) => {
      this.presentUserID = res.presentUser._id;
      this.userservice.getPreviousBookings(this.presentUserID).subscribe(
        (result) => {
          this.isLoading = false;

          this.allBookings = result.userBookings;
          console.log(this.allBookings);
        },
        (err) => {
          this.authservice.clearCacheAndRedirect();
          this.router.navigateByUrl("/users/login");
        }
      );
    });
  }

  onView(venuedetails: any) {
    this.router.navigateByUrl(`/findvenues/${venuedetails._id}`);
  }

  onCancelBooking(bookingDetails: any) {
    this.dialogservice
      .openConfirmDialog("Do you really want to cancel booking?")
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          const todaydate = this.dateservice.getTodaysDate();

          const selectedDate = new Date(bookingDetails.selectedDate);

          //console.log(todaydate, selectedDate);

          if (todaydate < selectedDate) {
            //delete success
            this.bookingservice.cancelBooking(bookingDetails._id);
          } else {
            this.dialog.open(ErrorComponent, {
              data: { message: "You cannot Cancel Now!" },
              width: "300px",
              disableClose: false,
            });
          }
        }
      });
  }
}
