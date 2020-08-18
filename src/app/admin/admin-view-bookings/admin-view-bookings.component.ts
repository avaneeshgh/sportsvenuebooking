import { NotificationService } from "./../../../../appservices/notification.service";
import { SearchService } from "./../../search.service";
import { BookingService } from "./../../../../appservices/booking.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { UserService } from "appservices/user.service";

@Component({
  selector: "app-admin-view-bookings",
  templateUrl: "./admin-view-bookings.component.html",
  styleUrls: ["./admin-view-bookings.component.css"],
})
export class AdminViewBookingsComponent implements OnInit {
  constructor(
    private router: Router,
    private bookingservice: BookingService,
    private searchservice: SearchService, //venue
    private userservice: UserService, //user,
    private notificationservice: NotificationService
  ) {}

  isLoading: boolean;

  bookings: any;

  bookingTable: any = [];

  // bookingTableObj: {
  //   userName: string;
  //   email: string;
  //   phone: string;
  //   venueName: string;
  //   sportType: string;
  //   location: string;
  //   date: any;
  //   timeSlot: string;
  //   message: string;
  // }={};

  bookingTableObj: any = {};

  currentVenueDetails: any;
  currentUserDetails: any;
  cols:any[];
  //username  email  phone  venuename  sporttype  location  date  timeSlot message

  ngOnInit(): void {

    this.cols = [
      { field: 'userName', header: 'USERNAME' },
      { field: 'email', header: 'EMAIL' },
      { field: 'phone', header: 'PHONE' },
      { field: 'venueName', header: 'VENUENAME' },
      { field: 'sportType', header: 'SPORTTYPE' },
      { field: 'location', header: 'LOCATION' },
      { field: 'selectedDate', header: 'BOOKEDDATE' },
      { field: 'timeSlot', header: 'TIMESLOT' },
      { field: 'createdDate', header: 'CREATEDDATE' },
      { field: 'status', header: 'STATUS' }

  ];
    this.isLoading = true;
    this.notificationservice.success("Opening All bookings");
    this.bookingservice.getBookings().subscribe((res) => {
      this.bookings = res.bookings;

      if (this.bookings.length == 0) {
        this.isLoading = false;
        return;
      }

      let c = 0;
      //userId,venueId,selectedDate,timeSlot,message
      for (let booking of this.bookings) {
        //this.bookingTableObj.date = booking.selectedDate;

        //this.bookingTableObj.message = booking.message;

        let time = booking.timeSlot;

        if (time == 71) {
          booking.timeSlot = "7 AM to 10 AM";
        } else if (time == 11) {
          booking.timeSlot = "10 AM to 1 PM";
        } else if (time == 14) {
          booking.timeSlot = "1 PM to 4 PM";
        } else {
          booking.timeSlot = "4 PM to 7 PM";
        }

        this.searchservice.getVenueDetails(booking.venueID).subscribe((res) => {
          this.currentVenueDetails = res.venueData;

          booking.sportType = this.currentVenueDetails.sporttype;
          booking.location = this.currentVenueDetails.location;
          booking.venueName = this.currentVenueDetails.name;

          this.userservice.getUser(booking.userID).subscribe((res) => {
            this.currentUserDetails = res.userData;

            booking.userName = this.currentUserDetails.name;
            booking.email = this.currentUserDetails.email;
            booking.phone = this.currentUserDetails.phone;
            c++;
            if (c == this.bookings.length) {
              this.isLoading = false;
              console.log(this.bookings);
            }
          });
        });
      }
    });
    

    //userID , venueID , selectedDate ,timeSlot , messsage
  }
}
