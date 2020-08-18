import { BookingService } from "./../../../appservices/booking.service";
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DateService } from "appservices/date.service";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";

@Component({
  selector: "app-userbookinginfo",
  templateUrl: "./userbookinginfo.component.html",
  styleUrls: ["./userbookinginfo.component.css"],
})
export class UserbookinginfoComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<UserbookinginfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public dateservice: DateService,
    private bookingservice: BookingService
  ) {}

  minDate: Date;
  maxDate: Date;
  selectedDate: Date;

  value: Date;

  firsttimepopup: boolean;

  isSlotsAvailableLoading: boolean;
  slotsAvailable: {
    slot1: boolean;
    slot2: boolean;
    slot3: boolean;
    slot4: boolean;
  };

  ngOnInit() {
    this.value = new Date();
    this.firsttimepopup = true;
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    //console.log(`${type}: ${event.value}`);

    this.firsttimepopup = false;
    this.isSlotsAvailableLoading = true;

    //modify date
    let dateString =
      event.value.getFullYear() +
      "-" +
      (event.value.getMonth() + 1) +
      "-" +
      event.value.getDate();

    let checkDetails = {
      selectedDate: dateString,
      venueID: this.data.presentVenueDetails._id,
    };

    this.bookingservice
      .checkSlotsAvailable(checkDetails)
      .subscribe((result) => {
        this.slotsAvailable = result.slotsAvailable;

        this.isSlotsAvailableLoading = false;
      });
  }

  onCloseDialog() {
    this.dialogRef.close(null);
  }
}
