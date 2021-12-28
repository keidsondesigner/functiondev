import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LandingRoutingModule } from "./landing-routing.module";
import { RouterModule } from "@angular/router";
import { LandingComponent } from "./landing.component";

import { ReactiveFormsModule } from "@angular/forms";
@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class LandingModule {}
