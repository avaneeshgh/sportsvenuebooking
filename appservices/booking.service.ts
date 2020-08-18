import { Router } from "@angular/router";
import { NotificationService } from "./notification.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class BookingService {
  constructor(
    private http: HttpClient,
    private notificationservice: NotificationService,
    private router: Router
  ) {}

  bookVenue(bookObj: any) {
    this.http
      .post<{ bookingID: string; message: string }>("/users/bookslot", bookObj)
      .subscribe((result) => {
        this.notificationservice.success("Successfully booked! Thank You!");
        this.router.navigate(["/"]);
      });
  }

  getBookings() {
    return this.http.get<{ message: string; bookings: any }>(
      "/admin/viewbookings"
    );
  }

  cancelBooking(bookingID: any) {
    const obj = { bid: bookingID };

    this.http.patch("/users/cancelBooking/", obj).subscribe((res) => {
      this.notificationservice.success("Cancelled Successfully");
      this.router.navigate(["/user/Userprofile/details"]);
    });
  }

  checkSlotsAvailable(checkDetails: { selectedDate: string; venueID: any }) {
    //console.log(checkDetails);

    const url = "/bookings/checkSlotsAvailable";

    return this.http.post<{
      message: string;
      slotsAvailable: {
        slot1: boolean;
        slot2: boolean;
        slot3: boolean;
        slot4: boolean;
      };
    }>(url, checkDetails);
  }

  createSession(venueID) {
    const obj = {};
    return this.http.post<{ message: string; session: any }>(
      `/bookings/checkout-session/${venueID}`,
      {}
    );
  }
}
