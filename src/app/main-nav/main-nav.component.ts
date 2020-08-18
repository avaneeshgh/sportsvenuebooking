import { Component, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-main-nav",
  templateUrl: "./main-nav.component.html",
  styleUrls: ["./main-nav.component.css"],
})
export class MainNavComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  loggedIn: boolean;
  constructor(
    private breakpointObserver: BreakpointObserver,
    public authServiceObj: AuthService
  ) {}

  ngOnInit() {
    this.authServiceObj.getLoggedInListener().subscribe((res) => {
      console.log("main nav fielder");

      this.loggedIn = res;
    });
  }
}
