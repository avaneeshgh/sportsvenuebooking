import { BookingService } from "./../../../appservices/booking.service";
import { NotificationService } from "./../../../appservices/notification.service";
import { AuthService } from "./../auth.service";
import { Component, OnInit } from "@angular/core";
import { SearchService } from "../search.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Route } from "@angular/compiler/src/core";
import { DialogService } from "appservices/dialog.service";
import { DateService } from "appservices/date.service";

@Component({
  selector: "app-display",
  templateUrl: "./display.component.html",
  styleUrls: ["./display.component.css"],
})
export class DisplayComponent implements OnInit {
  cities: string[] = ["HYDERABAD", "CHENNAI", "BENGALURU", "MUMBAI"];
  sports: string[] = ["CRICKET", "VOLLEYBALL", "BADMINTON", "BASKETBALL"];
  isFetching = false;
  selectedCity;
  filteredArray: string[] = [];
  minPrice;
  maxPrice;
  status;
  urlObj: {
    location: string;
    sporttype: string;
  };
  venues: any;
  constructor(
    private serviceObj: SearchService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogservice: DialogService,
    private authservice: AuthService,
    private notificationservice: NotificationService,
    private bookingservice: BookingService,
    private dateservice: DateService
  ) {}

  ngOnInit() {
    this.minPrice = 0;
    this.maxPrice = 100000;
    this.status = 0;
    for (let i = 0; i < 5; i++) {
      this.filteredArray.push("false");
    }
    this.isFetching = true;
    this.urlObj = {
      location: this.route.snapshot.params.location,

      sporttype: this.route.snapshot.params.sporttype,
    };

    this.route.params.subscribe((params: Params) => {
      this.urlObj.location = params.location;
      // this.selectedCity = this.urlObj.location.split(':')[2];
      this.urlObj.sporttype = params.sporttype;
    });

    this.urlObj.location = this.urlObj.location.split(":")[1];
    this.urlObj.sporttype = this.urlObj.sporttype.split(":")[1];
    // console.log("in display component .ts", this.urlObj);
    this.serviceObj.getVenues(this.urlObj).subscribe((data) => {
      this.isFetching = false;
      this.venues = data;
      // console.log(this.venues);
    });
  }

  doViewMore(venue) {
    this.router.navigate(["/findvenues/" + venue._id]);
  }

  onSubmit(searchObj) {
    this.isFetching = true;

    console.log(searchObj);
    this.selectedCity = searchObj.location;
    // console.log(this.selectedCity);
    const location = `location:${searchObj.location}`;
    const sporttype = `sporttype:${searchObj.sporttype}`;
    this.router.navigate(["/findvenues", location, sporttype]);
    this.serviceObj.getVenues(searchObj).subscribe((data) => {
      this.isFetching = false;
      this.venues = data;
      // console.log(this.venues.length);
    });
  }

  onSubmit1(filterObj) {
    this.status = 1;
    console.log(filterObj);
    // console.log( typeof(filterObj.canteen));

    for (let i = 0; i < 5; i++) {
      this.filteredArray[i] = "false";
    }

    console.log(this.filteredArray);

    // tslint:disable-next-line: triple-equals
    if (typeof filterObj.canteen == "boolean") {
      this.filteredArray[0] = "true";
    }

    if (typeof filterObj.dressingroom == "boolean") {
      this.filteredArray[1] = "true";
    }

    if (typeof filterObj.floodlight == "boolean") {
      this.filteredArray[2] = "true";
    }
    if (typeof filterObj.sanitation == "boolean") {
      this.filteredArray[3] = "true";
    }
    if (typeof filterObj.umpire == "boolean") {
      this.filteredArray[4] = "true";
    }

    console.log(this.filteredArray);
  }
}
