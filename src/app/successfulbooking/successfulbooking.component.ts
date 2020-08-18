import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-successfulbooking",
  templateUrl: "./successfulbooking.component.html",
  styleUrls: ["./successfulbooking.component.css"],
})
export class SuccessfulbookingComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  venueID: any;
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.has("venueID")) {
        this.venueID = params.get("venueID");
      } else {
        this.router.navigateByUrl("/home");
      }
    });
  }

  onViewVenue() {
    this.router.navigateByUrl(`/findvenues/${this.venueID}`);
  }

  onViewPreviousBookings() {
    this.router.navigateByUrl("/user/Userprofile/previous-bookings");
  }

  onHome() {
    this.router.navigateByUrl("/home");
  }
}
