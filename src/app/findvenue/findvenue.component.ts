import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-findvenue',
  templateUrl: './findvenue.component.html',
  styleUrls: ['./findvenue.component.css']
})
export class FindvenueComponent implements OnInit {

  cities: string[] = ['HYDERABAD', 'CHENNAI', 'BENGALURU', 'MUMBAI'];
  sports: string[] = ['CRICKET', 'VOLLEYBALL', 'BADMINTON', 'BASKETBALL'];

  // tslint:disable-next-line: variable-name
  constructor(private serviceObj: SearchService, private router: Router) { }

  ngOnInit() {

  }





  onSubmit(searchObj) {
    // console.log('I am in Findvenue.ts');
   console.log(searchObj);
   searchObj.city = `location:${searchObj.city}`;
   searchObj.sporttype = `sporttype:${searchObj.sporttype}`;
   this.router.navigate(['/findvenues', searchObj.city, searchObj.sporttype]);

  }



}
