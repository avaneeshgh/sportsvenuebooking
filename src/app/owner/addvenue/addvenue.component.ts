import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addvenue',
  templateUrl: './addvenue.component.html',
  styleUrls: ['./addvenue.component.css']
})
export class AddvenueComponent implements OnInit {

  locations: string[] = ['HYDERABAD', 'CHENNAI', 'BENGALURU', 'MUMBAI'];
  sports: string[] = ['CRICKET', 'VOLLEYBALL', 'BADMINTON', 'HOCKEY', 'BASKETBALL'];
  locationHasError = false;
  sportTypeHasError = false;
  constructor() { }

  ngOnInit() {
  }


  validateLocation(locationObj) {
     // console.log(locationObj);
     if (locationObj === 'default') {
       this.locationHasError = true;
     } else {
      this.locationHasError = false;
     }
  }

  validateSportType(sporttypeObj) {
       // console.log(sporttypeObj);
       if (sporttypeObj === 'default') {
         this.sportTypeHasError = true;
       } else {
         this.sportTypeHasError = false;
       }

  }
  onSubmit(venueObj) {

    console.log(venueObj);

  }


}
