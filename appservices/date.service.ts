import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class DateService {
  constructor() {}

  minDate: Date;
  maxDate: Date;

  getDateDetails() {
    const currentYear = new Date().getFullYear();

    // console.log(new Date().getMonth());
    // console.log(new Date().getDate());
    // console.log(new Date().getDay());

    this.minDate = new Date(
      currentYear,
      new Date().getMonth(),
      new Date().getDate()
    );

    this.maxDate = new Date(
      currentYear,
      new Date().getMonth(),
      new Date().getDate() + 20
    );
  }

  getTodaysDate() {
    return new Date(
      new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate()
    );
  }
}
