import { BookingService } from "./../../../appservices/booking.service";
import { DialogService } from "./../../../appservices/dialog.service";
import { DateService } from "./../../../appservices/date.service";
import { NotificationService } from "./../../../appservices/notification.service";
import { AuthService } from "./../auth.service";
import { Component, OnInit } from "@angular/core";
import { SearchService } from "../search.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-paticular",
  templateUrl: "./paticular.component.html",
  styleUrls: ["./paticular.component.css"],
})
export class PaticularComponent implements OnInit {
  stripe = Stripe(
    "pk_test_51HFkHCBFTKV0Zzil2mzRgWAkLC6gNU5v6Kkda15arACh2jKxsdaCZ6fXC70k2hy13MEImUmn5xsXBcs298sREknh00gDZR7DpX"
  );
  isLoading: boolean;

  constructor(
    private serviceObj: SearchService,
    private route: ActivatedRoute,
    private authservice: AuthService,
    private notificationservice: NotificationService,
    private router: Router,
    public dateservice: DateService,
    private dialogservice: DialogService,
    private bookingservice: BookingService
  ) {}

  presentVenueID: any;
  presentVenueDetails: any;

  date;
  doBooking(venue) {
    let isLoggedIn = this.authservice.loggedIn;

    if (!isLoggedIn) {
      this.notificationservice.success("Please Login to continue!");
      this.authservice.clearCacheAndRedirect();
      this.router.navigate(["/users/login"]);
    } else {
      this.dateservice.getDateDetails();

      this.dialogservice
        .openUserInfoDialog(this.presentVenueDetails)
        .afterClosed()
        .subscribe((result) => {
          if (result) {
            //previous code
            const presentUserID = this.authservice.presentUser._id;

            console.log(result);

            let dateString =
              result.value.selectedDate.getFullYear() +
              "-" +
              (result.value.selectedDate.getMonth() + 1) +
              "-" +
              result.value.selectedDate.getDate();

            //console.log(dateString);.

            let createdDate =
              new Date().getFullYear() +
              "-" +
              (new Date().getMonth() + 1) +
              "-" +
              new Date().getDate();

            const bookObj = {
              userID: presentUserID,
              venueID: venue._id,
              selectedDate: dateString,
              createdDate: createdDate,
              timeSlot: result.value.timeSlot,
              message: result.value.message,
              status: "active",
            };

            this.bookingservice.createSession(bookObj).subscribe((res) => {
              console.log(res);
              this.stripe.redirectToCheckout({ sessionId: res.session.id });
            });
          }
        });
    }
  }

  isLoggedIn: boolean;
  ngOnInit(): void {
    this.isLoggedIn = this.authservice.loggedIn;
    this.authservice.getLoggedInListener().subscribe((res) => {
      this.isLoggedIn = res;
    });

    this.isLoading = true;
    this.route.paramMap.subscribe((parammap) => {
      this.presentVenueID = parammap.get("venueID");

      this.serviceObj.getVenueDetails(this.presentVenueID).subscribe((res) => {
        this.isLoading = false;
        this.presentVenueDetails = res.venueData;
      });
    });
  }
}
