import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LandingRoutingModule } from "./landing-routing.module";
import { RouterModule } from "@angular/router";
import { LandingComponent } from "./landing.component";

import { ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./home/home.component";
@NgModule({
  declarations: [LandingComponent, HomeComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class LandingModule {}
