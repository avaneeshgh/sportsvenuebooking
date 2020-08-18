import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerRoutingModule } from './owner-routing.module';
import { OwnerprofileComponent } from './ownerprofile/ownerprofile.component';
import { AddvenueComponent } from './addvenue/addvenue.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [OwnerprofileComponent, AddvenueComponent],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    FormsModule
  ]
})
export class OwnerModule { }
